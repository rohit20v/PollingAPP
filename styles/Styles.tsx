import {StyleSheet} from "react-native";

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20,
        gap: 8,
    },
    title: {
        color: "#1e1c1c",
        fontSize: 42,
        fontWeight: "bold",
    },
    pollsContainer: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
    },
    pollContainer: {
        padding: 8,
        borderRadius: 8,
        gap: 16,
    },
    pollTitle: {
        padding: 8,
        fontWeight: "bold",
        fontSize: 32,
    },
    choices: {
        backgroundColor: "white",
        padding: 12,
        borderRadius: 6,
        flexDirection: "row",
        gap: 10,
    },
    choicesContainer: {
        padding: 8,
        borderRadius: 12,
        gap: 8,
    },
    newPollContainer: {
        padding: 16,
        gap: 8,
    },
    newPollTitle: {
        fontWeight: "bold",
        fontSize: 24,
        marginTop: 8,
    },
    newPollInput: {
        borderStyle: "solid",
        borderColor: "black",
        backgroundColor: "white",
        padding: 6,
        borderRadius: 8,
    },
    newPollOptions: {
        gap: 8,
        marginBottom: 16,
    },
    newPollBtnContainer: {
        flex: 0,
        alignItems: "center",
    },
    newPollBtn: {
        padding: 10,
        borderRadius: 16,
        width: "42%",
        alignItems: "center"
    }

})