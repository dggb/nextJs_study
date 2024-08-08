import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';

const NewMeetupPage = () => {
    const router = useRouter();
    
    const addMeetupHandler = async (enteredMeetupData) => {
        await axios.post('/api/common/method', {functionName: 'insert', enteredMeetupData}).then(response=>{
            if(response.status === 200){
                setTimeout(() => {
                    router.push('/');
                }, 500);
            }
        }).catch(error => {
            console.log(error);
        })
    }
    
    return (
        (
            <>
                <Head>
                    <title>new-meetup</title>
                    <meta name="new-meetup"/>
                </Head>
                <NewMeetupForm onAddMeetup={addMeetupHandler}/>
            </>
        )
    )
}

export default NewMeetupPage;