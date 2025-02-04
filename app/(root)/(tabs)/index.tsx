import { SafeAreaView } from "react-native-safe-area-context";
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
