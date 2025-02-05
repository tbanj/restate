import { LogBox } from "react-native";
import "./global.css";
import { useFonts } from "expo-font";

import React, { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import GlobalProvider from "@/lib/global-provider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  LogBox.ignoreLogs(["AppwriteException:"]);

  const removeSplashScreen = async () => {
    await SplashScreen.hideAsync();
  };
  useEffect(() => {
    if (fontsLoaded) {
      removeSplashScreen();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GlobalProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GlobalProvider>
  );
}
