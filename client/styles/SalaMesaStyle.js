import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    todo:{
        width: '100%', 
        height: '100%', 
        backgroundColor: "black",
        display: 'flex',
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    botonSalir:{
        backgroundColor: 'yellow',
        // marginTop: 5
        borderRadius:20,
        justifyContent: "center"
    },
    containerBoton: {
        display: 'flex',
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-around',
        marginTop: 4
    },
    input:{
        // width: 200,
        borderBottomColor: 'gray',
        // borderBottomWidth: 'thin',
        marginLeft: 10,
        marginRight: 10,
        textAlign: "center",
        width: "80%"
    },
    fijar:{
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 5
    },
    link:{
        // display: 'flex',
        textAlign: 'center', 
        fontWeight: 'bold', 
    },
    linkFijado:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    botonLink:{
        backgroundColor: 'yellow',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        alignItems: "center"
    },
    list: {
        borderRadius: 50
    },
    content: {
        paddingVertical: 4
    }, 
    btnLink:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        backgroundColor: "yellow", 
        padding: 10, 
        fontSize: 15, 
        fontWeight: "bold"
    },
    btnLink2:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        backgroundColor: "yellow", 
        padding: 10, 
        fontSize: 15, 
        fontWeight: "bold"
    },
    containerLink: {
        marginBottom: 2,
        marginTop: 4,
        backgroundColor: "gray",
        width: "80%",
    }

})