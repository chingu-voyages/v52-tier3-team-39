import express from 'express';

const mockData = [{
    name: 'Rave Illusion',
    email: 'sun.in.my.eyes@gmail.com',
    phone: '7028675309',
    address: '123 Glaring St',
    city: 'California City',
    state: 'CA',
    zipcode: '89146'
}]

const dbFindFunction = (formEmail, formPhone) => {
    for(let i = 0; i < mockData.length; i++) {
        const { phone, email } = mockData[i];
        if(phone === formPhone && email === formEmail) {
            return mockData[i];
        }
    }
}

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const { email, phone } = req.query;
        if(!email || !phone) throw new Error('Invalid request');

        //Async
        const data = dbFindFunction(email, phone);

        if(data === undefined) throw new Error('Appointment not found');
        res.json({ status: 200, message: data });
    } catch(err) {
        err.status = err.message === 'Invalid Request' ? 400 : 404;
        next(err);
    }
})

router.use((err, req, res, next) => {
    if(err) {
        return res
            .status(err.status || 500)
            .json(
                { message: err.message || `An error has occured while making a ${req.method} to ${req.url}` }
            )
    }
})

export default router;