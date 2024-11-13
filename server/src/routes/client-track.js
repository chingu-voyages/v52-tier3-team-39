import express from 'express';

const mockData = {
    'name': 'Rave Illusion',
    'email': 'sun.in.my.eyes@gmail.com',
    'phone': '7028675309',
    'address': '123 Glaring St',
    'city': 'California City',
    'state': 'CA',
    'zipcode': '89146'
}

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const { email, phone } = req.query;
        if(!email || !phone) throw new Error('Invalid request');
        console.log(email, phone);
        res.json({ message: 'Es Goo' });
    } catch(err) {
        console.log(err.message)
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