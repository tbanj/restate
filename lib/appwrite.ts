import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { Platform } from "react-native";

export const config = {
  platform: "react-native",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
  // bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);

// Keep track of the active subscription
let activeSubscription: { remove: () => void } | null = null;

export async function login() {
  try {
    const state = Math.random().toString(36).substring(7);
    const redirectUri = Linking.createURL("/");

    // Add event listener for handling the redirect
    const subscription = Linking.addEventListener("url", async (event) => {
      try {
        const url = new URL(event.url);
        const secret = url.searchParams.get("secret");
        const userId = url.searchParams.get("userId");

        const currentSession = await account.getSession("current");
        await new Promise((resolve) => setTimeout(resolve, 500));
        /*  currentSession..if it is object and has a member, it will be +,but if it doesn't
        have a member, it will be false
        if it does */
        console.log(
          "currentSession inner",
          currentSession,
          "!!currentSession",
          !!currentSession
        );
        if (secret && userId) {
          if (!!currentSession) {
            // Create the session
            await account.createSession(userId, secret);
            await new Promise((resolve) => setTimeout(resolve, 500));
          }

          // Clean up
          subscription.remove();
        }
      } catch (error) {
        console.error("Error handling redirect:", error, typeof error);
      }
    });

    // Create OAuth2 token
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri,
      redirectUri,
      ["profile", "email"]
    );

    if (!response) {
      throw new Error("Failed to create OAuth2 token");
    }

    // Open auth session in browser
    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri,
      {
        showInRecents: true,
        preferEphemeralSession: true,
      }
    );

    /* 
    Wait a bit to allow the session to be created,
    */

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user is authenticated
    try {
      const currentUser = await account.get();
      if (currentUser.$id) {
        return true; // User is authenticated
      }
    } catch (error) {
      console.error("Error checking user session:", error);
    }

    return false; // Authentication failed
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
}

export async function logout() {
  try {
    /* use this if you have issue to Clean up any existing subscription */
    // Remove URL event listener if it exists
    if (activeSubscription) {
      activeSubscription.remove();
      activeSubscription = null;
    }

    await account.deleteSession("current");

    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const response = await account.get();

    if (response.$id) {
      const userAvatar = avatar.getInitials(response.name);
      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }
    return null;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
}

async function handleDeepLink(url: string) {
  console.log("handleDeepLink url empty", url);
  if (!url) return;

  try {
    const parsedUrl = new URL(url);
    const secret = parsedUrl.searchParams.get("secret");
    const userId = parsedUrl.searchParams.get("userId");

    if (secret && userId) {
      console.log("handleDeepLink secret && userId", secret, userId);
      await account.createSession(userId, secret);
    }
  } catch (error) {
    console.error("Deep link handling error:", error);
  }
}

export function initializeDeepLinks() {
  /* use this if you have issue to Clean up any existing subscription */
  if (activeSubscription) {
    activeSubscription.remove();
    activeSubscription = null;
  }

  // Handle deep linking when app is not running
  Linking.getInitialURL().then((url) => {
    if (url) {
      handleDeepLink(url);
    }
  });

  // Handle deep linking when app is running
  const subscription = Linking.addEventListener("url", (event) => {
    handleDeepLink(event.url);
  });

  return () => subscription.remove();
}
