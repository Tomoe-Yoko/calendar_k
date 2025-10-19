import Modal from 'react-modal';
import {  } from "./EventModal.css";

Modal.setAppElement('#root');
interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const EventModal = ({isOpen,onClose,title,children}:Props) => {
 
  return (
    <div>
      <Modal 
      isOpen={isOpen}
      onRequestClose={onClose}
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
  <h2>{title}</h2>
  {children}
  
          <button type='button'>×</button>
      </Modal>
    </div>
  );
};

export default EventModal;
