import bcrypt from 'bcrypt';

const users = [
    {
        name : 'John Doe',
        email: 'john@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: false
    },
    {
        name : 'Jane Doe',
        email: 'jane@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: false
    },
    {
        name : 'admin',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    }
]

export default users;