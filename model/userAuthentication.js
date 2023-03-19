import {Schema, models, model} from 'mongoose';

const userAuthenticationSchema = new Schema({
    name: String,
    email: String,
    password: String
})

const UsersAn = models.useran || model('useran', userAuthenticationSchema); 
export default UsersAn; 