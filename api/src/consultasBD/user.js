import User from '../models/Users';

export const existUser = async(username) => {
    const user = await User.findOne({"username": username});
    if (!user){
        throw new Error (`El Usuario ${username} no existe.`);
    };   
    return user;
}

export const pushUser = async ( id_user, name , place) => {
    return await User.findOneAndUpdate({ _id: id_user}, {
        $push: {
            [place]: name
        }
    })
};

export const pullUser = async ( id_user, name , place) => {
    return await User.findOneAndUpdate({ _id: id_user}, {
        $pull: {
            [place]: name
        }
    })
};

// FUNCIÓN PARA COMPROBAR QUE NO SE REPITA UN CAMPO ÚNICO(EMAIL Y USERNAME) 
export const noExist = async(text, field) => {
    const user = await User.findOne({[field]: text});
    console.log(user)
    if (user){
        throw new Error (`El ${field} ${text} ya existe, no puede terner el mismo nombre de ${text}.`);
    };   
    return user;
}