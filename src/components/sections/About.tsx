import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import ScrollReveal from "../common/ScrollReveal";
import BlurHighlight from "../effects/BlurHighlight";

const About = () => {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="pt-20 sm:pt-28 snap-center h-full min-h-screen overflow-hidden"
    >
      <div className="container h-full max-w-4xl">
        <ScrollReveal>
          <h2 className="text-heading text-foreground mb-2">
            {t("about.heading")}
          </h2>
          <div className="h-1 w-12 rounded-full bg-primary mb-8" />
        </ScrollReveal>

        <div className="grid gap-8 h-fit sm:grid-cols-[1fr_2fr]">
          <ScrollReveal delay={0.1}>
            <div className="flex flex-row sm:flex-col items-center gap-4">
              <div className="flex w-20 h-20 sm:h-[12rem] sm:w-[12rem] items-center justify-center rounded-2xl ">
                <img
                  src="https://i.postimg.cc/FKMyRbpv/my-Picture.png"
                  alt={t("about.imageAlt")}
                  loading="lazy"
                  decoding="async"
                  width={192}
                  height={192}
                  className="flex w-full items-center justify-center rounded-2xl bg-primary border border-solid p-1 "
                />
              </div>
              <Button variant="outline" className="gap-2 mt-2">
                <Download className="h-4 w-4" />
                {t("about.downloadCV")}
              </Button>
            </div>
          </ScrollReveal>

          <div
            className="text-[clamp(0.5rem,1.5vw,1.5rem)] sm:text-[clamp(1rem,30vw,1.2rem)]
 text-justify h-fit"
          >
            <BlurHighlight
              highlightedBits={t("about.highlights", {
                returnObjects: true,
              }) as string[]}
              highlightColor="#2a7872"
              highlightDelay={0.6}
              highlightDuration={2}
              blurAmount={0}
              inactiveOpacity={1}
              blurDuration={0}
              className="h-full overflow-hidden"
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
