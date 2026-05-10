import { getHomeData } from "@/app/(website)/home-data";
import { CohortHomeVariant } from "@/components/home/home-variants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  path: "/home-3",
  title: "Live Cohort Home",
  description:
    "A live cohort homepage variation for the Kasa LMS static theme.",
});

export default async function HomeThreePage() {
  const data = await getHomeData();

  return <CohortHomeVariant {...data} />;
}
