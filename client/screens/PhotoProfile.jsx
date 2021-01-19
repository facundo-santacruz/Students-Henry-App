import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { useMutation } from '@apollo/client';
import { EDIT_USER } from '../Querys/userQuery';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../styles/ProfileEditStyles';
import { GET_USER } from '../apollo/user';

export default function PhotoProfile({ route, navigation }) {


    const [bool, setBool] = useState(false);
    const [image, setImage] = useState(route.params.data.image);
    const [editProfile] = useMutation(EDIT_USER);
    console.log(route.params)
    const handleSubmit = async () => {
        try {
            const response = await editProfile({
                variables: {
                    image: image,
                    _id: route.params.data._id
                },
                refetchQueries: [{query: GET_USER, variables: {email: route.params.data.email}}]
            });
            navigation.navigate('Profile', {
                email: route.params.data.email
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getPermissionAsync = async () => {
        if (Constants.platform.android) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }
    
    const _pickImage = async () => {
        getPermissionAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
            base64: true
        });
        console.log(result)
        if (!result.cancelled) {
            setImage(result.uri);
            setBool(true);
        }
    };

    const takePhoto = async () => {
        getPermissionAsync()
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0,
            base64: true
        });
        if (!result.cancelled) {
            setImage(result.uri);
            setBool(true);
        }
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "black" }}>
            {image && <Image source={{ uri: image }} style={{borderRadius:100, width: 200, height: 200, marginBottom:10 }} />}
            <TouchableOpacity
                style={styles.boton}
                icon="add-a-photo" mode="contained"
                onPress={_pickImage}
                >
                    <Text style={{fontColor:"black"}}>Seleccionar Imagen</Text>
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
                                
            