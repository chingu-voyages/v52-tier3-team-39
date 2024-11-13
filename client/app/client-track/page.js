'use client';
import { useState, useEffect } from 'react';
import './client-track.css';
import { searchDB } from './mockData'
import { useRouter } from 'next/navigation';

//Form validation using yup
import * as yup from 'yup';

//Validate data form
const formSchema = yup.object().shape({
    email: yup.string()
        .email('Invalid email')
        .required('Email required'),
    phoneNumber: yup.string()
        .matches(/^[0-9]+$/, 'Invalid phone number')
        .min(10, 'Must be 10-digits')
        .max(10, 'Must be 10-digits')
})

const ClientTrack = () => {
    const [form, setForm] = useState({ email: '', phoneNumber: '' });
    const [formErrors, setFormErrors] = useState({});
    const [messages, setMessages] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const router = useRouter();

    //Auto validate form data when data is inputted
    useEffect(() => {
        formSchema
            .validate(form)
            .then(() => {
                setIsDisabled(false);
            })
            .catch(() => {
                setIsDisabled(true);
            })
    }, [form]);

    //Auto display error messages if form data fails validation
    useEffect(() => {
        const err = [];
        for (let errors in formErrors) {
            if (formErrors[errors] !== '') {
                err.push(formErrors[errors]);
            }
            setMessages(err);
        }
    }, [formErrors])

    const onChange = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const onSubmit = e => {
        e.preventDefault();
        const btn = document.querySelector('.submit-btn');
        btn.value = 'searching...';

        //Mock data while waiting for database
        const data = searchDB(form.email, form.phoneNumber);

        btn.value = 'Submit'
        console.log(data);
        if(data !== undefined) {
            sessionStorage.setItem('appointment-details', JSON.stringify(data));
            setMessages([]);
            setForm({ email: '', phoneNumber: '' });
            router.push('/client-track/details');
        } else {
            setMessages(['Appointment not found. Please verify email and phone number']);
        }
    }

    //Runs when input loses focus after being touched
    const handleBlur = e => {
        const { name, value } = e.target;
        formValidation(name, value);
    }

    const formValidation = async (name, value) => {
        await yup.reach(formSchema, name).validate(value)
            .then(() => setFormErrors({ ...formErrors, [name]: '' }))
            .catch(err => setFormErrors({ ...formErrors, [name]: err.message }))
    }

    return (
        <div className='client-track-container'>
            <div className='content'>
                <h1 className='client-track-header'>Track your appointment</h1>
                <div className='error-container'>
                    {messages.map(message => <span key={messages.indexOf(message)} className='error-message'>{message}</span>)}
                </div>
                <form onSubmit={onSubmit}>
                    <div className='form-section'>
                        <label htmlFor="email">Email</label>
                        <input
                            className='form-input'
                            name="email"
                            onBlur={handleBlur}
                            type="text"
                            placeholder='example@gmail.com'
                            value={form.email}
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-section'>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            className='form-input'
                            name="phoneNumber"
                            onBlur={handleBlur}
                            type="phone"
                            placeholder='7023275004'
                            value={form.phoneNumber}
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-section'>
                        <input
                            className={`form-input submit-btn ${isDisabled === true ? 'disabled' : 'hello'}`}
                            disabled={isDisabled}
                            type='submit'
                            value="Submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ClientTrack;