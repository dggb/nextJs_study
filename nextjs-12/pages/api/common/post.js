import { connectToMongoDB } from '../../../db/connect';

const insert = async (data) => {
    try {
        const client = await connectToMongoDB();
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);
   
        return result
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};

export default {
    insert
}