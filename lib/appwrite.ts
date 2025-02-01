import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
// import { openAuthSessionAsync } from "expo-web-browser";
import * as WebBrowser from "expo-web-browser";

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
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

// Keep track of the active subscription
let activeSubscription: { remove: () => void } | null = null;

// Check if user is authenticated
export async function checkIfAuthenticated(data: any) {
  try {
    await account.createSession(data?.userId, data?.secret);
    // await new Promise((resolve) => setTimeout(resolve, 500));
    const currentUser = await account.get();
    if (currentUser.$id) {
      return true; // User is authenticated
    }
  } catch (error) {
    console.error("Error checking user session:", error);
  }
}

export async function login() {
  return new Promise(async (resolve, reject) => {
    try {
      const state = Math.random().toString(36).substring(7);
      const redirectUri = Linking.createURL("/");

      // First, try to clean up any existing sessions
      try {
        // Cleanup function
        await WebBrowser.coolDownAsync();
      } catch (cleanupError) {
        console.log("Cleanup error (safe to ignore):", cleanupError);
      }

      // Warm up a new session
      await WebBrowser.warmUpAsync();

      // Create OAuth2 token
      const response = account.createOAuth2Token(
        OAuthProvider.Google,
        redirectUri,
        redirectUri,
        ["profile", "email"]
      );

      if (!response) {
        throw new Error("Failed to create OAuth2 token");
      }

      // Open auth session in browser
      const browserResult = await WebBrowser.openAuthSessionAsync(
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
      function cleanup() {
        subscription.remove();
        WebBrowser.coolDownAsync().catch(console.error);
      }

      // Add event listener for handling the redirect
      const subscription = Linking.addEventListener("url", async (event) => {
        try {
          const url = new URL(event.url);
          const secret = url.searchParams.get("secret");
          const userId = url.searchParams.get("userId");
          if (secret && userId) {
            // Clean up
            subscription.remove();
            // Resolve the promise with the authentication data
            // console.log("userId", userId);
            await new Promise((resolve) => setTimeout(resolve, 500));
            resolve({ secret, userId });
            cleanup();
          }
        } catch (error) {
          console.error("Error handling redirect:", error, typeof error);
          subscription.remove();
          // Reject the promise with the error
          reject(error);
          cleanup();
        }
      });

      // Optional: Set a timeout to handle cases where redirect doesn't happen
      const timeout = setTimeout(() => {
        subscription.remove();
        reject(new Error("Authentication timed out"));
        cleanup();
      }, 60000); // 1 minute timeout
    } catch (error) {
      console.error("Login error:", error);
      // Make sure to clean up even if there's an error
      await WebBrowser.coolDownAsync();
      // Reject the promise with the error
      reject(error);
    }
  });
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
  if (!url) return;

  try {
    const parsedUrl = new URL(url);
    const secret = parsedUrl.searchParams.get("secret");
    const userId = parsedUrl.searchParams.get("userId");

    if (secret && userId) {
      await account.createSession(userId, secret);
      await new Promise((resolve) => setTimeout(resolve, 500));
      // return true;
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
