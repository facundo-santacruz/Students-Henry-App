import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { useMutation } from '@apollo/client';
import { EDIT_USER } from '../apollo/user';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../styles/ProfileEditStyles';
import { GET_USER } from '../apollo/user';
import firebase from 'firebase'

// var firebaseConfig = {
//     apiKey: "AIzaSyDtQ29gfkh61pkPbpbtE5H0zTwxbxIhh20",
//     authDomain: "henrystudentsapp.firebaseapp.com",
//     databaseURL: "https://henrystudentsapp-default-rtdb.firebaseio.com",
//     projectId: "henrystudentsapp",
//     storageBucket: "henrystudentsapp.appspot.com",
//     messagingSenderId: "315231833526",
//     appId: "1:315231833526:web:c9dc288b4577bb59968517",
//     measurementId: "G-J11J3Q6HK3"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   console.log(firebase)

export default function PhotoProfile({ route, navigation }) {

    const [data, setData] = useState(route.params.data);
    const [image, setImage] = useState(data.image)
    const [bool, setBool] = useState(false);
    const [editProfile] = useMutation(EDIT_USER);
    
    const handleSubmit = async () => {
        try {
            const response = await editProfile({
                variables: {
                    _id: data._id,
                    image: image,
                },
                refetchQueries: [{query: GET_USER, variables: {email: data.email}}]
            });
            console.log(response)
            navigation.navigate('Profile', {
                email: data.email
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getCameraPermissionAsync = async () => {
        if (Constants.platform.android || Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    const getLibraryPermissionAsync = async () =>{
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }
    
    const _pickImage = async () => {
        getLibraryPermissionAsync()
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
            base64: false
        });
        console.log(result)
        if (!result.cancelled) {
            setImage(result.uri);
            setBool(true);
        }
    };

    const takePhoto = async () => {
        getCameraPermissionAsync()
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0,
            base64: false
        });
        if (!result.cancelled) {
            setImage(result.uri);
            setBool(true);
            console.log(result)
        }
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "black" }}>
            <Image source={{ uri: image }} style={{borderRadius:100, width: 200, height: 200, marginBottom:10 }} />
            <TouchableOpacity
                style={styles.boton}
                icon="add-a-photo" mode="contained"
                onPress={_pickImage}
                >
                    <Text style={{color:"black"}}>Seleccionar Imagen</Text>
                </TouchableOpacity>
                {!Constants.platform.web ? 
                    <TouchableOpacity
                        style={styles.boton}
                        icon="add-a-photo" mode="contained"
                        onPress={ takePhoto }
                    >
                        <Text style={{fontColor:"black"}}>Tomar Foto</Text>
                    </TouchableOpacity>
                    : null }
                
            <TouchableOpacity
                style={styles.boton}
                mode="contained"
                onPress={ handleSubmit }
                disabled={!bool}
            >
                <Text style={{fontColor:"black"}}>Aceptar</Text>
            </TouchableOpacity>
        
        </View>
    );
}
                                
            