import DashboardMenu from "./_components/dashboard/dashboard";
import DashboardHeader from "./_components/dashboard/header";

export default function Page() {
  const breadcrumbs = [{ name: "YSFON Admin Dashboard" }];
  return (
    <>
      <DashboardHeader breadcrumbs={breadcrumbs} />
      <DashboardMenu />
    </>
  );
}
