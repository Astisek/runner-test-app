import React from 'react'
import { ModalContentFormDiv, ModalContentTitle, ModalContentYesNo, ModalContentYesNoButton } from '../../../style/styled'
import withModal from '../withModal'

type PropsType = {
  action: Function,
  setModal: (bool: boolean) => void
}

const YesNo: React.FC<PropsType> = ({action, setModal}) => {
  const handleYes = () => {
    action()
    setModal(false)
  }

  return (
    <>
      <ModalContentFormDiv>
        <ModalContentTitle>Удалить значение</ModalContentTitle>

        <ModalContentYesNo>
          <ModalContentYesNoButton onClick={handleYes}>Да</ModalContentYesNoButton>
          <ModalContentYesNoButton onClick={() => setModal(false)}>Нет</ModalContentYesNoButton>
        </ModalContentYesNo>
      </ModalContentFormDiv>
    </>
  )
}

export default withModal(YesNo)
