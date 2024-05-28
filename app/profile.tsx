import { Text, View} from "react-native";
import {useAuth} from "@/app/providers/AuthProvider";
import {Redirect, Stack} from "expo-router";
import { Entypo } from '@expo/vector-icons';
import {supabase} from "@/lib/supabase";
const Profile = () => {
    const { user} = useAuth()
    if(!user){
        return <Redirect href={"/login"}/>
    }
    return (
        <>
            <Stack.Screen options={{
                title: "Profile",
                headerStyle: {backgroundColor: "#5200b3"},
                headerTintColor: "white",
                headerTitleAlign: "center",
                headerRight: (() => (
                    <Entypo name="log-out" size={24} color="white" onPress={() => supabase.auth.signOut()} />
                ))
            }}/>
            <View>
                <Text>User: {user?.email}</Text>
            </View>
        </>
    )
}

export default Profile;