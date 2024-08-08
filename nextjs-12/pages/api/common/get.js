import { connectToMongoDB } from '../../../db/connect';
import { ObjectId } from "mongodb";

const getList = async (data) => {
    try {
        const client = await connectToMongoDB();
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const meetups = await meetupsCollection.find({}, data?.needData).toArray();

        return meetups
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};

const getFind = async (data) => {
    try {
        const client = await connectToMongoDB();
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(data?.meetupId) });
        
        return selectedMeetup
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};

export default {
    getList,
    getFind
}