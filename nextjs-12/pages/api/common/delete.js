import { connectToMongoDB } from '../../../db/connect';
import { ObjectId } from 'mongodb';

const deleteData = async (id) => {
    try {
        const client = await connectToMongoDB();
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.deleteOne({ _id:new ObjectId( id ) });

        if (result.deletedCount === 1) {
            return result;
        } else {
            return { message: 'Data not found' };
        }
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};

export default {
    deleteData
}