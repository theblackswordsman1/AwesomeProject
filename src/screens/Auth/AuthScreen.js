import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase/firebaseConfig";

const AuthScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(true); // Toggle between SignUp and Login

    const authHandler = () => {
        const auth = getAuth();
        if (isSignUp) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(userCredential => {
                    // Signed in
                    console.log(userCredential);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then(userCredential => {
                    // Signed in
                    console.log(userCredential);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title={isSignUp ? "Sign Up" : "Login"} onPress={authHandler} />
            <Button
                title={`Switch to ${isSignUp ? "Login" : "Sign Up"}`}
                onPress={() => setIsSignUp(!isSignUp)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '80%',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});

export default AuthScreen;