# TikTok Video Converter

A browser-based video processor that converts videos to TikTok format (1080x1920, 9:16 aspect ratio) with custom caption overlays. All processing happens client-side using WebAssembly - your videos never leave your device.

## Features

### Core Functionality

- **Video Processing**
  - Accepts multiple video formats: MP4, MOV, AVI, MKV, WebM
  - Converts to TikTok format: 1080x1920 (9:16 aspect ratio)
  - Smart resizing logic:
    - If source is wider than 9:16: scales to height 1920, center-crops horizontally
    - If source is taller than 9:16: scales to width 1080, center-crops vertically
  - Output: MP4 with H.264 codec, 30fps, AAC audio at 192kbps

- **Caption Overlay**
  - Add text captions to videos
  - 5 font options: Impact, Arial Black, Montserrat Bold, Bebas Neue, Oswald Bold
  - Dynamic font sizing based on caption length:
    - < 30 chars: 40pt
    - 30-60 chars: 35pt
    - 60-100 chars: 30pt
    - > 100 chars: 25pt
  - Professional text styling:
    - White text with 3px black outline
    - Semi-transparent black background box (70% opacity)
    - Positioned 20% from top, horizontally centered
    - 15px padding around text

- **Batch Processing**
  - Queue multiple videos for processing
  - Process videos sequentially (prevents memory issues)
  - Real-time progress tracking for each video
  - Status indicators: Pending, Processing, Completed, Error
  - Remove videos from queue at any time

### Technical Implementation

- **FFmpeg.wasm**: Client-side video processing
- **React 18+**: Modern hooks-based architecture
- **TypeScript**: Full type safety
- **Tailwind CSS**: Modern dark theme
- **Framer Motion**: Smooth animations
- **Lucide React**: Beautiful icons
- **react-dropzone**: Drag-and-drop file handling

## Usage

### Getting Started

1. Navigate to `/utilidades/video-converter` in the app
2. Drag and drop video files or click to browse
3. Add optional captions to each video
4. Select your preferred font (global setting)
5. Click "Process All" to start conversion
6. Download processed videos individually

### File Size Warnings

- Files over 100MB will show a warning indicating longer processing times
- Large files are supported but may take several minutes to process

### Browser Requirements

- Modern browser with WebAssembly support
- SharedArrayBuffer support (enabled via cross-origin isolation)
- Recommended: Chrome, Edge, Firefox, or Safari (latest versions)

## Technical Details

### FFmpeg Command Structure

```bash
ffmpeg -i input.mp4 \
  -vf "scale=W:H,crop=1080:1920:(iw-1080)/2:(ih-1920)/2,drawtext=..." \
  -c:v libx264 -preset medium -crf 23 \
  -c:a aac -b:a 192k -ar 44100 \
  -r 30 -pix_fmt yuv420p \
  output.mp4
```

### Video Processing Pipeline

1. Load video file into FFmpeg virtual filesystem
2. Extract video metadata (dimensions, duration)
3. Calculate scale and crop filters based on aspect ratio
4. Build FFmpeg command with video filters + text overlay
5. Execute FFmpeg processing with progress tracking
6. Extract output file and create download blob
7. Clean up virtual filesystem

### State Management

```typescript
interface Video {
  id: string;
  file: File;
  name: string;
  caption: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  outputBlob?: Blob;
  error?: string;
  thumbnail?: string;
}
```

## Configuration

### Vite Setup

The Vite configuration includes:

- `vite-plugin-cross-origin-isolation`: Enables SharedArrayBuffer support
- FFmpeg.wasm exclusion from optimization
- Cross-Origin-Opener-Policy: same-origin
- Cross-Origin-Embedder-Policy: require-corp

### Dependencies

Core dependencies:
- `@ffmpeg/ffmpeg`: WebAssembly FFmpeg implementation
- `@ffmpeg/util`: Utility functions for FFmpeg.wasm
- `react-dropzone`: File upload handling

Development dependencies:
- `vite-plugin-cross-origin-isolation`: Required headers for FFmpeg.wasm

## Performance Considerations

- Videos are processed sequentially to avoid memory issues
- Automatic thumbnail generation for preview
- Progress tracking with percentage updates
- Memory cleanup after processing
- Efficient blob URL management

## Error Handling

The component handles:
- FFmpeg initialization failures
- Unsupported video formats
- Processing errors with detailed messages
- Browser compatibility issues
- File access errors

## Security & Privacy

- **100% Client-Side Processing**: Videos never leave your device
- **No Server Upload**: All processing happens in your browser
- **Privacy First**: No data collection or tracking
- **Secure**: Uses WebAssembly sandboxing

## Future Enhancements

Potential features for future versions:
- Bulk caption application (same caption to all videos)
- Video preview before processing
- Export all processed videos as ZIP
- Local storage for font preference
- Cancel processing mid-operation
- Additional video filters and effects
- Custom aspect ratios
- Watermark support

## Troubleshooting

### FFmpeg Failed to Load

- Ensure you have a stable internet connection (FFmpeg core is loaded from CDN)
- Check browser console for specific errors
- Try refreshing the page
- Verify SharedArrayBuffer support in your browser

### Processing Errors

- Ensure video file is not corrupted
- Check that the video format is supported
- Try a smaller file size if memory issues occur
- Verify that your browser supports the required codecs

### Performance Issues

- Close other browser tabs to free up memory
- Process videos one at a time instead of batching large files
- Use Chrome or Edge for best performance
- Ensure your device has sufficient RAM available

## Development

### Running Locally

```bash
npm install
npm run dev
```

### Building for Production

```bash
npm run build
```

The cross-origin isolation headers are automatically applied in both development and production modes.

## License

This component is part of the portfolio application and uses FFmpeg.wasm, which is licensed under LGPL 2.1 or later.

## Credits

- FFmpeg.wasm: https://github.com/ffmpegwasm/ffmpeg.wasm
- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion
