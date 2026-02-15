import UtilityHeader from "@/components/layout/UtilityHeader";
import VideoConverter from "@/components/VideoConverter";

const VerticalVideoConverter = () => {
  return (
    <>
      <UtilityHeader />
      <main className="min-h-screen bg-background pt-20 sm:pt-24 pb-10 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-foreground">
              Conversor de Vídeo Vertical
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-1 sm:mb-2">
              Converta seus vídeos para o formato vertical (1080x1920, proporção 9:16) com legendas personalizadas.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Todo o processamento acontece no seu navegador — seus vídeos nunca saem do seu dispositivo.
            </p>
          </div>

          <VideoConverter />
        </div>
      </main>
    </>
  );
};

export default VerticalVideoConverter;
