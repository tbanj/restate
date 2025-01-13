import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Index = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-bold">Hello</Text>
      <Link href={"/(root)/sign-in"}>Sign In</Link>
      <Link href={"/(root)/(tabs)/explore"}>Explore</Link>
      <Link href={"/profile"}>Profile</Link>
      <Link href={"/(root)/(properties)/1"}>Property </Link>
    </View>
  );
};

export default Index;
