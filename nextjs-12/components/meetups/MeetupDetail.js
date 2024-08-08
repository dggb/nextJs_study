import classes from './MeetupDetail.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import Modal from '../modal/modal';
import { useState } from 'react';

const MeetupDetail = (props) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const imageDelete = async () => {
        if (!props.id) {
            return;
        }

        await axios.delete('/api/common/method',{ 
            params: {
                functionName: 'deleteData' ,
                meetupId : props.id
            }
        }).then(response=>{
            if(response.status === 200){
                setTimeout(() => {
                    router.push('/');
                }, 500);
            }
        }).catch(error => {
            console.log(error);
        })  
        closeModal();
    }

    return (
        props.id && <section className={classes.detail}>
                <img 
                    src={props.image} 
                    alt={props.title}
                />
                <button className={classes.testBtn} onClick={openModal}> 삭제 </button>
                <h1>{props.title}</h1>
                <address>{props.address}</address>
                <p>{props.description}</p>

                <Modal isOpen={isModalOpen} onConfirm={imageDelete} onCancel={closeModal} />
            </section>
        
    )
}

export default MeetupDetail;