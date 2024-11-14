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
        console.log('returns', data);
        console.log('from action', data.data.data);
        return data.data.data;
    } catch(err) {
        console.log(err.response.data);
        return err.response.data;
    }
}

const cancelAppointment = async (id) => {
    console.log('deleting appointment');
    try {
        const res = await axios({
            url: `http://localhost:9000/client-track/details/${id}`,
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
        })

        if(res.status === 204) {
            console.log('Delete Successful');
            return res.status;
        } else {
            console.log('Delete failed');
            return false
        }
    } catch(err) {
        console.log(err);
        return false;
    }
}

export {
    getAppointment,
    cancelAppointment
}