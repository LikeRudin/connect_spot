import type { ReactNode } from "react";

import { NavigationBar } from "@/components";

const TabLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <main className="w-full flex y-[100vh]  overflow-y-auto box-border">
        <NavigationBar />
        <div className="w-[60%]">{children}</div>
      </main>
    </div>
  );
};

export default TabLayout;
