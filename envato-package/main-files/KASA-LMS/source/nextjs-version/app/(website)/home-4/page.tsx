import { getHomeData } from "@/app/(website)/home-data";
import { MarketplaceHomeVariant } from "@/components/home/home-variants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  path: "/home-4",
  title: "Course Marketplace Home",
  description:
    "A course marketplace homepage variation for the Kasa LMS static theme.",
});

export default async function HomeFourPage() {
  const data = await getHomeData();

  return <MarketplaceHomeVariant {...data} />;
}
