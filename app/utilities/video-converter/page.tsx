"use client";

import dynamic from "next/dynamic";

const VerticalVideoConverter = dynamic(
  () => import("@/views/VerticalVideoConverter"),
  { ssr: false }
);

export default function VideoConverterPage() {
  return <VerticalVideoConverter />;
}
