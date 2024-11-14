'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useClientContext } from '../../context/clientContext';

const AppointmentDetails = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { appointmentData, setAppointmentData } = useClientContext();

    useEffect(() => {
        if(appointmentData === '') {
            router.push(`/client-track`)
        } else {
            setLoading(false);
        }
    }, [])

    return (
        <div>
            {
            loading ?
            <div>Loading...</div> :
            <div className='details-container'>
                <div className='appointment-card'>
                    <p>{appointmentData.name}</p>
                    <p>{appointmentData.email}</p>
                    <p>{appointmentData.phone}</p>
                    <p>{`${appointmentData.address} ${appointmentData.city}, ${appointmentData.State}`}</p>
                    <p>{appointmentData.zipCode}</p>
                </div>
            </div>
            }

        </div>
    )
}

export default AppointmentDetails;