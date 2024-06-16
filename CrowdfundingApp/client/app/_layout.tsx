import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ThirdwebProvider } from "thirdweb/react";

import { useColorScheme } from "@/hooks/useColorScheme";
import HomeScreen from "./(tabs)";
import Lobby from "./(tabs)/lobby";
import NotFoundScreen from "./+not-found";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();
export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<ThirdwebProvider>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<Stack.Navigator>
					<Stack.Screen name="(tabs)/index" component={HomeScreen} options={{ headerShown: false }} />
					<Stack.Screen name="(tabs)/lobby" component={Lobby} options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" component={NotFoundScreen} />
				</Stack.Navigator>
			</ThemeProvider>
		</ThirdwebProvider>
	);
}
