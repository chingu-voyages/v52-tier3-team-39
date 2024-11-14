'use client'

import { createContext, useContext, useState } from 'react';

const ClientContext = createContext();

export const ClientProvider = ({children}) => {
    // To pass data from client-track to details page
    const [appointmentData, setAppointmentData] = useState('');

    return(
        <ClientContext.Provider value={{appointmentData, setAppointmentData}}>
            {children}
        </ClientContext.Provider>
    )
}

export const useClientContext = () => useContext(ClientContext);