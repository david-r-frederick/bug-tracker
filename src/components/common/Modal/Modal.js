import React from 'react';
import ReactModal from 'react-modal';
import classes from './Modal.module.css';

ReactModal.setAppElement('#root');

export const Modal = (props) => {
    return (
        <ReactModal
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    zIndex: '9999'
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    transform: 'translate(-50%, -50%)',
                },
            }}
            isOpen={props.showModal}
            onRequestClose={props.closeModal}
        >
            <h4>{props.title}</h4>
            <div className={classes.btnContainer}>
                <button className="btn btn-danger" onClick={props.deleteFunction}>
                    Delete
                </button>
                <button style={{ marginLeft: '10px' }} className="btn btn-secondary" onClick={props.closeModal}>
                    Cancel
                </button>
            </div>
        </ReactModal>
    );
};
