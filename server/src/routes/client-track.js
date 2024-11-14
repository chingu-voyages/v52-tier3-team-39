import express from 'express';

const mockData = [{
    id: 12,
    name: 'Rave Illusion',
    email: 'test@gmail.com',
    phone: '7028675309',
    address: '123 Glaring St',
    city: 'California City',
    state: 'CA',
    zipcode: '89146',
    appointmentTime: 'November 4, 2024'
}]

const dbFindFunction = (formEmail, formPhone) => {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < mockData.length; i++) {
            const { phone, email } = mockData[i];
            if (phone === formPhone && email === formEmail) {
                resolve(mockData[i]);
            }
        }
        reject(new Error('Appointment not found'));
    })

}

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const { email, phone } = req.query;
        console.log('from routes', email, phone)
        if (!email || !phone) {
            console.log('throwing invalid request error');
            throw new Error('Invalid request');
        };

        //Async
        const dbData = await dbFindFunction(email, phone);

        console.log('from dbData', dbData);
        res.status(200).json({message: 'Appointment found', data: dbData});
    } catch (err) {
        console.log(err);
        err.status = err.message === 'Invalid Request' ? 400 : 404;
        next(err);
    }
})

router.delete('/details/:id', async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    res.status(204).send();
})

router.use((err, req, res, next) => {
    if (err) {
        return res
            .status(err.status || 500)
            .json(
                { message: err.message || `An error has occured while making a ${req.method} to ${req.url}` }
            )
    }
})

export default router;