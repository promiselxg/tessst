"use client";

import { useRouter, useSearchParams } from "next/navigation";
import BreadcrumbBanner from "@/components/breadcrumb/banner-breadcrumb";
import Container from "@/components/container/container";
import Tabs from "../../_components/state/tabs";
import StateSelector from "../../_components/state/state-selector";
import TeamGrid from "../../_components/state/state-team-member-grid";

const stateTeams = {
  Abia: [
    { name: "Abia Person 1" },
    { name: "Abia Person 2" },
    { name: "Abia Person 3" },
    { name: "Abia Person 4" },
  ],

  Lagos: [{ name: "Lagos Person 1" }, { name: "Lagos Person 2" }],
};

const allStates = Object.keys(stateTeams);

export default function StatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("type") || "state";
  const region = searchParams.get("region") || "Abia";

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    if (key === "type" && value !== "inside-ysfon") {
      params.delete("region");
    }
    router.replace(`/about-us/inside-ysfon?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <>
      <BreadcrumbBanner
        title="Inside YSFON"
        pathname={[{ label: "Inside YSFON", href: "/inside-ysfon" }]}
        banner="/img/bg.png"
        description="Donec aliquam ultrices purus, nec laoreet elit scelerisque. Integer  eget nisi ultrices, hendrerit urna at, pulvinar diam. Donec sit amet  facilisis dolor nunc eget purusisque. "
      />
      <div className="w-full flex h-fit flex-col">
        <div className="flex flex-col w-full mx-auto ">
          <Container className="w-full md:w-[1280px]">
            <div className="p-6 max-w-7xl mx-auto mt-8">
              <Tabs
                activeTab={tab}
                onChange={(val) => updateQuery("type", val)}
              />

              {tab === "state" && (
                <>
                  <StateSelector
                    states={allStates}
                    selected={region}
                    onSelect={(val) => updateQuery("region", val)}
                  />
                  <TeamGrid team={stateTeams[region] || []} state={region} />
                </>
              )}

              {tab === "national" && (
                <div className="mt-6">National View Placeholder</div>
              )}
              {tab === "affiliate" && (
                <div className="mt-6">Affiliate View Placeholder</div>
              )}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
