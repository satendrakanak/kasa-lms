import { getHomeData } from "@/app/(website)/home-data";
import { DashboardHomeVariant } from "@/components/home/home-variants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  path: "/home-5",
  title: "LMS Platform Home",
  description:
    "A product-led LMS platform homepage variation for the Kasa LMS static theme.",
});

export default async function HomeFivePage() {
  const data = await getHomeData();

  return <DashboardHomeVariant {...data} />;
}
