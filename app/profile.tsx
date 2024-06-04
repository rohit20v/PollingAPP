import { Text, View} from "react-native";
import {useAuth} from "@/app/providers/AuthProvider";
import {Redirect, Stack} from "expo-router";
import { Entypo } from '@expo/vector-icons';
import style from "@/styles/Styles"
import {supabase} from "@/lib/supabase";
import {useState} from "react";
const Profile = () => {
    const { user} = useAuth()

    const [color, setColor] = useState(false)

    const colorEffect = () => {
        setColor(true)
        setTimeout(() => {
            setColor(false)
        }, 4000)
    }

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
            <View style={style.profileContainer}>
                <View style={{alignItems: "center", padding: 16, marginBottom: 16}}>
                    <Text onPress={colorEffect} style={{
                        fontWeight: "bold",
                        fontSize: 32,
                        color: color? "#5200b3" : "black"}}>Welcome</Text>
                </View>
                <Text style={{fontWeight: "semibold", fontSize: 16}} >User: {"\n"+user?.email}</Text>
            </View>
        </>
    )
}

export default Profile;