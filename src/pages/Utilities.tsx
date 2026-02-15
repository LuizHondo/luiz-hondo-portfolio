import Header from "@/components/layout/Header";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Video } from "lucide-react";

const Utilities = () => {
  const { t } = useTranslation();

  const utilities = [
    {
      title: t("utilities.videoConverter.title"),
      description: t("utilities.videoConverter.description"),
      href: "/utilities/video-converter",
      icon: Video,
    },
  ];

  return (
    <>
      <Header
        variant="utility"
        breadcrumbs={[{ label: t("utilities.breadcrumb"), href: "/utilities" }]}
      />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            {t("utilities.heading")}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t("utilities.description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {utilities.map((utility) => (
              <Link key={utility.href} to={utility.href}>
                <Card className="h-full hover:border-primary transition-colors cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <utility.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{utility.title}</CardTitle>
                        <CardDescription>{utility.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Utilities;
