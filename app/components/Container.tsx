export const Container = ({
  children,
  justify = "justify-center",
}: {
  children: React.ReactNode;
  justify?: string;
}) => {
  return (
    <div
      tw={`flex flex-col p-8 bg-[#0050FF] w-full h-screen text-5xl ${justify}`}
      style={{ fontFamily: "PatrickHand", fontWeight: 400 }}
    >
      {children}
    </div>
  );
};
