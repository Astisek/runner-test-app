import React from 'react'
import close from '../../img/close.png'
import { Modal, ModalContent, ModalContentClose } from '../../style/styled'

type PropsType = {
  setModal: (bool: boolean) => void
}

function withModal<T>(Component: React.FC<T & PropsType>): React.FC<T & PropsType> {
  return (props) => {
    return (
      <>
        <Modal>
			    <ModalContent>
            <Component {...props} />
            <ModalContentClose onClick={() => props.setModal(false)}>
					    <img src={close} alt="delete" />
				    </ModalContentClose>
          </ModalContent>
        </Modal>
      </>
    )
  }
} 

export default withModal