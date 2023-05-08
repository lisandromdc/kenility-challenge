import { model, Schema, Document } from 'mongoose';
// utils
import { hashPass } from '@/utils/auth.utils';

interface User extends Document {
  firstName: string;
  lastName: string;
  address: string;
  profilePictureUrl: Object;
  username: string;
  password: string;
}

const userSchema = new Schema<User>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  profilePictureUrl: {
    type: Object,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  this.password = await hashPass(this.password);
  next();
});

const User = model<User>('User', userSchema);

export default User;
