import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGlobalContext } from "@/lib/global-provider";
import { useEffect } from "react";
import { initializeDeepLinks } from "@/lib/appwrite";

export default function AppLayout() {
  const { loading, isLoggedIn } = useGlobalContext();

  /* useEffect(() => {
    const unsubscribe = initializeDeepLinks();
    return () => unsubscribe();
  }, []); */

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <View className="flex-col space-y-2">
          <ActivityIndicator className="text-primary-300" size="large" />
          <Text className="text-sm text-black-300">Please wait...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) {
    return <Redirect href="/sign-in" />;
  }

  return <Slot />;
}
