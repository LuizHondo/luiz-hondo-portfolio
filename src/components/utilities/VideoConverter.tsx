import { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Film,
  Download,
  Upload,
  X,
  Play,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import captionFontUrl from "@/assets/fonts/site-caption-font.ttf?url";

// Video interface
interface Video {
  id: string;
  file: File;
  name: string;
  caption: string;
  status: "pending" | "processing" | "completed" | "error";
  progress: number;
  outputBlob?: Blob;
  error?: string;
  thumbnail?: string;
}

const CAPTION_FONT_FS_PATH = "caption-font.ttf";

const VideoConverter = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [isLoadingFFmpeg, setIsLoadingFFmpeg] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [captionFontError, setCaptionFontError] = useState<string | null>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const cancelRef = useRef(false);
  const fontLoadedRef = useRef(false);
  const isLoadingFontRef = useRef(false);
  const { t } = useTranslation();

  // Initialize FFmpeg
  useEffect(() => {
    loadFFmpeg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCaptionFont = async () => {
    if (!ffmpegRef.current) return;
    if (isLoadingFontRef.current || fontLoadedRef.current) return;

    isLoadingFontRef.current = true;
    setCaptionFontError(null);

    try {
      const response = await fetch(captionFontUrl);
      if (!response.ok) {
        throw new Error(t("videoConverter.fontFetchFailed", { status: response.status }));
      }

      const fontBuffer = await response.arrayBuffer();
      const fontData = new Uint8Array(fontBuffer);

      if (fontData.byteLength === 0) {
        throw new Error(t("videoConverter.fontEmpty"));
      }

      await ffmpegRef.current.writeFile(CAPTION_FONT_FS_PATH, fontData);

      fontLoadedRef.current = true;
    } catch (err) {
      fontLoadedRef.current = false;
      setCaptionFontError(
        err instanceof Error ? err.message : t("videoConverter.fontLoadFailed"),
      );
    } finally {
      isLoadingFontRef.current = false;
    }
  };

  const loadFFmpeg = async () => {
    try {
      // Check for SharedArrayBuffer support
      if (typeof SharedArrayBuffer === "undefined") {
        console.error(
          "SharedArrayBuffer is not supported. Cross-origin isolation may not be enabled.",
        );
        throw new Error(
          "SharedArrayBuffer is not available. Please ensure the site is served with proper COOP/COEP headers.",
        );
      }

      const ffmpeg = new FFmpeg();
      ffmpegRef.current = ffmpeg;
      fontLoadedRef.current = false;
      isLoadingFontRef.current = false;
      setCaptionFontError(null);

      ffmpeg.on("log", ({ message }) => {
        console.log("[FFmpeg]:", message);
      });

      ffmpeg.on("progress", ({ progress }) => {
        // Update progress for the currently processing video
        setVideos((prev) =>
          prev.map((video) =>
            video.status === "processing"
              ? { ...video, progress: Math.round(progress * 100) }
              : video,
          ),
        );
      });

      // Try multiple CDN sources
      const cdnSources = [
        "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm",
        "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm",
      ];

      let loaded = false;
      let lastError: Error | null = null;

      for (const baseURL of cdnSources) {
        try {
          console.log(`Attempting to load FFmpeg from: ${baseURL}`);
          const coreURL = await toBlobURL(
            `${baseURL}/ffmpeg-core.js`,
            "text/javascript",
          );
          const wasmURL = await toBlobURL(
            `${baseURL}/ffmpeg-core.wasm`,
            "application/wasm",
          );

          await ffmpeg.load({
            coreURL,
            wasmURL,
          });

          loaded = true;
          console.log("FFmpeg loaded successfully from:", baseURL);
          break;
        } catch (err) {
          console.warn(`Failed to load from ${baseURL}:`, err);
          lastError = err instanceof Error ? err : new Error(String(err));
          continue;
        }
      }

      if (!loaded) {
        throw (
          lastError || new Error("Failed to load FFmpeg from all CDN sources")
        );
      }

      setFfmpegLoaded(true);
      setIsLoadingFFmpeg(false);
      await loadCaptionFont();
    } catch (error) {
      console.error("Failed to load FFmpeg:", error);
      setIsLoadingFFmpeg(false);
      setFfmpegLoaded(false);
    }
  };

  // File drop handler
  const onDrop = async (acceptedFiles: File[]) => {
    const newVideos: Video[] = await Promise.all(
      acceptedFiles.map(async (file) => {
        const thumbnail = await generateThumbnail(file);
        return {
          id: Math.random().toString(36).substring(7),
          file,
          name: file.name,
          caption: "",
          status: "pending" as const,
          progress: 0,
          thumbnail,
        };
      }),
    );
    setVideos((prev) => [...prev, ...newVideos]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".mkv", ".webm"],
    },
    multiple: true,
  });

  // Generate video thumbnail
  const generateThumbnail = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.muted = true;

      video.onloadedmetadata = () => {
        video.currentTime = 1;
      };

      video.onseeked = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg"));
        URL.revokeObjectURL(video.src);
      };

      video.src = URL.createObjectURL(file);
    });
  };

  // Calculate font size based on caption length
  const getFontSize = (caption: string): number => {
    const length = caption.length;
    if (length < 30) return 40;
    if (length < 60) return 35;
    if (length < 100) return 30;
    return 25;
  };

  // Process a single video
  const processVideo = async (video: Video) => {
    if (!ffmpegRef.current || !ffmpegLoaded) return;

    const ffmpeg = ffmpegRef.current;
    const inputName = "input.mp4";
    const outputName = "output.mp4";

    try {
      // Update status to processing
      setVideos((prev) =>
        prev.map((v) =>
          v.id === video.id ? { ...v, status: "processing", progress: 0 } : v,
        ),
      );

      // Write input file to FFmpeg virtual filesystem
      console.log("Writing input file to FFmpeg filesystem...");
      await ffmpeg.writeFile(inputName, await fetchFile(video.file));

      // Get video dimensions
      const videoElement = document.createElement("video");
      videoElement.src = URL.createObjectURL(video.file);
      await new Promise((resolve) => {
        videoElement.onloadedmetadata = resolve;
      });

      const { videoWidth, videoHeight } = videoElement;
      console.log(`Source video dimensions: ${videoWidth}x${videoHeight}`);

      const sourceAspectRatio = videoWidth / videoHeight;
      const targetAspectRatio = 1080 / 1920; // 9:16 = 0.5625

      console.log(
        `Source aspect ratio: ${sourceAspectRatio.toFixed(3)}, Target: ${targetAspectRatio.toFixed(3)}`,
      );

      // Calculate scale and crop filters
      let scaleFilter: string;
      let cropX: string;
      let cropY: string;

      if (sourceAspectRatio > targetAspectRatio) {
        scaleFilter = `scale=-2:1920`;
        cropX = "(iw-1080)/2";
        cropY = "0";
      } else {
        scaleFilter = `scale=1080:-2`;
        cropX = "0";
        cropY = "(ih-1920)/2";
      }

      // Build video filter with crop and proper formatting
      let vf = `${scaleFilter},crop=1080:1920:${cropX}:${cropY},format=yuv420p`;

      // Add caption if provided
      if (video.caption.trim()) {
        if (!fontLoadedRef.current) {
          throw new Error(
            captionFontError ?? t("videoConverter.captionFontLoading"),
          );
        }

        const fontSize = getFontSize(video.caption);

        console.log("Adding caption:", video.caption);

        // Write caption text to a file to avoid escaping issues
        const textContent = video.caption;
        await ffmpeg.writeFile("caption.txt", new TextEncoder().encode(textContent));

        // Build drawtext filter using textfile instead of text
        const textFilter =
          `drawtext=` +
          `fontfile=${CAPTION_FONT_FS_PATH}:` +
          `textfile=caption.txt:` +
          `fontsize=${fontSize}:` +
          `fontcolor=white:` +
          `borderw=4:` +
          `bordercolor=black:` +
          `x=(w-text_w)/2:` +
          `y=h*0.2:` +
          `box=1:` +
          `boxcolor=black@0.7:` +
          `boxborderw=15`;

        vf += `,${textFilter}`;
        console.log("Text filter:", textFilter);
      }

      console.log("FFmpeg filter:", vf);

      // Build FFmpeg command arguments
      const ffmpegArgs = [
        "-y", // Overwrite output file
        "-i",
        inputName,
        "-vf",
        vf,
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        "23",
        "-profile:v",
        "high",
        "-level",
        "4.0",
        "-pix_fmt",
        "yuv420p",
        "-r",
        "30",
        "-movflags",
        "+faststart",
      ];

      // Handle audio - copy if exists, or create silent track if video-only
      ffmpegArgs.push(
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        "-ar",
        "44100",
        "-ac",
        "2",
      );

      ffmpegArgs.push(outputName);

      console.log("Executing FFmpeg with args:", ffmpegArgs.join(" "));

      // Execute FFmpeg command
      try {
        await ffmpeg.exec(ffmpegArgs);
        console.log("FFmpeg processing complete, reading output file...");
      } catch (execError) {
        console.error("FFmpeg execution failed:", execError);
        throw new Error(`FFmpeg execution failed: ${execError instanceof Error ? execError.message : String(execError)}`);
      }

      // Read output file
      const data = await ffmpeg.readFile(outputName) as Uint8Array;
      // Copy into a plain ArrayBuffer to satisfy BlobPart typing
      const buffer = new ArrayBuffer(data.byteLength);
      new Uint8Array(buffer).set(data);
      const blob = new Blob([buffer], { type: "video/mp4" });

      console.log(
        `Output file size: ${(blob.size / 1024 / 1024).toFixed(2)} MB`,
      );

      // Update video with output
      setVideos((prev) =>
        prev.map((v) =>
          v.id === video.id
            ? { ...v, status: "completed", progress: 100, outputBlob: blob }
            : v,
        ),
      );

      // Clean up
      console.log("Cleaning up temporary files...");
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);

      // Clean up caption file if it exists
      if (video.caption.trim()) {
        try {
          await ffmpeg.deleteFile("caption.txt");
        } catch (e) {
          // Ignore if file doesn't exist
        }
      }

      URL.revokeObjectURL(videoElement.src);

      console.log("Video processing completed successfully!");
    } catch (error) {
      if (cancelRef.current) return;
      console.error("Error processing video:", error);
      setVideos((prev) =>
        prev.map((v) =>
          v.id === video.id
            ? {
                ...v,
                status: "error",
                error: error instanceof Error ? error.message : t("videoConverter.unknownError"),
              }
            : v,
        ),
      );
    }
  };

  // Process all videos
  const processAllVideos = async () => {
    setIsProcessing(true);
    cancelRef.current = false;
    const pendingVideos = videos.filter((v) => v.status === "pending");

    for (const video of pendingVideos) {
      if (cancelRef.current) break;
      await processVideo(video);
    }

    setIsProcessing(false);
  };

  // Cancel the currently processing video
  const cancelProcessing = async (id: string) => {
    cancelRef.current = true;

    if (ffmpegRef.current) {
      ffmpegRef.current.terminate();
      ffmpegRef.current = null;
    }

    setVideos((prev) => prev.filter((v) => v.id !== id));
    setIsProcessing(false);
    fontLoadedRef.current = false;
    isLoadingFontRef.current = false;
    setFfmpegLoaded(false);
    setIsLoadingFFmpeg(true);

    await loadFFmpeg();
    cancelRef.current = false;
  };

  // Remove video from queue
  const removeVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  // Download processed video
  const downloadVideo = (video: Video) => {
    if (!video.outputBlob) return;

    const url = URL.createObjectURL(video.outputBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vertical_${video.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Update caption
  const updateCaption = (id: string, caption: string) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, caption } : v)));
  };

  // Get status badge
  const getStatusBadge = (status: Video["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            {t("videoConverter.statusPending")}
          </Badge>
        );
      case "processing":
        return (
          <Badge className="gap-1 bg-blue-500">
            <Loader2 className="h-3 w-3 animate-spin" />
            {t("videoConverter.statusProcessing")}
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="default" className="gap-1 bg-green-500">
            <CheckCircle2 className="h-3 w-3" />
            {t("videoConverter.statusCompleted")}
          </Badge>
        );
      case "error":
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertCircle className="h-3 w-3" />
            {t("videoConverter.statusError")}
          </Badge>
        );
    }
  };

  if (isLoadingFFmpeg) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] space-y-4">
        <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin text-primary" />
        <p className="text-sm sm:text-base text-muted-foreground">
          {t("videoConverter.loadingFFmpeg")}
        </p>
      </div>
    );
  }

  if (!ffmpegLoaded) {
    const hasSharedArrayBuffer = typeof SharedArrayBuffer !== "undefined";

    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] space-y-4 px-2">
            <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-destructive" />
            <div className="text-center space-y-2">
              <p className="text-base sm:text-lg font-semibold">
                {t("videoConverter.failedToLoad")}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
                {!hasSharedArrayBuffer
                  ? t("videoConverter.sharedArrayBufferError")
                  : t("videoConverter.cdnError")}
              </p>
              <div className="pt-4 space-y-2">
                <p className="text-xs text-muted-foreground">
                  {t("videoConverter.sharedArrayBuffer")}:{" "}
                  {hasSharedArrayBuffer
                    ? `✓ ${t("videoConverter.available")}`
                    : `✗ ${t("videoConverter.unavailable")}`}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("videoConverter.crossOriginIsolated")}:{" "}
                  {window.crossOriginIsolated
                    ? `✓ ${t("videoConverter.yes")}`
                    : `✗ ${t("videoConverter.no")}`}
                </p>
              </div>
            </div>
            <Button onClick={() => window.location.reload()}>
              {t("videoConverter.reloadPage")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const pendingVideosCount = videos.filter((v) => v.status === "pending").length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Process Controls */}
      <div className="flex justify-end">
        <Button
          onClick={processAllVideos}
          disabled={isProcessing || pendingVideosCount === 0}
          className="gap-2 w-full sm:w-auto"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("videoConverter.processing")}
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              {t("videoConverter.processAll", { count: pendingVideosCount })}
            </>
          )}
        </Button>
      </div>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`
          relative overflow-hidden rounded-lg border-2 border-dashed transition-all cursor-pointer
          ${
            isDragActive
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-border hover:border-primary/50 hover:scale-[1.01]"
          }
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 sm:px-6 text-center">
          <motion.div
            animate={{
              y: isDragActive ? -10 : 0,
              scale: isDragActive ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <Upload className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
          </motion.div>
          <p className="text-base sm:text-lg font-medium mb-1 sm:mb-2">
            {isDragActive
              ? t("videoConverter.dropActive")
              : t("videoConverter.dropInactive")}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {t("videoConverter.supportedFormats")}
          </p>
        </div>
      </div>

      {/* Video Queue */}
      <AnimatePresence>
        {videos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3 sm:space-y-4"
          >
            <h3 className="text-base sm:text-lg font-semibold">
              {t("videoConverter.videoQueue", { count: videos.length })}
            </h3>
            {videos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <Card>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      {/* Thumbnail */}
                      {video.thumbnail && (
                        <div className="relative w-full sm:w-24 h-40 sm:h-32 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                          <img
                            src={video.thumbnail}
                            alt={video.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Film className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      )}

                      {/* Video Info */}
                      <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
                        <div className="flex items-start justify-between gap-2 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <p className="font-medium truncate text-sm sm:text-base">
                                {video.name}
                              </p>
                              {getStatusBadge(video.status)}
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {(video.file.size / 1024 / 1024).toFixed(2)} MB
                              {video.file.size > 100 * 1024 * 1024 && (
                                <span className="text-yellow-500 ml-2">
                                  {t("videoConverter.largeFile")}
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                            {video.status === "completed" &&
                              video.outputBlob && (
                                <Button
                                  size="sm"
                                  onClick={() => downloadVideo(video)}
                                  className="gap-1 sm:gap-2 text-xs sm:text-sm"
                                >
                                  <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                  <span className="hidden sm:inline">
                                    {t("videoConverter.download")}
                                  </span>
                                </Button>
                              )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                video.status === "processing"
                                  ? cancelProcessing(video.id)
                                  : removeVideo(video.id)
                              }
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Caption Input */}
                        <div>
                          <Input
                            placeholder={t("videoConverter.captionPlaceholder")}
                            value={video.caption}
                            onChange={(e) =>
                              updateCaption(video.id, e.target.value)
                            }
                            disabled={
                              video.status === "processing" ||
                              video.status === "completed"
                            }
                            maxLength={200}
                            className="text-sm"
                          />
                          {video.caption && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {video.caption.length}/200
                            </p>
                          )}
                        </div>

                        {/* Progress Bar */}
                        {video.status === "processing" && (
                          <div className="space-y-1 sm:space-y-2">
                            <Progress value={video.progress} className="h-2" />
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {t("videoConverter.processingProgress", { progress: video.progress })}
                            </p>
                          </div>
                        )}

                        {/* Error Message */}
                        {video.status === "error" && video.error && (
                          <div className="flex items-start gap-2 p-2 sm:p-3 rounded-md bg-destructive/10 text-destructive">
                            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <p className="text-xs sm:text-sm">{video.error}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {videos.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 sm:py-12 text-muted-foreground"
        >
          <Film className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 opacity-50" />
          <p className="text-sm sm:text-base">
            {t("videoConverter.emptyState")}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default VideoConverter;
