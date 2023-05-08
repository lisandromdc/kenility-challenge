import mongoose from 'mongoose';

export const connectDatabase = async () => {
  return await mongoose
  .connect(process.env.MONGODB_URI || "", {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false
  })
}

export const handleDatabase = () => {  
  connectDatabase()
  .then(() => {
    console.log('Mongodb connected....');
  })
  .catch(err => console.log(err.message));

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db...');
  });

  mongoose.connection.on('error', err => {
    console.log(err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
  });

  return mongoose.connection;
};
