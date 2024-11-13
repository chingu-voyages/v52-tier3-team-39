const mockData = [
    {
        name: 'Justin Abellera',
        email: 'justin.c.abellera@gmail.com',
        phone: '7023275094',
        address: '123 test dr',
        city: 'Las Vegas',
        State: 'NV',
        zipCode: '89146'
    }
]

 export const searchDB = (formEmail, formPhone) => {
    for(let i = 0; i < mockData.length; i++) {
        let dbEmail = mockData[i].email
        let dbPhone = mockData[i].phone

        if(dbEmail === formEmail.toLowerCase() && dbPhone === formPhone.toString()) {
            console.log('user found');
            return mockData[i];
        }
    }
}