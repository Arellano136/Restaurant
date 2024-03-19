import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image, Button } from '@rneui/base'
import Logo from '../../../../../assets/logo.png'
export default function UserGuest(props) {
    const {navigation} = props;
    
    return (
        <View style={styles.container}>
            <Image
                source={Logo}
                resizeMode='contain'
                style={styles.logo}
            />
            <Text style={styles.title}>¡Descubre tu próximo restaurante favorito con nuestra aplicación! 🍽✨</Text>
            <Text style={styles.description}>En nuestra plataforma, explorarás una variedad increíble de restaurantes para cualquier ocasión, gusto o antojo. ¿Amante de la comida italiana, fanático de la comida rápida o en busca de la experiencia gourmet más refinada? Lo tenemos todo cubierto.</Text>
            
      <Button
        title="Iniciar sesion"
        type='clear'
        onPress={() => navigation.navigate('Login')}
      />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff'
    },
    logo: {
        width: 200,
        height: 200
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#a5853c'
    }

})