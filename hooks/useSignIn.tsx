import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite";

const useSignIn = () => {
  const { loading, isLoggedIn, refetch } = useGlobalContext();
  const [redirectToHomeState, setRedirectToHomeState] = useState(false);

  useEffect(() => {
    const redirectToHome = async () => {
      // await getCurrentUser();
      setRedirectToHomeState(true);
      // await logout();

      return <Redirect href="/" />;
    };

    if (!loading && isLoggedIn && !redirectToHomeState) {
      // redirectToHome();
      redirectToHome();
      // <Redirect href="/" />;
    }

    return () => {};
  }, [isLoggedIn]);
  return null;
};

export default useSignIn;
