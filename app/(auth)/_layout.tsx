import {Redirect, Slot} from "expo-router";
import {useAuth} from "@/app/providers/AuthProvider";

const ProfileLayout = () => {
    const { user} = useAuth()

    if(user){
        return <Redirect href={"/profile"}/>
    }
    return (
        <Slot />
    )
}

export default ProfileLayout