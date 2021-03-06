import User from '../../models/Users';
import Cohorte from '../../models/Cohorte';
import bcrypt from 'bcrypt';
import { existCohorte } from '../../consultasBD/cohorte';
import { noExist } from '../../consultasBD/user';

import  {addUserCohorte} from '../Cohorte/cohorte'

export const regUser = async (username,firstName, lastName, cohorte,email, password) =>{
    const hash = await bcrypt.hash(password, 9);
    //verifico si existe el cohorte si desde el registro mandan uno
    if(cohorte === 0){
        cohorte = null;
    };
    await noExist(username, "username");
    await noExist(email, "email");
    if (cohorte) {
        cohorte = await existCohorte(cohorte);
        const user = await User.create( {username, firstName,lastName,cohorte:cohorte.number,email,password: hash});
        await Cohorte.findOneAndUpdate({"number": cohorte.number},
        {
            $push : {
                users : user._id 
            }
        });
        return User.findOne({_id: user._id});
    }
    return await User.create( {username, firstName,lastName,cohorte:cohorte,email,password: hash});
}

export const editUsers = async (input) =>{
    const id = input._id;
    console.log(input.image)
    const user = await User.findOne({_id: id });
    console.log(id);
    if(input.cohorte === 0){
        input.cohorte = null;
    }
    if(input.password ){
        const hash = await bcrypt.hash(input.password, 9);
        input.password= hash;
    }
        console.log(input.email !== user.email);
    if(input.email && input.email !== user.email){
        await noExist(input.email, "email");
    }
    if(input.username && input.username !== user.username){
        await noExist(input.username, "username");
    
    }
    if(input.image){
        input.image= input.image.toString();
    }
    if(input.cohorte){
        const cohorte = await existCohorte(input.cohorte);
        if(input.cohorte < cohorte.number){
            throw new Error('No se puede volver a cohortes anteriores')
        }
        input.cohorte = cohorte.number;
    };
    await  User.findOneAndUpdate({ _id: id }, input);
    return await User.findOne({_id: id});
}

export const compareCode = async (codigo, email) =>{
    const user = await  User.findOne({ "email": email });
    if(!user){
        throw new Error(`El email ${email} no existe`);
    }
    if(user.forgotPassword === -1){
        throw new Error(`El email ${email} no ha recibido ningún correo de cambio de contraseña`);
    }
    if((user.forgotPassword - codigo) !== 0){
        throw new Error(`El codigo ingresado es incorrecto`)
    }
    await User.findOneAndUpdate({_id: user._id}, {forgotPassword: -1});
    return User.findOne({_id: user._id});
}

export const changePassword = async (email, password) => {
    password = await bcrypt.hash(password, 9);
    const user = User.updateOne( {email: email}, {password: password});
    if (!user){
        throw new Error('El cambio de contraseña no pudo realizarse.');
    }
    return User.findOneAndUpdate({email: email},{password})
}