import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema({
name: {
  type: String,
  required:[true, 'subscription name is required'],
  trim:true,
  minLength:2,
  maxLength:100,
},
price: {
  type: Number,
  required:[true, 'subscription is required'],
  min:[0, 'price must be greater than 0'],

},
currency: {
  type:String,
  enum:['USD', 'EUR', 'GDP'],
  default:'USD'
},
frequency: {
  type: String,
  emun:['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'] ,
  required:true,
},
payingMethod: {
type: String,
required:true,
trim:true,
},
status: {
  type:String,
  emun:['active', 'cancelled', 'expired'],
  default:'active'
},
startDate: {
  type: Date,
  require:true,
  validate: {
    validator: (value) => value <= new Date(),
    message: 'start date must be in the past'
  }
},
renewalDate: {
  type: Date,
  require:true,
  validate: {
    validator: function (value) { 
     return value > this.startDate;

    },
    message: 'Renewal date must be after the start date'
  }
},
user: {
  // accepting ID which is going to be a reffrence to the user model that we had created in user.model.js line 9
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true,
  // which will optimise the queries (a query is a request for information from a database, typically written in SQL) by indexing the user fields
  index: true,
  
}
}, {timestamps: true});
// creating a function that will happen before each of the documents happening

// Auto-calculate renewal date if missing

subscriptionSchema.pre('save', function (next) {
if(!this.renewalDate) {
  const renewalPeriods = {
    daily: 1,
    weekly:7,
    monthly:30,
    yearly:365,
  };
  //  adding number of days based of the frequency that we pass
  this.renewalDate = new Date (this.startDate);
  this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
}
// Auto-update the status if renewal date has passed
if (this.renewalDate < new Date()) {
  this.status = 'expired';
}

// making it proceed with the creating of that document in that database

next();

})
export default subscriptionSchema;

