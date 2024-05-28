import {Stack} from "expo-router";
import AuthProvider from "@/app/providers/AuthProvider";

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack>
                <Stack.Screen name={"(auth)"} options={{
                    title: "User Authentication",
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: "#202020"
                    }
                }}/>
            </Stack>
        </AuthProvider>
    );
}
