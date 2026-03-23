import dynamic from "next/dynamic";

const VerticalVideoConverter = dynamic(
  () => import("@/pages/VerticalVideoConverter"),
  { ssr: false }
);

export default function VideoConverterPage() {
  return <VerticalVideoConverter />;
}
