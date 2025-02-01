import {
  View,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import NoResults from "./NoResults";
import { Card, FeaturedCard } from "./Cards";
import icons from "@/constants/icons";
import Search from "./Search";
import Filters from "./Filters";

const HomeComponent = () => {
  const { user, refetch: refetched } = useGlobalContext();
  console.log("user", user);

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  /* const { data: latestProperties, loading: latestPropertiesLoading } =
        useAppwrite({
          fn: async function () {
            return [];
          },
        });
     */
  // temporary

  const latestProperties: any[] = [];
  const latestPropertiesLoading: boolean = false;

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Success", "Logged out successfully");
      refetched();
    } else {
      Alert.alert("Error", "Failed to logout");
    }
  };

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: async function () {
      return null;
    },
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <FlatList
      data={properties}
      numColumns={2}
      renderItem={({ item }) => (
        <Card item={item} onPress={() => handleCardPress(item.$id)} />
      )}
      keyExtractor={(item) => item.$id}
      contentContainerClassName="pb-32"
      columnWrapperClassName="flex gap-5 px-5"
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        loading ? (
          <ActivityIndicator size="large" className="text-primary-300 mt-5" />
        ) : (
          <NoResults />
        )
      }
      ListHeaderComponent={() => (
        <View className="px-5">
          <View className="flex flex-row items-center justify-between mt-5">
            <View className="flex flex-row">
              <Image
                source={{ uri: user?.avatar }}
                className="size-12 rounded-full"
              />

              <View className="flex flex-col items-start ml-2 justify-center">
                <Text className="text-xs font-rubik text-black-100">
                  Good Morning
                </Text>
                <Text className="text-base font-rubik-medium text-black-300">
                  {user?.name}
                </Text>
              </View>
            </View>
            <Image source={icons.bell} className="size-6" />
          </View>

          <Search />

          <View className="my-5">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">
                Featured
              </Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-primary-300">
                  See all
                </Text>
              </TouchableOpacity>
            </View>

            {latestPropertiesLoading ? (
              <ActivityIndicator size="large" className="text-primary-300" />
            ) : !latestProperties || latestProperties.length === 0 ? (
              <NoResults />
            ) : (
              <FlatList
                data={latestProperties}
                // ListEmptyComponent={}
                renderItem={({ item }) => (
                  <FeaturedCard
                    item={item}
                    onPress={() => handleCardPress(item.$id)}
                  />
                )}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-5 mt-5"
              />
            )}
          </View>

          {/* <Button title="seed" onPress={seed} /> */}

          <View className="mt-5">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">
                Our Recommendation
              </Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-primary-300">
                  See all
                </Text>
              </TouchableOpacity>
            </View>

            <Filters />
          </View>
        </View>
      )}
    />
  );
};

export default React.memo(HomeComponent);
