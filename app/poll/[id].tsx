import {Button, Pressable, Text, View} from "react-native";
import {Stack, useLocalSearchParams} from "expo-router";
import style from "@/styles/Styles"
import {Feather} from '@expo/vector-icons';
import {useState} from "react";


const poll = {
    title: "YES?",
    choices: [
        "YES",
        "NO"
    ]
}
const Id = () => {
    const {id} = useLocalSearchParams<{ id: string }>()
    const [selected, setSelected] = useState("")
    const [submit, setSubmit] = useState(false)


    return (
        <>
            <Stack.Screen options={{
                title: "Poll #" + id,
                headerStyle: {backgroundColor: "#009df1"},
                headerTintColor: "white",
                headerTitleAlign: "center",
            }}/>
            <View style={style.pollContainer}>
                <Text style={style.pollTitle}>{poll.title}</Text>
                <View style={style.choicesContainer}>
                    {poll.choices.map(e => (
                        <Pressable onPress={() => setSelected(e)} key={e} style={style.choices}>
                            <Feather name={e === selected ? "check-square" : "square"}
                                     size={18} color={e === selected ? "green" : "black"}/>
                            <Text style={{fontSize: 16}}>{e}</Text>
                        </Pressable>
                    ))}
                </View>
                <Button onPress={() => setSubmit(!submit)}
                        title={submit ? "submitted" : "submit"}
                        color={submit ? "green" : "#009df1"}></Button>
            </View>
        </>
    );
};
export default Id;