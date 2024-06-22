import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";

export interface Profile {
  ownersAddress: string;
  accountAddress: string;
  title: string;
  bio: string;
}

export const getProfile = async (index: number): Promise<Profile> => {
  const countResponse = await sql`SELECT COUNT(*) FROM Profiles;`;
  const safeIndex = index % countResponse.rows[0].count;
  const response =
    await sql`SELECT * FROM Profiles LIMIT 1 OFFSET ${safeIndex};`;
  const profile = response.rows[0];
  return {
    ownersAddress: profile.ownersaddress,
    accountAddress: profile.accountaddress,
    title: profile.title,
    bio: profile.bio,
  };
};

export const getProfileForAddress = async (
  ownersAddress: string
): Promise<Profile | null> => {
  const { rows } =
    await sql`SELECT * FROM Profiles WHERE OwnersAddress = ${ownersAddress};`;
  if (rows.length === 0) {
    return null;
  }
  const profile = rows[0];
  return {
    ownersAddress: profile.ownersaddress,
    accountAddress: profile.accountaddress,
    title: profile.title,
    bio: profile.bio,
  };
};

export const createProfile = async (
  profile: Profile
): Promise<QueryResult<QueryResultRow>> => {
  const { ownersAddress, accountAddress, title, bio } = profile;
  console.log("Adding profile to database:", profile);
  return sql`INSERT INTO Profiles (OwnersAddress, AccountAddress, Title, Bio) VALUES (${ownersAddress}, ${accountAddress}, ${title}, ${bio});`;
};

export const deleteProfile = async (
  ownersAddress: string
): Promise<QueryResult<QueryResultRow>> => {
  console.log("Deleting profile for OwnersAddress:", ownersAddress);
  if (!ownersAddress) {
    throw new Error("ownersAddress not supplied");
  }
  return sql`DELETE FROM Profiles WHERE OwnersAddress = ${ownersAddress};`;
};
