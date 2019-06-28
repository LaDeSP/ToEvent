import FirebaseService from '../services/firebaseService'
import { True, False } from '../constant';

export const presence = async (activityName, rga, activityType) => {
    const user = await FirebaseService.getOneData('users', rga)

    if(!user)
        return False

    if(activityType === 'ALL'){

        var form = {
            rga: user.rga,
            presence: true,
            name: user.name
        }

        return FirebaseService.insertData(form, 'activeties', activityName, 'users', user.rga)
        
    }

    const isSuccess = await FirebaseService.updateData((inscription) => {
        if(inscription){
            inscription.presence = true
        }
        return inscription
    }, 'activeties', activityName, 'users', rga)
    console.log(isSuccess)

    return True
} 