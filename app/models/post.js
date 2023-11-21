import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        required: true
    },
    availabilityStatus: {
        type: String,
        required: true
    }
},
{
    versionKey: false
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;