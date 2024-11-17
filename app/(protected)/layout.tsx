import React from "react";

export default function ProtectedLayout({ children }: React.ReactNode) {
  return (
    <div
      className="h-full  
  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800"
    >
      {children}
    </div>
  );
}
