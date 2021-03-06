import React, {useEffect, useState } from 'react';
import {  Switch, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image, View ,Text} from 'dripsy';
import { Container } from '../styled-components/Container'
import { GET_USER } from '../apollo/user';
import { REMOVE_MESA } from '../apollo/pairProgramming'
import { useQuery, useMutation } from '@apollo/client';
import {styles} from '../styles/WelcomeStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from './MenuDesplegable';
import moment from 'moment';

export default function Welcome({ navigation }) {
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const thereIsEmail = async () => {
            try{
                const x = await AsyncStorage.getItem('userEmail');
                console.log(x);
                setEmail(x);
            }catch(er){
                console.log(er)
            }
        }
        thereIsEmail();
    },[]);

    const { loading, data, error } = useQuery(GET_USER, {
        variables: {
            email,
        }
    })
    // const idMesa = localStorage.getItem('idMesa')
    // const cohorte = data?.users[0].cohorte;
    // const name = data?.users[0].firstName;
    // const userName = data?.users[0].username;
    // const cohorte2 = localStorage.setItem('Cohorte', cohorte);
    // const name2 = localStorage.setItem('name', name);
    // const userName2 = localStorage.setItem('userName', userName);
    
    const fecha = moment().format('DD/MM/YYYY')

    const [removeMesa] = useMutation(REMOVE_MESA);
    async function handleLogout() {
        // if(localStorage.getItem('idMesa')){
        //     await removeMesa({
        //         variables: {
        //             username: userName,
        //             dia: fecha
        //         }
        //     })
        //     localStorage.clear()
        // }
        await AsyncStorage.clear();
        navigation.navigate('Home');
    }

    // function handleMesa() {
    //     if(localStorage.getItem('idMesa')) {
    //         return navigation.navigate('SalaDeMesaNew')
    //     } else {
    //         return navigation.navigate('PairProgramming')
    //     }
    // }


    if(error) {
        navigation.navigate('Home')
    } else if (loading) {
        return (
        <View style= {{flex: 1, justifyContent: "center", flexDirection: "row", padding: 10, backgroundColor: 'black'}}>
            <ActivityIndicator size={50} color="yellow" />
        </View>)
    } else {
        const { firstName, lastName, username } = data?.users[0]
        return (
            <View style={styles.todo}>
                <View style={{zIndex: 5}}>
                    <Menu navigation={navigation} />
                </View>
                <Text style={styles.title} sx={{fontSize: [30, 50]}}>{`Bienvenido ${firstName} ${lastName}!`}</Text>
                <View style={styles.container}>
                    <View style={styles.boton} sx={{ width: [300, 600], height: [130, 200] }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile', { email })}>
                            <Image
                                source={require("../assets/materialEstudio2.jpg")}
                                style={styles.tarjeta} sx={{ width: [300, 600], height: [130, 200] }}
                            >
                            </Image>
                            <View style={{ width: '100%', justifyContent: 'center' }} sx={{ height: [130, 200] }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center', color: 'white' }}>
                                    Perfil
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boton} sx={{ width: [300, 600], height: [130, 200] }}>
                        <TouchableOpacity onPress={() => navigation.navigate('PairProgramming', { email })}>
                            <Image
                                source={require("../assets/PairPrograming.jpg")}
                                style={styles.tarjeta} sx={{ width: [300, 600], height: [130, 200] }}
                            >
                            </Image>
                            <View style={{ width: '100%', justifyContent: 'center' }} sx={{ height: [130, 200] }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center', color: 'white' }}>
                                    Pair Programing
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boton} sx={{ width: [300, 600], height: [130, 200] }}>
                        <TouchableOpacity onPress={() => navigation.navigate('StandUp')}>
                            <Image
                                source={require("../assets/standUp.jpg")}
                                style={styles.tarjeta} sx={{ width: [300, 600], height: [130, 200] }}
                            >
                            </Image>
                            <View style={{ width: '100%', justifyContent: 'center' }} sx={{ height: [130, 200] }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center', color: 'white' }}>
                                    Stand Up
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <TouchableOpacity style={styles.botonCerrar} onPress={handleLogout}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Cerrar sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}


/*
const [isEnabled, setIsEnabled] = useState(false);
const toggleSwitch = () => setIsEnabled(previousState => !previousState);

<Switch
    trackColor={{ false: "#767577", true: "#81b0ff" }}
    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
    ios_backgroundColor="#3e3e3e"
    onValueChange={toggleSwitch}
    value={isEnabled}
/>
*/
