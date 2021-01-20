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
    const { email } = route.params;
    const { loading, data1, error, refetch } = useQuery(GET_USER, {
        variables: {
            email
        }
    })

    if(data1){
        const { loading, data, error, refetch } = useQuery(GET_MESASCOHORTE, {
            variables: {
                cohorte: data1.user[0].cohorte,
                dia: fecha
            }
        })
        if (data){
            return(
                <View>
                    {/* <Text>{data?.}</Text> */}
                </View>
            )
        }
    }else if(loading){
        return (
            <View style= {{flex: 1, justifyContent: "center", flexDirection: "row", padding: 10, backgroundColor: 'black'}}>
                <ActivityIndicator size={50} color="yellow" />
            </View>)
    }else if (error){
        <View>
            <Text>{error.message}</Text>
        </View>
    }
    
    
}