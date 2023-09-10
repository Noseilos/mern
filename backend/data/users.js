import bcrypt from "bcryptjs";

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('admin', 10),
        isAdmin: true,
    },
    {
        name: 'Robert Ritchie',
        email: 'robertritchie@email.com',
        password: bcrypt.hashSync('robert', 10),
        isAdmin: false,
    },
    {
        name: 'Linus Torvalds',
        email: 'linustorvalds@email.com',
        password: bcrypt.hashSync('linus', 10),
        isAdmin: false,
    },
];

export default users;