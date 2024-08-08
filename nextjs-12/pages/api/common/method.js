import getMethod from './get'
import postMethod from './post'
import deleteMethod from './delete'

const handler = async (req, res) => {
    if(req.method === 'GET'){
        const {functionName, item} = req.query;

        let data = undefined;

        if (item) {
            data = JSON.parse(item);
        }

        const getData = await getMethod[functionName](data);

        return res.send(getData);
    }   
    
    if(req.method === 'POST'){
        const {functionName,enteredMeetupData} = req.body;
        const postData = postMethod[functionName](enteredMeetupData);

        return res.send(postData);
    }

    if(req.method === 'DELETE'){
        const {functionName,meetupId} = req.query;
        const deleteData = deleteMethod[functionName](meetupId);

        return res.send(deleteData);
    }
}

export default handler