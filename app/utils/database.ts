interface Profile {
  address: string;
  title: string;
  bio: string;
}

const demoData = [
  {
    address: "0x1",
    title: "Single White Female",
    bio: "Single White Female seeks degen for alpha",
  },
  {
    address: "0x2",
    title: "Man with money",
    bio: "Male degen with bags of money looking for a good time",
  },
  {
    address: "0x3",
    title: "Tall woman",
    bio: "7 foot tall woman seeks dwarf for fun and games",
  },
];

// TODO: Get from database
export const getProfile = async (index: number): Promise<Profile> => {
  const safeIndex = index % demoData.length;
  return new Promise((res) => res(demoData[safeIndex]));
};

export const createProfile = async (profile: Profile): Promise<void> => {
  return new Promise((res) => res());
};

export const deleteProfile = async (address: string): Promise<void> => {
  return new Promise((res) => res());
};
