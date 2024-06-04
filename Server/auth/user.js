const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = [];

const addUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    return { username };
};

const authenticateUser = async (username, password) => {
    const user = users.find(u => u.username === username);
    if (!user) throw new Error('Usuario no encontrado');
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Contraseña incorrecta');
    const token = jwt.sign({ username }, 'secreto', { expiresIn: '1h' });
    return { token };
};

module.exports = { addUser, authenticateUser };
