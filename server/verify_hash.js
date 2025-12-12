import bcrypt from 'bcryptjs';

const hash = '$2a$10$JBnnH4qxqaDxPjvQj4N1oufIPMJiV70M0gspZf1mUFC.3Y.51TgO2';
const password = '33642518';

const match = bcrypt.compareSync(password, hash);
console.log('Password match:', match);
