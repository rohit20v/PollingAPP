import {View, Text} from "react-native";
import {Stack, useLocalSearchParams} from "expo-router";


const Id = () => {
    const {id} = useLocalSearchParams()
    return (
        <>
            <Stack.Screen options={{
                title: "Poll #"+id,
                headerStyle: {backgroundColor: "#1e1c1c"},
                headerTintColor: "white",
                headerTitleAlign: "center",
            }}/>
            <View>
                <Text>Poll Data {id}</Text>
            </View>
        </>
    );
};

export default Id;