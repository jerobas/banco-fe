import React from "react";

export const Background = ({
  children,
  route,
}: {
  children: React.ReactNode;
  route: string;
}) => {
  const isRoom = /^\/room\/.+/.test(route);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-[#f5f5f5] bg-[#1e1e1e]">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #2a2a2a 1px, transparent 3px)",
          backgroundSize: "20px 20px",
        }}
      />
      <section className="absolute inset-0 flex justify-center items-center">
        {isRoom ? (
          children
        ) : (
          <div className="bg-[#222222] rounded-xl shadow-lg w-fit max-w-[640px] py-16 px-6 text-center">
            {" "}
            {children}
          </div>
        )}
      </section>
    </div>
  );
};
