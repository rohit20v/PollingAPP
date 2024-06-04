import {ActivityIndicator, Alert, Button, Pressable, Text, View} from "react-native";
import {Stack, useLocalSearchParams} from "expo-router";
import style from "@/styles/Styles"
import {Feather} from '@expo/vector-icons';
import {useEffect, useState} from "react";
import {Poll} from "@/types/interfaces";
import {supabase} from "@/lib/supabase";

const Id = () => {
    const {id} = useLocalSearchParams<{ id: string }>()
    const [selected, setSelected] = useState("")
    const [submit, setSubmit] = useState(false)
    const [poll, setPoll] = useState<Poll>()
    useEffect(() => {
        const fetchPoll = async () => {
            let {data, error} = await supabase
                .from('Polls')
                .select('*')
                .eq("id", Number(id))
                .single()
            if (error) {
                Alert.alert(error.message)
            }
            setPoll(data)
        };
        fetchPoll()

    }, [])

    if (!poll) {
        return <ActivityIndicator/>
    }


    return (
        <>
            <Stack.Screen options={{
                title: "Poll #" + id,
                headerStyle: {backgroundColor: "#009df1"},
                headerTintColor: "white",
                headerTitleAlign: "center",
            }}/>
            <View style={style.pollContainer}>
                <Text style={style.pollTitle}>{poll.question}</Text>
                <View style={style.choicesContainer}>
                    {poll.options.map(e => (
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