import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import images from "@/constants/images";

const Index = () => {
  return (
    <View className="flex-1 items-center justify-center flex-col">
      <View>
        <Text className="font-bold">Hello</Text>
        <Link href={"/(root)/sign-in"}>Sign In</Link>
        <Link href={"/(root)/(tabs)/explore"}>Explore</Link>
        <Link href={"/profile"}>Profile</Link>
        <Link href={"/(root)/(properties)/1"}>Property </Link>
      </View>
    </View>
  );
};

export default Index;
