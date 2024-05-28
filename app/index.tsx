import {Alert, FlatList, Text, View} from "react-native";
import style from "@/styles/Styles";
import {Link, router, Stack} from "expo-router";
import {AntDesign} from '@expo/vector-icons';
import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabase";
import {Poll} from "@/types/interfaces";


export default function HomeScreen() {

    const [polls, setPolls] = useState<Poll[]>([])

    useEffect(() => {
        const fetchPolls = async () => {
            let {data: polls, error} = await supabase
                .from('Polls')
                .select('*')
            if (error) {
                Alert.alert("Maintenance break!")
            } else {
                console.log(polls)
                setPolls(polls as Poll[])
            }
        }
        fetchPolls()
    }, [])

    return (
        <>
            <Stack.Screen options={{
                title: "Polls",
                headerStyle: {backgroundColor: "#1e1c1c"},
                headerTintColor: "white",
                headerTitleAlign: "center",
                headerRight: (() => (
                    <Link href={"/poll/new"} style={{margin: 8}}>
                        <AntDesign name="pluscircleo" size={24} color="white"/>
                    </Link>
                )),
                headerLeft: (() => (
                    <AntDesign style={{margin: 8}} name="adduser" size={24} color="white"
                               onPress={() => router.push("/profile")}/>
                ))
            }}/>
            <View
                style={style.mainContainer}
            >
                <Text style={style.title}>Poll Free</Text>
                <FlatList
                    contentContainerStyle={{gap: 8}}
                    data={polls} renderItem={(poll) => (
                    <Link style={style.pollsContainer} href={"/poll/" + poll}>
                        <Text>{poll.item.id}. {poll.item.question}</Text>
                    </Link>

                )}>
                </FlatList>
            </View>
        </>
    );
}


