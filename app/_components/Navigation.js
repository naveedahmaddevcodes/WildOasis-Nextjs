import { auth } from "../_lib/auth";
import ResponsiveNavMenu from "./ResponsiveNavMenu";

export default async function Navigation() {
  const session = await auth();

  return (
    <div className="z-10 text-lg sm:text-xl">
      <ResponsiveNavMenu session={session} />
    </div>
  );
}
