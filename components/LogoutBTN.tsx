import { View, Text, Alert } from "react-native";
import ReactNativeModal from "react-native-modal";
import React, { Dispatch, useState } from "react";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import CustomButton from "./CustomButton";
import { NativeModalState } from "@/constants/data";

interface IsignOutState {
  signOutActivated: boolean;
  signOutDone: string;
  BTNDisabled: boolean;
}
interface LogoutBTNProps {
  children: React.ReactNode | null;
  signOutState: IsignOutState;
  setSignOutState: Dispatch<
    React.SetStateAction<{
      signOutActivated: boolean;
      signOutDone: string;
      BTNDisabled: boolean;
    }>
  >;
}

const LogoutBTN = ({
  children,
  signOutState,
  setSignOutState,
}: LogoutBTNProps) => {
  const { user, refetch } = useGlobalContext();

  const handleRejectLogout = () => {
    // setShowNow(false);
    setSignOutState((prev: any) => ({
      ...prev,
      signOutActivated: false,
    }));
  };

  const handleLogoutModal = () => {
    setSignOutState((prev: any) => ({
      ...prev,
      signOutActivated: true,
      signOutDone: NativeModalState.success,
    }));
  };

  //   temporary
  const handleSignOut = () => {};
  //   const handleSignOut = async () => {
  //     try {
  //       setSignOutState((prev: any) => ({
  //         ...prev,
  //         BTNDisabled: true,
  //       }));
  //       //   setCOMPState({ ...COMPState, BTNDisabled: true, loadingState: true });
  //       setTimeout(async () => {
  //         if (state.isConnected) {
  //           const data = await handleClearStoredData();
  //           data && (await clearCacheData(data));
  //           resetUserMapData();
  //           await signOut();
  //         }
  //         router.replace("/(auth)/sign-in");
  //       }, 1000);
  //     } catch (error: any) {
  //       setSignOutState((prev: any) => ({
  //         ...prev,
  //         BTNDisabled: false,
  //       }));
  //       console.error("Failed to log out:", error);
  //     }
  //   };

  /* useFocusEffect(
        useCallback(() => {
          return () => {
            setTimeout(async () => {
              if (
                signOutState.signOutDone === NativeModalState.success &&
                state.isConnected
              ) {
                const data = await handleClearStoredData();
                if (data) await clearCacheData(data);
                setSignOutState((prev: any) => ({
                  ...prev,
                  //   location: null,
                  BTNDisabled: false,
                  signOutDone: NativeModalState.default,
                }));
              }
            }, 1000);
          };
        }, [])
      ); */
  return (
    <>
      {children}
      <ReactNativeModal
        isVisible={signOutState.signOutActivated}
        onModalHide={() => {}}
      >
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[150px] flex justify-center items-center">
          <Text className="text-2xl font-JakartaExtraBold mb-2">Logout</Text>
          <Text className="font-Jakarta mb-5">Do you want to logout.</Text>

          <View className="flex flex-row items-center space-x-2">
            <CustomButton
              title="No"
              onPress={handleRejectLogout}
              className="mt-5 !text-blue-500 !w-[100px]"
              bgVariant="secondary"
              disabled={signOutState.BTNDisabled}
            />

            <CustomButton
              title="Yes"
              onPress={handleSignOut}
              disabled={signOutState.BTNDisabled}
              className="mt-5 !w-[100px]"
            />
          </View>
        </View>
      </ReactNativeModal>
    </>
  );
};

export default LogoutBTN;
