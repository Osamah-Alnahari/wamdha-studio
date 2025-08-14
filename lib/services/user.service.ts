import { createUser, updateUser, deleteUser } from "@/src/graphql/mutations";
import { getUser, listUsers } from "@/src/graphql/queries";

// User CRUD Operations
export const createUserProfile = async (client: any, input: any) => {
  try {
    const response = await client.graphql({
      query: createUser,
      variables: { input },
      authMode: "userPool",
    });
    return response.data?.createUser || null;
  } catch (error: any) {
    console.log("Error creating user:", error);
    throw error;
  }
};

export const getUserById = async (client: any, userId: string) => {
  try {
    const response = await client.graphql({
      query: getUser,
      variables: { id: userId },
      authMode: "userPool",
    });
    return response.data?.getUser || null;
  } catch (error: any) {
    console.log("Error fetching user by ID:", error);
    return null;
  }
};

export const updateUserProfile = async (client: any, input: any) => {
  try {
    const response = await client.graphql({
      query: updateUser,
      variables: { input },
      authMode: "userPool",
    });
    return response.data?.updateUser || null;
  } catch (error: any) {
    console.log("Error updating user:", error);
    throw error;
  }
};

export const deleteUserProfile = async (client: any, userId: string) => {
  try {
    const response = await client.graphql({
      query: deleteUser,
      variables: { input: { id: userId } },
      authMode: "userPool",
    });
    return response.data?.deleteUser || null;
  } catch (error: any) {
    console.log("Error deleting user:", error);
    throw error;
  }
};

// User Query Operations
export const listAllUsers = async (
  client: any,
  filter?: any,
  limit?: number,
  nextToken?: string
) => {
  try {
    const response = await client.graphql({
      query: listUsers,
      variables: {
        filter,
        limit,
        nextToken,
      },
      authMode: "userPool",
    });
    return response.data?.listUsers || { items: [], nextToken: null };
  } catch (error: any) {
    console.log("Error listing users:", error);
    return { items: [], nextToken: null };
  }
};

// User Business Logic Functions
export const getUserByEmail = async (client: any, email: string) => {
  try {
    const response = await client.graphql({
      query: listUsers,
      variables: {
        filter: { email: { eq: email } },
        limit: 1,
      },
      authMode: "userPool",
    });
    const users = response.data?.listUsers?.items || [];
    return users.length > 0 ? users[0] : null;
  } catch (error: any) {
    console.log("Error fetching user by email:", error);
    return null;
  }
};

export const getUserByUsername = async (client: any, username: string) => {
  try {
    const response = await client.graphql({
      query: listUsers,
      variables: {
        filter: { username: { eq: username } },
        limit: 1,
      },
      authMode: "userPool",
    });
    const users = response.data?.listUsers?.items || [];
    return users.length > 0 ? users[0] : null;
  } catch (error: any) {
    console.log("Error fetching user by username:", error);
    return null;
  }
};

export const updateUserLastActive = async (client: any, userId: string) => {
  try {
    const now = new Date().toISOString();
    const response = await client.graphql({
      query: updateUser,
      variables: {
        input: {
          id: userId,
          lastActive: now,
        },
      },
      authMode: "userPool",
    });
    return response.data?.updateUser || null;
  } catch (error: any) {
    console.log("Error updating user last active:", error);
    throw error;
  }
};

export const updateUserDailyStreak = async (
  client: any,
  userId: string,
  dailyStreak: number
) => {
  try {
    const response = await client.graphql({
      query: updateUser,
      variables: {
        input: {
          id: userId,
          dailyStreak,
        },
      },
      authMode: "userPool",
    });
    return response.data?.updateUser || null;
  } catch (error: any) {
    console.log("Error updating user daily streak:", error);
    throw error;
  }
};
