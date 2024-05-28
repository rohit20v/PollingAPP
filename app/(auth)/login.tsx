import React, {useState} from 'react'
import {Alert, AppState, StyleSheet, Text, View} from 'react-native'
import {Button, Input} from '@rneui/themed'
import {supabase} from "@/lib/supabase";

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})
export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function signInWithEmail() {
        setLoading(true)
        const {error} = await supabase.auth.signInWithPassword({email, password})

        if (error) {
            Alert.alert("Ops!", error.message, [
                {
                    text: "OK",
                }
            ])
        }
        else {
            Alert.alert("Success!", "Logged in successfully!", [
                {
                    text: "OK",
                }
            ])
        }
        setLoading(false)
    }

    async function signUpWithEmail() {
        setLoading(true)
        const {
            // data: {session},
            error,
        } = await supabase.auth.signUp({email, password})

        if (error) {
            Alert.alert("Ops!", error.message, [
                {
                    text: "OK",
                }
            ])
        }
        //else if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.lbl}> Login or Create an account</Text>
                <View style={[styles.verticallySpaced, styles.mt20]}>
                    <Input
                        label="Email"
                        leftIcon={{type: 'font-awesome', name: 'envelope'}}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder="email@address.com"
                        autoCapitalize={'none'}
                    />
                </View>
                <View style={styles.verticallySpaced}>
                    <Input
                        label="Password"
                        leftIcon={{type: 'font-awesome', name: 'lock'}}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        placeholder="Password"
                        autoCapitalize={'none'}
                    />
                </View>
                <View style={styles.btnGroup}>
                    <Button color={"#00a9e6"} title="      Log in       " disabled={loading}
                            onPress={() => signInWithEmail()}/>
                    <Button color={"#00a9e6"} title="      Sign up      " disabled={loading}
                            onPress={() => signUpWithEmail()}/>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
    btnGroup: {
        flex: 0,
        gap: 16,
        justifyContent: "space-evenly",
        flexDirection: "row",
        width: "100%"
    },
    lbl: {
        fontSize: 24,
        margin: 16,
        fontWeight: "bold",
        textAlign: "center"
    }

})
