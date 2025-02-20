import "dotenv/config";
export default {
  expo: {
    name: "estate_choice",
    slug: "estate_choice",
    version: "1.0.2",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "restate",
    userInterfaceStyle: "automatic",
    // temporary
    /* splash: {
      image: "./assets/images/icon.png",
      resizeMode: "cover",
      backgroundColor: "#FFFFFF",
    }, */
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.tbanj.estate_choice",
      /* splash: {
        image: "./assets/images/splash-light.png",
        resizeMode: "cover",
        backgroundColor: "#ffffff",
      }, */
    },
    android: {
      // temporary
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      userInterfaceStyle: "automatic",
      permissions: ["INTERNET", "ACCESS_NETWORK_STATE", "ACCESS_WIFI_STATE"],
      package: "com.tbanj.estate_choice",
      /* splash: {
        image: "./assets/images/splash-light.png",
        resizeMode: "cover",
        backgroundColor: "#ffffff",
      }, */
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-light.png",

          backgroundColor: "#FFFFFF",
          enableFullScreenImage_legacy: true,
          imageWidth: 200,
        },
      ],
      [
        "expo-font",
        {
          fonts: [
            "./assets/fonts/Rubik-Bold.ttf",
            "./assets/fonts/Rubik-ExtraBold.ttf",
            "./assets/fonts/Rubik-Light.ttf",
            "./assets/fonts/Rubik-Medium.ttf",
            "./assets/fonts/Rubik-Regular.ttf",
            "./assets/fonts/Rubik-SemiBold.ttf",
          ],
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "7880a5d9-bd59-417b-bb2e-ab96c7a55b69",
      },
    },
    updates: {
      url: "https://u.expo.dev/7880a5d9-bd59-417b-bb2e-ab96c7a55b69",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
  },
};
