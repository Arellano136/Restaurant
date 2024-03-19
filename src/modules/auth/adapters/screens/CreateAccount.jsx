import React, { useState } from "react";
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button, Image, Icon, Text, Overlay } from '@rneui/base';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Logo from '../../../../../assets/logo.png';

export default function CreateAccount(props) {
    const { navigation } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [isOverlayVisible, setOverlayVisible] = useState(false);

    const auth = getAuth();

    const createUser = () => {
        if (email && password) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    setOverlayVisible(true);
                    setEmail("");
                    setPassword("");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // Handle errors here
                    console.error(errorMessage);
                    Alert.alert("Error", errorMessage);
                });
        } else {
            setEmailErrorMessage('Campo obligatorio para el correo electrónico');
            setPasswordErrorMessage('Campo obligatorio para la contraseña');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={Logo}
                style={styles.logo}
                resizeMode="contain" />
            <Input
                placeholder="example@utez.edu.mx"
                label="Correo electrónico"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
                labelStyle={styles.label}
                containerStyle={styles.input}
                errorMessage={emailErrorMessage}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="email-outline"
                        color='#a5853c' />
                } />
            <Input
                placeholder="*********"
                label="Contraseña: *"
                value={password}
                onChangeText={(text) => setPassword(text)}
                labelStyle={styles.label}
                containerStyle={styles.input}
                secureTextEntry={showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                        color='#a5853c'
                        onPress={() => setShowPassword(!showPassword)} />
                }
                errorMessage={passwordErrorMessage} />
            <Button
                title='Crear'
                onPress={createUser}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnStyle}
                titleStyle={{ color: 'black' }} />
            <Overlay isVisible={isOverlayVisible} onBackdropPress={() => setOverlayVisible(false)}>
                <View style={styles.overlayContainer}>
                    <Icon type="material-community" name="check-circle" size={50} color="green" />
                    <Text style={styles.overlayText}>Registro exitoso</Text>
                </View>
            </Overlay>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    label: {
        color: '#a5853c',
    },
    input: {
        width: '80%',
        marginBottom: 20,
    },
    btnContainer: {
        marginTop: 20,
    },
    btnStyle: {
        backgroundColor: '#a5853c',
    },
    overlayContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    overlayText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
