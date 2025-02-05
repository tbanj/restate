import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
  Query,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
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
      return true;
    }
  } catch (error) {
    console.error("Error checking user session:", error);
  }
}

export async function login() {
  return new Promise(async (resolve, reject) => {
    try {
      // for development
      // const redirectUri = Linking.createURL("/",);
      // for development build or  preview build
      const redirectUri = new URL(
        Linking.createURL("/", { isTripleSlashed: false })
      );
      if (!redirectUri.hostname) {
        redirectUri.hostname = "localhost";
      }
      console.log("login redirectUri", redirectUri);

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

      // Open auth session in browser
      const browserResult = await WebBrowser.openAuthSessionAsync(
        response.toString(),
        redirectUri,
        {
          showInRecents: true,
          preferEphemeralSession: true,
        }
      );

      // Optional: Set a timeout to handle cases where redirect doesn't happen
      const timeout = setTimeout(() => {
        subscription.remove();
        reject(new Error("Authentication timed out"));
        cleanup();
      }, 60000);
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

export async function getLatestProperties() {
  try {
    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    );

    return result.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "All")
      buildQuery.push(Query.equal("type", filter));

    if (query)
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ])
      );

    if (limit) buildQuery.push(Query.limit(limit));

    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQuery
    );

    return result.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// write function to get property by id
export async function getPropertyById({ id }: { id: string }) {
  try {
    const result = await databases.getDocument(
      config.databaseId!,
      config.propertiesCollectionId!,
      id
    );
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
