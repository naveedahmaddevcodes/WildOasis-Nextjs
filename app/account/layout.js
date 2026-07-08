import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[16rem_1fr] lg:gap-12">
      <div className="lg:sticky lg:top-4 lg:h-fit">
        <SideNavigation />
      </div>
      <div className="py-1">{children}</div>
    </div>
  );
}
