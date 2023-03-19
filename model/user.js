import {Schema, models, model} from 'mongoose';

const userSchema = new Schema({
    title: String,
    description: String,
    dueDate: String
})

const Users = models.user || model('user', userSchema); 
export default Users; 