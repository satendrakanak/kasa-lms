import { getHomeData } from "@/app/(website)/home-data";
import { ClassicHomeVariant } from "@/components/home/home-variants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  path: "/home-2",
  title: "Classic Academy Home",
  description:
    "A classic academy homepage variation for the Kasa LMS static theme.",
});

export default async function HomeTwoPage() {
  const data = await getHomeData();

  return <ClassicHomeVariant {...data} />;
}
