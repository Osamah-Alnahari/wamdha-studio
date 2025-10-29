import { createUser } from "@/src/graphql/mutations";
import {
  AuthUser,
  fetchAuthSession,
  getCurrentUser,
  resendSignUpCode,
  signIn,
  signUp,
  confirmSignUp,
  signOut,
  fetchUserAttributes,
} from "@aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { generateClient } from "aws-amplify/api";
import { getUser } from "@/src/graphql/queries";
const client = generateClient();

// Types for auth operations
export interface SignInCredentials {
  username: string;
  password: string;
}

export interface SignUpData {
  username: string;
  password: string;
  userAttributes: {
    email: string;
    preferred_username: string;
    given_name: string;
  };
}

export interface ConfirmSignUpData {
  username: string;
  confirmationCode: string;
}

export interface UserSession {
  email: string;
  name: string;
  userId: string;
  isLoggedIn: boolean;
}

// Sign in user
export const signInUser = async (credentials: SignInCredentials) => {
  try {
    const result = await signIn({
      username: credentials.username,
      password: credentials.password,
    });

    // After successful sign-in, check if user exists in database
    // If not, create them (this handles first login after signup)
    if (result.isSignedIn) {
      try {
        const currentUser = await getCurrentUser();

        // Check if user exists in database
        const existingUser = await client.graphql({
          query: getUser,
          variables: { id: currentUser.userId },
          authMode: "userPool",
        });

        // User doesn't exist in database, create them
        if (!existingUser.data?.getUser) {
          const attributes = await fetchUserAttributes();

          await client.graphql({
            query: createUser,
            variables: {
              input: {
                id: currentUser.userId,
                email: attributes.email || credentials.username,
                givenName:
                  attributes.given_name ||
                  attributes.name ||
                  attributes.email ||
                  credentials.username,
                dailyStreak: 0,
                lastActive: new Date().toISOString(),
              },
            },
            authMode: "userPool",
          });
          console.log("User successfully created in database on first login");
        } else {
          // User exists, optionally update lastActive
          console.log("User already exists in database");
        }
      } catch (err: any) {
        // Log error but don't fail the sign-in
        console.error("Error checking/creating user in database:", err);
      }
    }

    return result;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// Sign up user
export const signUpUser = async (signUpData: SignUpData) => {
  try {
    const result = await signUp({
      username: signUpData.username,
      password: signUpData.password,
      options: {
        userAttributes: signUpData.userAttributes,
        autoSignIn: true,
      },
    });

    return result;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Confirm sign up
export const confirmSignUpUser = async (confirmData: ConfirmSignUpData) => {
  try {
    const result = await confirmSignUp({
      username: confirmData.username,
      confirmationCode: confirmData.confirmationCode,
    });

    return result;
  } catch (error) {
    console.error("Error confirming sign up:", error);
    throw error;
  }
};

// Create user in database after signup confirmation
// Should be called after confirmSignUp when user is auto-signed in
export const createUserAfterSignup = async (username: string) => {
  try {
    // Get current user and attributes
    const currentUser = await getCurrentUser();
    const attributes = await fetchUserAttributes();

    // Check if user already exists in database
    const existingUser = await client.graphql({
      query: getUser,
      variables: { id: currentUser.userId },
      authMode: "userPool",
    });

    // User already exists, no need to create
    if (existingUser.data?.getUser) {
      console.log("User already exists in the database");
      return true;
    }

    // User doesn't exist, create them
    await client.graphql({
      query: createUser,
      variables: {
        input: {
          id: currentUser.userId,
          email: attributes.email || username,
          givenName:
            attributes.given_name ||
            attributes.name ||
            attributes.email ||
            username,
          dailyStreak: 0,
          lastActive: new Date().toISOString(),
        },
      },
      authMode: "userPool",
    });
    console.log("User successfully created in database");
    return true;
  } catch (err: any) {
    // Check for specific error types
    const errorMessage = err?.errors?.[0]?.message || "";
    const errorType = err?.errors?.[0]?.errorType || "";
    
    // DynamoDB ConditionalCheckFailedException means user already exists
    if (errorType === "DynamoDB:ConditionalCheckFailedException" || 
        errorMessage.includes("ConditionalCheckFailedException") ||
        errorMessage.includes("already exists")) {
      console.log("User already exists in the database (detected from error)");
      return true;
    }
    
    // Log other errors for debugging
    console.error("Error creating user in database:", err);
    if (err?.errors) {
      console.error("GraphQL errors:", JSON.stringify(err.errors, null, 2));
    }
    return false;
  }
};

// Resend confirmation code
export const resendConfirmationCode = async (username: string) => {
  try {
    const result = await resendSignUpCode({
      username: username,
    });

    return result;
  } catch (error) {
    console.error("Error resending confirmation code:", error);
    throw error;
  }
};

// Sign out user
export const signOutUser = async () => {
  try {
    await signOut();
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Get current user
export const getCurrentUserInfo = async (): Promise<AuthUser | null> => {
  try {
    const currentUser = await getCurrentUser();
    return currentUser;
  } catch (error) {
    console.log("No user signed in");
    return null;
  }
};

// Get current session
export const getCurrentSession = async () => {
  try {
    const session = await fetchAuthSession();
    return session;
  } catch (error) {
    // Handle unauthenticated access gracefully
    if (error instanceof Error && error.name === "NotAuthorizedException") {
      console.log("No authenticated session found");
      return null;
    }
    console.error("Error fetching auth session:", error);
    throw error;
  }
};

// Get user attributes
export const getUserAttributes = async () => {
  try {
    const attributes = await fetchUserAttributes();
    return attributes;
  } catch (error) {
    console.error("Error fetching user attributes:", error);
    throw error;
  }
};

// Extract user info from session
export const extractUserFromSession = (session: any): UserSession | null => {
  try {
    if (!session || !session.tokens?.idToken) {
      return null;
    }

    const idToken = session.tokens.idToken.toString();
    const payload = JSON.parse(atob(idToken.split(".")[1]));

    return {
      email: payload.email || "",
      name: payload.name || "",
      userId: payload.sub || "",
      isLoggedIn: true,
    };
  } catch (error) {
    console.error("Error extracting user from session:", error);
    return null;
  }
};

// Get current user session info
export const getCurrentUserSession = async (): Promise<UserSession | null> => {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return null;
    }
    return extractUserFromSession(session);
  } catch (error) {
    console.error("Error getting current user session:", error);
    return null;
  }
};

// Listen to auth events
export const listenToAuthEvents = (callback: (payload: any) => void) => {
  return Hub.listen("auth", callback);
};

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const user = await getCurrentUserInfo();
    return user !== null;
  } catch (error) {
    return false;
  }
};
