import { MongoClient } from 'mongodb';

let client = null; // MongoDB 클라이언트 객체를 저장할 전역 변수

export async function connectToMongoDB() {
    if (client) {
        return client; // 이미 클라이언트가 연결된 경우 재사용
    }

    try {
        client = await MongoClient.connect('mongodb+srv://pkh:rudgh123@cluster0.uziwxb6.mongodb.net/meetups?retryWrites=true&w=majority');
        return client;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
}

export async function closeMongoDBConnection() {
    if (client) {
        await client.close();
        client = null;
    }
}