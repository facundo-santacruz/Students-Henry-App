import React, { useEffect, useState } from 'react';
import { View, Text } from 'dripsy'
import { TouchableOpacity, Image} from 'react-native';
import { GET_MESASCOHORTE, ADD_USERMESA } from '../apollo/pairProgramming';
import { useQuery, useMutation } from '@apollo/client';
import {styles} from '../styles/MesaStyle';
import Mesa from './Mesas';
import moment from 'moment';
import Particles from './Particles';
import MenuDesplegable from './MenuDesplegable';
import zzz from '../assets/zzz.png';
import { GET_USER } from '../apollo/user';
import { ActivityIndicator } from 'react-native';

export default function Mesas({navigation, route}){
    const fecha = moment().format('DD/MM/YYYY');
    const { email, cohorte, username } = route.params.data;
    

    //AGREGAR NUEVO USUARIO
    const [addUserPairProgramming] = useMutation(ADD_USERMESA);
    const handleSubmit = async () => {
        const response = await addUserPairProgramming({
            variables: {
                username,
            }
        })
        console.log(response.data.addUserPairProgramming);
        navigation.navigate('SalaDeMesa', {data: response.data.addUserPairProgramming});
    }

    //AL INICIAR BUSCA SI EXISTE ALGUNA MESA
    const { loading, data, error } = useQuery(GET_MESASCOHORTE, {
        variables: {
            cohorte:cohorte,
            dia: fecha
        }
    })


    if (data){
        console.log(data);
        handleSubmit()
        
    }else if(loading){
        return (
            <View style= {{flex: 1, justifyContent: "center", flexDirection: "row", padding: 10, backgroundColor: 'black'}}>
                <ActivityIndicator size={50} color="yellow" />
            </View>)
    }else if (error){

        console.log(error);
        return(
        <View>
            <Text>{error.message}</Text>
        </View>
    )}
    
    
}