// import React, { useEffect } from "react";
// import { StatusBar, Linking, Alert } from "react-native";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import { SnackbarProvider } from "./src/contexts/SnackbarContext";

// import { AlertProvider } from "./src/contexts/AlertContext";
// import { LoaderProvider } from "./src/contexts/LoaderContext";
// import RootNavigator from "./src/navigation/RootNavigator";

// export default function App() {
//   useEffect(() => {
//     const handleDeepLink = (event: { url: string }) => {
//       const url = event.url;
//       if (url.includes("success=true")) {
//         Alert.alert("Signup Successful", "Welcome! Please log in to continue.");
//       }
//     };

//     const subscription = Linking.addEventListener("url", handleDeepLink);

//     Linking.getInitialURL().then((url) => {
//       if (url && url.includes("success=true")) {
//         Alert.alert("Signup Successful", "Welcome! Please log in to continue.");
//       }
//     });

//     return () => subscription.remove();
//   }, []);

//   return (
//     <SafeAreaProvider>
//       <SnackbarProvider>
//         <AlertProvider>
//           <LoaderProvider>
//             <SafeAreaView
//               style={{ flex: 1, backgroundColor: "#252628" }} 
//               edges={["bottom"]}
//             >
//               <StatusBar
//                 translucent={true}
//                 backgroundColor="#252628" 
//                 barStyle="light-content" 
//               />
//               <RootNavigator />
//             </SafeAreaView>
//           </LoaderProvider>
//         </AlertProvider>
//       </SnackbarProvider>
//     </SafeAreaProvider>
//   );
// }

import "./global.css"
import { Text, View } from "react-native";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
  );
}
