import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity } from 'react-native';
import { View, Text, TextInput } from 'dripsy';
import {styles} from '../styles/SalaMesaStyle';
import TarjetaUser from '../Components/TarjetaUser';
import {GET_MESA, REMOVE_MESA, ADD_LINK, ADD_USERMESA} from '../apollo/pairProgramming';
import { useQuery, useMutation } from '@apollo/client';
import moment from 'moment';
import {ListItem, Avatar} from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';
import {Icon} from 'react-native-elements';
import Particles from './Particles';
import icon from '../assets/logoHenry.png';
import { ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';



export default function SalaDeMesa({ navigation, route }){
    const { email, cohorte, username } = route.params.data;

    const [value, setValue] = useState("");
    const [link, setLink] = useState("");
    const [usuarios, setUsuarios]= useState([]);
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [idMesa, setIdMesa] = useState();
    
        
    const [mutate] = useMutation(ADD_USERMESA, {
        variables:{
            username
        }
    })


    useEffect(() =>{
        // console.log(data)
        const handleClick = async () => {
            // console.log("hola");
            try {
                const info = await mutate();
                    // console.log('linea 40');
                    // console.log(info)
                    setData(info.data?.addUserPairProgramming)
                    setUsuarios(data.users);
                    setLink(data.linkMeet);
                    setIdMesa(data.idMesa)
                }catch (e) {
                    // console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEERRRROR")
                    setError(e)
                }
            // setData(data?.addUserPairProgramming)
            // console.log(data.addUserPairProgramming);
        }
        handleClick();
    },[data])
    

    function handlePress (){  
        WebBrowser.openBrowserAsync('http://meet.google.com/new');
    }
    function handlePress2 (){
        WebBrowser.openBrowserAsync(link);
    }
    
    const [removeMesa] = useMutation(REMOVE_MESA);
    const handleSubmit = async () => {
        await removeMesa({
            variables: {
                username: username
            }
        })
        navigation.navigate('Welcome');
    }
    const [addLink] =useMutation(ADD_LINK)
    const handleLink = async () => {
        setLink(value)
        await addLink({
            variables: {
                id: idMesa,
                link: value
            }
        })
    }
    
    const linkk = () => {
        if(link === false){
            return (<Text style={{color: '#6200ee'}}>  {linkMeet}</Text>)
        }
        else return (<Text style={{color: '#6200ee'}}>  {link}</Text>)
    }
    
    // function onRefresh() {
    //     let newLink = data?.pairProgramming[0].linkMeet;
    //     let newUsers = data?.pairProgramming[0].users
    //     setLink(newLink)
    //     setUsuarios(newUsers)
    // }

    // useEffect(() => {
    //     onRefresh()
    // }, [data?.pairProgramming[0].users.length])

    // useEffect(() => {
    //     onRefresh()
    //     setLink(data?.pairProgramming[0].linkMeet)
    // }, [data?.pairProgramming[0].linkMeet])
    if (data){
        // setUsuarios(data.users);
        // setLink(data.linkMeet);
        // setIdMesa(data.idMesa)
        // console.log(datos);
        return (
            <View style={styles.todo}>
                <ScrollView>

                    <View style={{alignItems: "center"}}>  
                        <View style={styles.botonLink} sx={{width: [200, 250], height: [35, 40], marginTop: 30}} >
                            <TouchableOpacity onPress={handlePress} >
                                <Text sx={{fontSize: [20,25], color: 'black', fontWeight: 'bold'}}>Generar Link</Text>
                            </TouchableOpacity>
                        </View> 
        
                        <Text style={styles.containerLink}> 
                            <TextInput style={styles.input} placeholder="Pegue el link aqui" sx={{width: [200, 250], height: [40, 50]}} onChangeText={(e) => setValue(e)}/>
                            <TouchableOpacity onPress={handleLink} style={styles.fijar}><Icon raised type="font-awesome-5" name="thumbtack" size={15}></Icon></TouchableOpacity>
                        </Text>
                        
                        <View style={styles.linkFijado}>
                            <Text style={styles.link} sx={{fontSize:[20, 30], display:'flex'}}> Link de la reunion   
                                <TouchableOpacity >
                                {/* onPress={onRefresh}  */}
                                    <Text sx={{fontSize:[15, 27], paddingLeft: 10}}>
                                        ↺
                                    </Text>
                                </TouchableOpacity>
                            </Text>
                            <TouchableOpacity onPress={handlePress2} >
                                <Text sx={{fontSize:[18, 30]}}>
                                    {link && link}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                        {!usuarios ?
                            <View style= {{flex: 1, justifyContent: "center", flexDirection: "row", padding: 10, backgroundColor: 'black'}}>
                                <ActivityIndicator size={50} color="yellow" />
                            </View> :
                            <TarjetaUser users= {usuarios}/>
                        }
                        {/* <View style={styles.container}>
                            {
                                datos && usuarios.map((l, i) => {
                                    return (
                                        <ListItem key={i} bottomDivider>
                                            <Image source={l.image || icon} style={{width: 60, height: 60, borderRadius: 100}}/>
                                            <ListItem.Content style={styles.content}>
                                                <ListItem.Title style={{fontSize: 20}}>{l.firstName}</ListItem.Title>
                                                <ListItem.Subtitle>{l.lastName}</ListItem.Subtitle>
                                            </ListItem.Content>
                                        </ListItem>
                                    )
                                })
                            }
                        </View> */}
                        <View style={styles.containerBoton}>
                            <View sx={{width: [130, 200], height: [40, 50]}} style={styles.botonSalir}  >
                                <TouchableOpacity onPress={handleSubmit} >
                                    <Text sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: [15, 18]}}>Salir</Text>
                                </TouchableOpacity>
                            </View>
                            <View sx={{width: [130, 200], height: [40, 50]}} style={styles.botonSalir}>
                                <TouchableOpacity  onPress={() => navigation.navigate('Welcome')}>
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize:  [15, 18] }}>Inicio</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    // }
    // else if(loading){
    //     console.log(loading)
    //     return (
    //         <View style= {{flex: 1, justifyContent: "center", flexDirection: "row", padding: 10, backgroundColor: 'black'}}>
    //             <ActivityIndicator size={50} color="yellow" />
    //         </View>)
    }else if(error){
        console.log(error)
        return (
            <View>
                <Text>Nothing</Text>
            </View>
        )
    }
}