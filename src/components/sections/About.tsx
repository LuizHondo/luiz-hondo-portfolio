import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import ScrollReveal from "../common/ScrollReveal";
import BlurHighlight from "../effects/BlurHighlight";

const About = () => {
  const { t, i18n } = useTranslation();

  const cvUrl =
    i18n.language === "pt"
      ? "https://drive.google.com/uc?export=download&id=1u80a4l4nKqbjGnBpu4kI0RQ8JuU0vW6D"
      : "https://drive.google.com/uc?export=download&id=1oRFtbmbvF_hOXmqBTSF-LszGbCggd5E4";

  return (
    <section
      id="about"
      className="pt-20 sm:pt-28 pb-6 sm:pb-10 snap-center h-screen overflow-hidden"
    >
      <div className="container h-fit max-w-4xl grid grid-rows-[auto,1fr] grid-cols-1">
        <ScrollReveal>
          <h2 className="text-heading-sm sm:text-heading text-foreground mb-px">
            {t("about.heading")}
          </h2>
          <div className="h-1 w-12 rounded-full bg-primary mb-2 sm:mb-8" />
        </ScrollReveal>

        <div className="grid gap-2 sm:gap-8 min-h-0 lg:grid-cols-[1fr_2fr]">
          <ScrollReveal delay={0.1}>
            <div className="flex flex-row lg:flex-col  items-center justify-around gap-3 sm:gap-4">
              <div className="flex w-16 h-16 sm:h-[12rem] sm:w-[12rem] items-center justify-center rounded-2xl">
                <img
                  src="https://i.postimg.cc/FKMyRbpv/my-Picture.png"
                  alt={t("about.imageAlt")}
                  loading="lazy"
                  decoding="async"
                  width={192}
                  height={192}
                  className="flex w-full items-center justify-center rounded-2xl bg-primary border border-solid p-1"
                />
              </div>
              <Button
                variant="outline"
                className="gap-2 flex flex-col-reverse sm:flex-row text-[0.6rem] sm:text-body-sm
                 w-fit h-fit"
                asChild
              >
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-2 w-2 sm:h-4 sm:w-4" />
                  {t("about.downloadCV")}
                </a>
              </Button>
            </div>
          </ScrollReveal>

          <div className="text-[0.6rem] sm:text-sm md:text-base md:text-body-sm text-justify overflow-y-auto min-h-0 sm:leading-relaxed leading-tight w-fit nosc">
            <BlurHighlight
              highlightedBits={
                t("about.highlights", {
                  returnObjects: true,
                }) as string[]
              }
              highlightColor="#2a7872"
              highlightDelay={0.6}
              highlightDuration={2}
              blurAmount={0}
              inactiveOpacity={1}
              blurDuration={0}
              className="h-fit"
            >
              {t("about.bio")}
            </BlurHighlight>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
