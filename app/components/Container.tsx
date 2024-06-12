export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      tw="flex flex-col p-8 bg-blue-200 w-full h-screen justify-center"
      style={{ fontWeight: 400 }}
    >
      {children}
    </div>
  );
};
