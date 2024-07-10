import Modal from 'react-modal';

Modal.setAppElement('#root'); 

export default function ImageModal({ isOpen, onRequestClose, image }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Image Modal"
            overlayClassName="overlay"
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
            <button onClick={onRequestClose} >Close</button>
            <img src={image.urls.regular} alt={image.alt_description}  />
        </Modal>
    );
}
