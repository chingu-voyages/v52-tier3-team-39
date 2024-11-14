'use server'

import axios from'axios';

const getAppointment = async (formEmail, formPhone) => {
    console.log('running get appointment');
    try {
        const data = await axios({
            url: 'http://localhost:9000/client-track',
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            params: {email: formEmail, phone: formPhone}
        });
        console.log('from action', data.data.data);
        // return data;
    } catch(err) {
        console.log(err.response.data);
    }
}

export {
    getAppointment
}