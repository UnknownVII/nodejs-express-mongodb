import { Schema, model } from 'mongoose';

const ObjectSchema = new Schema({
    first_name: {
        type: String,
        required:true,
        min: 3,
        max: 255
    },
    last_name: {
        type: String,
        required:true,
        min: 3,
        max: 255
    }
});

export default model('objects', ObjectSchema);