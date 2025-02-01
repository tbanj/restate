import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Filters from "@/components/Filters";

import icons from "@/constants/icons";

import { useAppwrite } from "@/lib/useAppwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite";
import { Card, FeaturedCard } from "@/components/Cards";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import HomeComponent from "@/components/HomeComponent";
// import { getLatestProperties, getProperties } from "@/lib/appwrite";

const Home = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <HomeComponent />
    </SafeAreaView>
  );
};

export default Home;
