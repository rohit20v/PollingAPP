import {Redirect, router, Stack} from "expo-router";
import {Alert, Text, TextInput, TouchableOpacity, View} from "react-native";
import style from "@/styles/Styles"
import {useState} from "react";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {useAuth} from "@/app/providers/AuthProvider";
import {supabase} from "@/lib/supabase";

const NewPoll = () => {
    const [created, setCreated] = useState<string>();
    const [options, setOptions] = useState(["", ""]);
    const [title, setTitle] = useState("");

    const {user} = useAuth()

    const createPoll = async () => {
        if (!title) {
            Alert.alert("Invalid insertion", "Please give your poll a title/question.")
            return
        }
        const validOptions = options.filter(option => option !== "")
        if (validOptions.length < 2) {
            Alert.alert("Invalid insertion", "Please provide at least 2 options, and remove the empty options.")
            return
        }

        const {error} = await supabase
            .from('Polls')
            .insert([
                {question: title, options: validOptions},
            ])
            .select()

        if (error) {
            Alert.alert("Database error", "Failed to create a poll")
            console.log(error)
            return
        }
        router.back()

        setCreated("created")
    };
    const addOption = () => {
        if (options.length < 10)
            setOptions(option => ([...option, ""]))
        else {
            Alert.alert("Ops!", "One poll cannot have more than 10 options", [
                {
                    text: "OK",
                }
            ])
        }
    };

    const removeOption = () => {
        if (options.length > 2)
            setOptions(option => option.slice(0, option.length - 1))
        else {
            Alert.alert("Ops!", "One poll must have at least 2 options", [
                {
                    text: "OK",
                }
            ])

        }
    };

    if (!user) {
        Alert.alert("No access", ("User must be logged in to be able to create polls"))
        return <Redirect href={"/login"}/>
    }

    function updatedOption(index: number, o: string) {
        const updatedOps = [...options]
        updatedOps[index] = o;
        setOptions(updatedOps)
    }

    return (
        <>
            <Stack.Screen options={{
                headerTitle: "New Poll",
                headerTitleAlign: "center",
                headerTintColor: "white",
                headerStyle: {backgroundColor: "#f1a500"}
            }}/>
            <View style={style.newPollContainer}>
                <Text style={style.newPollTitle}>Title</Text>
                <TextInput style={style.newPollInput} value={title} onChangeText={setTitle}
                           placeholder={"Describe your poll"}></TextInput>
                <View style={style.newPollOptions}>
                    <View style={{justifyContent: "center"}}>
                        <Text style={style.newPollTitle}>Options</Text>
                        <AntDesign style={{position: "absolute", right: 10, top: 12}} name="plus" size={24}
                                   color="black"
                                   onPress={addOption}/>
                    </View>
                    {
                        options.map((option, index) => (
                            <View key={index} style={{justifyContent: "center"}}>
                                <TextInput value={option}
                                           onChangeText={o => updatedOption(index, o)} style={style.newPollInput}
                                           placeholder={`Option ${index + 1}`}/>
                                <Ionicons onPress={removeOption} style={{position: "absolute", right: 10}}
                                          name="remove-circle-outline" size={24} color="black"/>
                            </View>
                        ))
                    }
                </View>
                <View style={style.newPollBtnContainer}>
                    <TouchableOpacity onPress={createPoll}
                                      style={[style.newPollBtn, {backgroundColor: created === "created" ? "#80694a" : "orange"}]}>
                        <Text style={{color: "white", fontSize: 16}}>Create new poll</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default NewPoll;