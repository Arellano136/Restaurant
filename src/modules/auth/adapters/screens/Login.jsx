import React, { useState } from "react";
import { Input, Button, Image, Icon, Text } from '@rneui/base';
import { View, StyleSheet, Alert } from 'react-native';
import Logo from '../../../../../assets/logo.png'
import {isEmpty} from 'lodash';
import { Overlay } from 'react-native-elements'; // Importa Overlay desde 'react-native-elements' con el npm install react-native-elements 
import {Loading} from '../../../../kernel/component/Loading';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login(props) {
    const { navigation } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [isOverlayVisible, setOverlayVisible] = useState(false); // Estado para controlar la visibilidad del Overlay
    const [isVisible, setVisible] = useState(false);
    const [showmessage, setShowmessage] = useState({email:'',password:''});
   
    const auth = getAuth();

    const login = async()=>{
        if(!isEmpty(email) && !isEmpty(password)){
            setShowmessage({email:'', password:''})
            setVisible(true);
            try{
              const response= await signInWithEmailAndPassword(auth,email,password);
             navigation.navigate("UserLogged");
              setVisible(false);
            }catch(error){

                setShowmessage({email:'',password:"Ususario y/o contrasena incorrecta"})
                console.log("error",error);
            }finally{
                setVisible(false);
            }
        }else{
            setShowmessage({email:"Campo Obligatorio", password:"Campo Obligatorio"})
        }
    }
    return (
        <View  style={styles.container}>
            <Image
                source={Logo}
                style={styles.logo}
                resizeMode="contain" />
            <Input
                placeholder="example@utez.edu.mx"
                label="Correo electrónico"
                keyboardType="email-address"
                value={email}
                onChange={({ nativeEvent: { text } }) => setEmail(text)}
                labelStyle={styles.label}
                containerStyle={styles.input}
                errorMessage={showmessage.email}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="email-outline"
                        color='#a5853c' />
                } />
            <Input
                placeholder="*********"
                label="Contraseña:"
                value={password}
                onChange={({ nativeEvent: { text } }) => setPassword(text)}
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
                title='Iniciar sesión'
                onPress={login}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnStyle}
                titleStyle={{ color: 'black' }} />
            <Button
                title='Regístrate'
                type="clear"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnStyle}
                titleStyle={{ color: 'black' }}
                onPress={() => navigation.navigate('CreateAccount')}
            />
            {/* Overlay con diseño personalizado */}
            <Overlay isVisible={isOverlayVisible} onBackdropPress={() => setOverlayVisible(false)}>
                <View style={styles.overlayContainer}>
                    <Icon type="material-community" name="check-circle" size={50} color="green" />
                    <Text style={styles.overlayText}>Inicio de sesión exitoso</Text>
                </View>
            </Overlay>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        padding: 16
    },
    logo: {
        width: 150,
        height: 120,
        marginBottom: 8
    },
    input: {
        paddingHorizontal: 16,
        marginVertical: 8
    },
    label: {
        color: '#a5853c'
    },
    btnStyle: {
        color:'#FFFFFF',
        backgroundColor: '#a5853c',
    },
    // Modifica el margen vertical del contenedor de los botones por si hay mas de uno les da espacio 
    btnContainer: {
        width: '80%',
        marginTop: 10, // Puedes ajustar este valor según tus preferencias
        marginBottom: 10,
    },
    overlayContainer: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    overlayText: {
        fontSize: 18,
        marginTop: 10,
        textAlign: 'center',
    },
})
