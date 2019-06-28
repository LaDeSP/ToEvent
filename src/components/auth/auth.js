import FirebaseService from '../services/firebaseService'
import { False, True } from '../constant'
import md5 from 'md5'
import { sendEmail } from '../utils/email'

export const doLogin = async ( form ) => {
    let user = await FirebaseService.getOneData('users', form.rga)
    if( !user || user.password !== md5(form.password) ){
        let error = { isSuccess: False, message: 'Email ou Password não válido'}
        return error
    }
    let success = {
        isSuccess: True,
        data: user
    }
    return success
}

export const doInscription = async ( form ) => {
    let user = await FirebaseService.getOneData('users', form.rga)
    if( user ){
        let error = { isSuccess: False, message: 'RGA já cadastrado'}
        return error
    }
    let isSuccess = await FirebaseService.insertData({ ...form, password: md5(form.rga) }, 'users', form.rga)
    let success = { isSuccess: isSuccess, message: 'Cadastrado com successo.'}

    if(form.email){
        sendEmail( form.email, form.rga )
    }

    return success
}

export const changePassword = async ( password, rga ) => {
    try {
        FirebaseService.updateData((user) => {
            if(user){
                user.password = md5(password)
            }
            return user
        }, 'users', rga)

        return true
    } catch (error) {
        return false
    }
}