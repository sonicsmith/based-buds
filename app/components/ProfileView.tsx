export const ProfileView = ({ title, bio }: { title: string; bio: string }) => {
  return (
    <div tw="flex flex-col m-2 p-4 border-2 border-black w-full bg-white">
      <div tw="text-5xl mb-5">{title}</div>
      <div>{bio}</div>
    </div>
  );
};
