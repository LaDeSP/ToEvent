import FirebaseService from '../services/firebaseService'
import { objectToArray } from '../utils/document'

export const getSupportUsers = async () => {
    var users = await FirebaseService.getOneData('users')

    if(!users)
        return []

    users = objectToArray(users)

    var supportUsers = users.filter((user) => user.type === 'SUPPORT')

    return supportUsers
}

export const deleteSupportUsers = async (rga) => {
    var hasRemoved = await FirebaseService.removeData('users', rga)

    return hasRemoved
}