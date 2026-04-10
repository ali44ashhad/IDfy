import mongoose from 'mongoose'

const userScheme = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    tellegramId: {
        type: String,
      },
      pronoun:{
        type:String,
      },
      firstName: {
        type:String,
        required: true
      },
      middleName: {
        type:String,
       },
      lastName: {
        type: String,
        required: true,
      },
      addressOne: {
        type: String,
        required: true,
      },
      addressTwo: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      paymentRef: {
        type: String,
        required: true,
      },
      dateOfBirth:  {
        type: Date,
        required: true,
      },
      license: {
        type: String,
        required: true,
      },
      photo: {
        type: String,
        required: true,
      },
      signature: {
        type: String,
        required: false,
      },
      gender: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'verified', 'rejected'],
      },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userScheme);

export default User;