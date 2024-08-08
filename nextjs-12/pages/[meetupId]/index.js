import MeetupDetail from "../../components/meetups/MeetupDetail";
import axios from 'axios';

const MeetupDetails = (props) => {
    return (
        props.meetupData && <MeetupDetail 
            id={props.meetupData.id}
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    )
}

// next.js 동적 라우팅 기능
export const getStaticPaths = async () => {
    console.log('2');

    const params = {
        functionName: 'getList',
        item : JSON.stringify({
            needData : JSON.stringify({ _id: 1 }),
        })
    }
    
    return await axios.get('http://localhost:3030/api/common/method', {params : params})
    .then((response) => {
        console.log(response.data);
        // fallback : true, false, blocking
        // true : 데이터가 없을 경우 빈 페이지 반환 - 데이터가 없을 경우 페이지 처리 필요
        // false : 404 페이지 반환 
        // blocking : 완성 된 페이지 반환
        return {
            fallback: 'blocking',
            paths: response.data.map((meetup) => ({
                params: {
                    meetupId: meetup._id.toString(),
                },
            })),
        }
    })
    .catch((error) => {
        console.log('error : ' , error);
        return {
            fallback: false,
            paths: [],
        }
    });
}

export async function getStaticProps(context) {
    console.log('1');
    const meetupId = context.params.meetupId.toString(); 

    const undefinedID = {
        meetupData: {
            id: null,
            title: null,
            address: null,
            image: null,
            description: null
        }
    }
        
    if (!meetupId) {
        return {
            props: undefinedID
        };
    }

    const params = {
        functionName: 'getFind',
        item : JSON.stringify({
            meetupId : meetupId,
        })
    }

    return await axios.get('http://localhost:3030/api/common/method', {params : params})
    .then((response) => {
        console.log(response.data);
        return {
            props: {
                meetupData: {
                    id: response.data._id.toString(),
                    title: response.data.title,
                    address: response.data.address,
                    image: response.data.image,
                    description: response.data.description
                }
            },
        }
    })
    .catch((error) => {
        console.log('error : ' , error);
        return {
            props: undefinedID
        }
    });
}
export default MeetupDetails;