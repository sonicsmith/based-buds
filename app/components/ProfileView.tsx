export const ProfileView = ({ title, bio }: { title: string; bio: string }) => {
  return (
    <div tw="flex flex-col m-2 p-4 border-2 border-black w-full bg-white items-center">
      <div tw="text-7xl mb-5">{title}</div>
      <div tw="text-5xl">{bio}</div>
    </div>
  );
};
