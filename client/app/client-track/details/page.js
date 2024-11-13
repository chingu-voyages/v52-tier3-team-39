'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

const AppointmentDetails = () => {
    const router = useRouter();
    const [appointmentData, setAppointmentData] = useState('');
    const [loading, setLoading] = useState(true);

    //Grab appointment details from session storage
    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('appointment-details'));
        data === null && router.push('/client-track');
        console.log(data);
        setAppointmentData(data);
        setLoading(false);

        return () => {
            console.log('cleanup starting');
            // sessionStorage.removeItem('appointment-details');
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