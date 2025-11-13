// RootNavigator.tsx
//import React, { useEffect, useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

//import { useScreen } from "../../hooks/useScreen.hook";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};
export const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  // const { isScreenSeen } = useScreen(screenNames.GettingStartedScreen as unknown as string);
  // const [hasSeenGettingStarted, setHasSeenGettingStarted] = useState<boolean | null>(null);

  // useEffect(() => {
  //   const checkScreenStatus = async () => {
  //     const seen = await isScreenSeen();
  //     setHasSeenGettingStarted(seen);
  //   };
  //   checkScreenStatus();
  // }, [isScreenSeen]);

  // if (hasSeenGettingStarted === null) {
  //   return null;
  // }

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
 
      >
        {AuthStack()}
        {AppStack()}
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}