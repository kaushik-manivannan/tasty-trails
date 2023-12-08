import mongoose from "mongoose";
// Create a Schema object from mongoose.
const Schema = mongoose.Schema;
const CommunitySchema = new Schema(
  {
    communityName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    communityAdmin: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    members: [],
    postIds: [],
  },
  {
    versionKey: false,
  }
);

// Create a Mongoose Model for the 'community' collection
const CommunityModel = mongoose.model("Community", CommunitySchema);

// Export the community Model Schema for external use
export default CommunityModel;
