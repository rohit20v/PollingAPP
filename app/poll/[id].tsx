import {ActivityIndicator, Alert, Button, Pressable, Text, View} from "react-native";
import {router, Stack, useLocalSearchParams} from "expo-router";
import style from "@/styles/Styles"
import {Feather} from '@expo/vector-icons';
import {useEffect, useState} from "react";
import {Poll, Votes} from "@/types/interfaces";
import {supabase} from "@/lib/supabase";
import {useAuth} from "@/app/providers/AuthProvider";

const Id = () => {
    const {id} = useLocalSearchParams<{ id: string }>()
    const [selected, setSelected] = useState("")
    const [submit, setSubmit] = useState(false)
    const [poll, setPoll] = useState<Poll>()
    const [userVote, setUserVote] = useState<Votes>()
    const {user} = useAuth();
    useEffect(() => {
        (async () => {
            let {data, error} = await supabase
                .from('Polls')
                .select('*')
                .eq("id", Number(id))
                .single()
            if (error) {
                Alert.alert(error.message)
            }
            setPoll(data)
        })();

        (async () => {
            let {data} = await supabase
                .from('votes')
                .select('*')
                .eq("poll_id", Number(id))
                .eq('user_id', user?.id)
                .limit(1)
                .single()
            setUserVote(data)
            if (data) {
                setSelected(data.option)
            }
        })();

    }, [])

    if (!poll) {
        return <ActivityIndicator/>
    }

    const vote = async () => {
        const newVote = {
            option: selected,
            poll_id: poll.id,
            user_id: user?.id
        }
        if (userVote){
            newVote.id = userVote.id
        }
        const {error} = await supabase
            .from('votes')
            .upsert([
                newVote
            ])
            .select()
            .single()
        if (error) {
            Alert.alert("Maintenance break!")
        } else {
            Alert.alert("Thanks for voting")
            setSubmit(true);
            router.back()
        }

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
                <Button onPress={vote}
                        title={submit ? "submitted" : "submit"}
                        color={submit ? "green" : "#009df1"}
                        disabled={submit}></Button>
            </View>
        </>
    );
};
export default Id;