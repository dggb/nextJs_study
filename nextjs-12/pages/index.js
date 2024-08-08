import MeetupList from '../components/meetups/MeetupList';
import Head from 'next/head';
import axios from 'axios';

const HomePage = (props) => {
    // const test = async () => {
    //     await axios.get('/api/common/method',{ params: {
    //         functionName: 'getList' 
    //     }}).then(response=>{
    //         console.log(response);
    //     }).catch(error => {
    //         console.log(error);
    //     })  
    // }

    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="home-page"/>
            </Head>
            <MeetupList meetups={props.meetups}/>
        </>
    )
}

// export async function getStaticProps() {
//     return await axios.get('http://localhost:3000/api/common/method',{ params: {
//         functionName: 'getList'
//     }})
//     .then((response) => {
//         console.log(response.data);
//         return {
//             props: {
//                 meetups : response.data.map(meetup=>({
//                     title: meetup.title,
//                     address: meetup.address,
//                     image: meetup.image,
//                     id: meetup._id.toString()
//                 }))
//             },
//             revalidate: 1
//         };
//     })
//     .catch((error) => {
//         console.log('error : ' , error);
//         return {
//             props: {
//                 meetups: null,
//             },
//             revalidate: 1
//         };
//     });
// }

// 데이터 업데이트가 많을 경우 getServerSideProps을 사용
// 매번 request 마다 실행 
export async function getServerSideProps() {
    try {
        // 서버쪽이기 때문에 절대경로를 써줘야 함 (클라이언트 X)
        // 상대경로를 쓸 경우 경로를 찾을 수 없어서 api 호출 시 에러가 남
        const response = await axios.get('http://localhost:3030/api/common/method', {
            params: {
                functionName: 'getList',
            },
        });

        const meetups = response.data.map(meetup => ({
            title: meetup.title,
            address: meetup.address,
            image: meetup.image,
            id: meetup._id.toString(),
        }));
    
        return {
            props: {
                meetups,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
    
        return {
            props: {
                meetups: null,
            },
        };
    }
}

export default HomePage;