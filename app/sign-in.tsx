import {
  View,
  Text,
  ScrollView,
  Image,
  Touchable,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import {
  checkIfAuthenticated,
  getCurrentUser,
  login,
  logout,
} from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Link, Redirect, router } from "expo-router";

const SignIn = () => {
  const { loading, isLoggedIn, refetch } = useGlobalContext();
  const [redirectToHomeState, setRedirectToHomeState] = useState(false);
  const [IfAuthenticated, setIfAuthenticated] = useState<boolean>(false);

  const handleLogin = async () => {
    const result = await login();
    setIfAuthenticated(true);
    if (!!result) {
      const res = await checkIfAuthenticated(result);
      if (res) {
        refetch();
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIfAuthenticated(false);
        return router.push("/");
      }
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  useEffect(() => {
    const redirectToHome = async () => {
      setRedirectToHomeState(true);
      // await logout();

      return <Redirect href="/" />;
    };

    if (!loading && isLoggedIn) {
      // redirectToHome();
      redirectToHome();
      // <Redirect href="/" />;
    }

    if (!isLoggedIn && !redirectToHomeState) {
      setRedirectToHomeState(true);
    }

    return () => {};
  }, [isLoggedIn]);

  return (
    <SafeAreaView className="bg-white h-full">
      {IfAuthenticated && (
        <SafeAreaView className="absolute z-10 h-full flex justify-center items-center w-full">
          <View className="flex-col">
            <ActivityIndicator className="text-primary-300" size="large" />
            <Text className="text-sm text-black-300">Please wait...</Text>
          </View>
        </SafeAreaView>
      )}
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to Restate
          </Text>

          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let's Get You Closer to {"\n"}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Login to ReState with Google
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-3 mt-5"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2 pt-1">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
