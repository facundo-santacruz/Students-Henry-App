import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Avatar, Title, Caption, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/ProfileStyles';
import Particles from './Particles';
import MenuDesplegable from './MenuDesplegable';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../apollo/user';

export const getUser = (email) => useQuery(GET_USER, {
    variables: {
        email,
    },
})
const Profile = ({ route, navigation }) => {

    console.log(route.params)
    const { loading, data, error } = getUser(route.params.email)
    
    console.log(data)
    const handleProfileEdit = () => {
        navigation.navigate('ProfileEdit', { data: data.users[0] })
    };
    if(loading){
        return (
            <View style= {{flex: 1, justifyContent: "center", flexDirection: "row", padding: 10, backgroundColor: 'black'}}>
                <ActivityIndicator size={50} color="yellow" />
            </View>
        )
    }
    else if(data){
        
        const { firstName, lastName, email, nationality, phone, image, username } = data?.users[0]
        return (
            <SafeAreaView style={styles.container}>
                <View style={{width: 50, position: 'absolute', zIndex: 5}}>
                    <MenuDesplegable navigation={navigation} />
                </View>
                <View style={{width: '100%', height: '-webkit-fill-available', position: 'absolute', zIndex: -1}}>
                    <Particles />
                </View>
                <View style={styles.userInfoSection}>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Avatar.Image
                            size={200}
                            source={image || "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" }
                        />
                        <View style={{ marginLeft: 20 }}>
                            <Title style={[styles.title, {
                                marginTop: 15,
                                marginBottom: 5,
                            }]}>{firstName}</Title>
                            <Caption style={styles.caption}>{username}</Caption>
                        </View>
                    </View>
                </View>
                <View style={styles.userInfoSection}>
                    <View style={styles.row}>
                        <Icon name="map-marker-radius" color="#3b3b3b" size={20} />
                        <Text style={{ color: "#777777", marginLeft: 20 }}>{nationality || "Argentina"}</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="phone" color="#3b3b3b" size={20} />
                        <Text style={{ color: "#777777", marginLeft: 20 }}>{phone || "+54 XXXXX-XXXX"}</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="email" color="#3b3b3b" size={20} />
                        <Text style={{ color: "#777777", marginLeft: 20 }}>{email}</Text>
                    </View>
                </View>
                <View style={styles.userInfoSection}>
                    <TouchableOpacity style={styles.btn} onPress={handleProfileEdit}>
                        <View style={styles.row}>
                            <Icon name="account-edit" style={{ color: '#000000' }} size={20} />
                            <Text style={{ marginLeft: 20, color: '#000000', fontWeight: 'bold' }}>Editar Perfil</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

export default Profile;
