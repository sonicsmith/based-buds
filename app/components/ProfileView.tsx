export const ProfileView = ({ title, bio }: { title: string; bio: string }) => {
  return (
    <div tw="flex flex-col m-2 p-8 border-2 border-black bg-white items-center rounded-xl">
      <div
        tw="text-7xl mb-5"
        style={{ fontFamily: "LuckiestGuy", fontWeight: 400 }}
      >
        {title}
      </div>
      <div tw="text-5xl">{bio}</div>
    </div>
  );
};
