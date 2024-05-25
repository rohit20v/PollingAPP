import {FlatList, Text, View} from "react-native";
import style from "@/styles/Styles";
import {Link, Stack} from "expo-router";
import {AntDesign} from '@expo/vector-icons';

const polls = [{id: 1}, {id: 2}, {id: 3}]
export default function HomeScreen() {
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
            }}/>
            <View
                style={style.mainContainer}
            >
                <Text style={style.title}>Poll Free</Text>
                <FlatList
                    contentContainerStyle={{gap: 8}}
                    data={polls} renderItem={(poll) => (
                    <Link style={style.pollsContainer} href={"/poll/" + poll.item.id}>
                        <Text>{poll.item.id}. Yes or No</Text>
                    </Link>

                )}>
                </FlatList>
            </View>
        </>
    );
}


