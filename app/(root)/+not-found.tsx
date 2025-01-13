import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function NotFoundScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <View className="space-y-3 flex-col">
        <Text className="font-bold py-3 text-base">Page Not Found</Text>
        <Text>This screen doesn't exist.</Text>
        <Link href={"/"}>Go to home screen!</Link>
      </View>
    </View>
  );
}
