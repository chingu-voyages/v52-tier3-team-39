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

 export const searchDB = (email, phone) => {
    for(let i = 0; i < mockData.length; i++) {
        let email = mockData[i].email
        let phone = mockData[i].phone

        if(email === email && phone === phone) {
            console.log('user found');
            return mockData[i];
        }
    }


    mockData.map(e => {
        if(
            e.email.toLowerCase() === email.toLowerCase().trim() &&
            phone === phone.toString().trim()
        ) {
            return e
        }
    })
}