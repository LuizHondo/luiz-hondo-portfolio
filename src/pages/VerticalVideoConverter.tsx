import Header from "@/components/layout/Header";
import { useTranslation } from "react-i18next";
import VideoConverter from "@/components/utilities/VideoConverter";

const VerticalVideoConverter = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header
        variant="utility"
        breadcrumbs={[
          { label: t("utilities.breadcrumb"), href: "/utilities" },
          { label: t("utilities.videoConverter.breadcrumb"), href: "/utilities/video-converter" },
        ]}
      />
      <main className="min-h-screen bg-background pt-20 sm:pt-24 pb-10 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-foreground">
              {t("utilities.videoConverter.pageTitle")}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-1 sm:mb-2">
              {t("utilities.videoConverter.pageDescription")}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t("utilities.videoConverter.pagePrivacy")}
            </p>
          </div>

          <VideoConverter />
        </div>
      </main>
    </>
  );
};

export default VerticalVideoConverter;
