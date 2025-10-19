import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const EventModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <Modal 
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
        overlayClassName={{
          base: "overlay-base",
          afterOpen: "overlay-after",
          beforeClose: "overlay-before"
        }}
        className={{
          base: "content-base",
          afterOpen: "content-after",
          beforeClose: "content-before"
        }}
>
  
          <button type='button'>×</button>
      </Modal>
    </div>
  );
};

export default EventModal;
