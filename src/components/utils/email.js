import axios from 'axios'
export const sendEmail = async (email, password) => {
    try {
        const response = await axios.get(`https://ladesp-api-test.herokuapp.com/api/email/v0/pet/${email}/${password}`);
        return response.status
    } catch (error) {
        return error
    }
}

