import {firebaseDatabase} from '../utils/firebaseUtils'

export default class FirebaseService {

    static getOneData = async (path, ...child) => {

        var query = firebaseDatabase.ref(path)

        if(child.length !== 0)
            child.forEach((item) => {
                query = query.child(item)
            })

        const snapshot = await query.once('value')
        const value = snapshot.val()

        return value
    }

    static listenIfChildAdded = (path, id, callback) => {
        const query = firebaseDatabase.ref(path).child(id)

        query.on("child_added", callback);
    }

    static insertData = (form, path, ...child) => {
        try {
            var query = firebaseDatabase.ref(path)

            if(child.length !== 0)
                child.forEach((item) => {
                    query = query.child(item)
                })

            query.set(form)
            return true
        } catch (error) {
            return error
        }
    }

    static removeData = (path, ...child) => {
        try {
            var query = firebaseDatabase.ref(path)

            if(child.length !== 0)
                child.forEach((item) => {
                    query = query.child(item)
                })

            query.remove()
            return true
        } catch (error) {
            return error
        }
    }

    static updateData = (callback, path, ...child) => {
        try {
            var query = firebaseDatabase.ref(path)

            if(child.length !== 0)
                child.forEach((item) => {
                    query = query.child(item)
                })

            query.transaction(callback)
            return true
        } catch (error) {
            return error
        }
    }

}