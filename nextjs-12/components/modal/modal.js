import classes from './modal.module.css';

const Modal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className={classes.modal}>
            <div className={classes.modalContent}>
                <p>삭제하시겠습니까?</p>
                <button onClick={onConfirm}>확인</button>
                <button onClick={onCancel}>취소</button>
            </div>
        </div>
    );
};

export default Modal;