import { connectDatabase } from './utils/database.utils';
// utils
import { hashPass } from './utils/auth.utils';
// models
import User from './models/user.model';

const users = [
  {
    firstName: 'Lisandro',
    lastName: 'Dalla Costa',
    address: 'San Martín 567, San Carlos Sud, Santa Fe, Argentina',
    profilePictureUrl: { url: 'https://example.com/profile1.png' },
    username: 'LichaDC',
    password: 'my-super-secret-password',
  },
  {
    firstName: 'Virginia',
    lastName: 'Aban',
    address: 'Roque Saez Peña 216, Rawson, Chubut',
    profilePictureUrl: { url: 'https://example.com/profile2.png' },
    username: 'Vhyrz',
    password: 'virgiSuperSayan',
  },
  {
    firstName: 'Silvia',
    lastName: 'Hofer',
    address: 'Avenida Siempre Viva 742',
    profilePictureUrl: { url: 'https://example.com/profile3.png' },
    username: 'Silvita',
    password: 'no_me_acuerdo',
  },
];

const hashAllUsers = async () => {
  const promises = users.map(async (user) => {
    user.password = await hashPass(user.password);
    return user;
  });
  return await Promise.all(promises);
}

const seedDatabase = async () => {
  console.log('Start seeding database');
  try {
    const hashedUsers = await hashAllUsers();
    const db = await connectDatabase();
    await db.connection.db.dropDatabase();
    await User.insertMany(hashedUsers);
    db.connection.close();
    console.log('Database seed finished');
  } catch (err) {
    console.error('Error connecting to database', err);
  }
}

seedDatabase();
