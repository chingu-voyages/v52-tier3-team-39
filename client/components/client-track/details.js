'use client'

import './details.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useClientContext } from '../../context/clientContext';
import { cancelAppointment } from '../../actions/client-track';

const AppointmentDetails = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { appointmentData, setAppointmentData } = useClientContext();

    useEffect(() => {
        if (appointmentData === '') {
            router.push(`/client-track`)
        } else {
            setLoading(false);
        }
    }, [])

    const onClick = async e => {
        e.preventDefault();
        const btn = document.querySelector('.cancel-btn');
        btn.textContent = 'Cancelling...';
        const res = await cancelAppointment(12);
        console.log(res);
        if(res === 204) {
            btn.textContent = 'Appointment Cancelled';
        } else {
            console.log('failed', res)
            btn.textContent = 'Error - Retry';
        }
    }

    return (
        <div>
            {
                loading ?
                    <div>Loading...</div> :
                    <div className='details-container'>
                        <div className='appointment-card'>
                            <h1>Appointment Details</h1>
                            <div className='details'>
                                <span className='appointment-detail name'>{appointmentData.name}</span>
                                <span className='appointment-detail'>Email: {appointmentData.email}</span>
                                <span className='appointment-detail'>Phone: {appointmentData.phone}</span>
                                <span className='appointment-detail address'>{`${appointmentData.address} ${appointmentData.city}, ${appointmentData.state} ${appointmentData.zipcode}`}</span>
                                <span className='appointment-detail time'>Scheduled for {appointmentData.appointmentTime}</span>
                            </div>
                            <div>
                                <button className='cancel-btn' onClick={onClick}>Cancel</button>
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}

export default AppointmentDetails;