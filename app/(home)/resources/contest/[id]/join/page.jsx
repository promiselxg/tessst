import { BreadcrumbNav } from "@/components/breadcrumb/breadcrumb";
import Container from "@/components/container/container";
import { ContestFormProvider } from "@/context/contest.form.conext";
import React from "react";
import MultiStepForm from "./_components/form";

const page = ({ params }) => {
  return (
    <ContestFormProvider>
      <div className="p-[17px] bg-emerald-950 text-white mt-[85px]">
        <Container className="w-[90%] md:w-[1100px] mx-auto">
          <BreadcrumbNav
            prev={{
              label: `Black And White Compositions`,
              href: `/resources/contest/${params.id}`,
            }}
            slug="Join contest"
            className="text-[whitesmoke]"
          />
        </Container>
      </div>
      <div className="w-full flex h-fit py-[40px] md:py-[50px] bg-[whitesmoke]">
        <Container className="w-[90%] md:w-[1100px] mx-auto">
          <MultiStepForm contestId={params.id} />
        </Container>
      </div>
    </ContestFormProvider>
  );
};

export default page;
