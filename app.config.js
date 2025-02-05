import "dotenv/config";
export default {
  expo: {
    name: "estate_Choice",
    slug: "estate_Choice",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "restate",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.tbanj.estate_Choice",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#ffffff",
      },
      userInterfaceStyle: "automatic",
      package: "com.tbanj.estate_Choice",
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
          image: "./assets/images/splash-icon.png",
          resizeMode: "cover",
          backgroundColor: "#ffffff",
          enableFullScreenImage_legacy: true,
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
        projectId: "6df88ea7-eee2-4c27-a0ac-4f5ac7d53fc1",
      },
    },
    updates: {
      url: "https://u.expo.dev/6df88ea7-eee2-4c27-a0ac-4f5ac7d53fc1",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
  },
};
