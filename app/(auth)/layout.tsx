import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full">
      <main className="w-full flex h-full">{children}</main>
    </div>
  );
};

export default Layout;
