import { Wrapper } from "./modal.styled";


interface ModalProps {
  children: React.ReactNode
}

const Modal = ( { children }: ModalProps ) =>{

  return (
    <Wrapper>
      { children }
    </Wrapper>
  );
}


export default Modal;