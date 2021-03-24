import React from 'react'
import { ModalContentError, ModalContentInput } from '../../../style/styled'

type PropsType = {
  error: string | undefined,
  touched?: boolean,

  type: string,
  name: string,
  placeholder?: string
}

const ModalField: React.FC<PropsType> = ({error, touched, ...props}) => {
  return (
    <>
      <ModalContentInput errortype={(!!error && !!touched).toString()} {...props} />
      {
        !!error && touched &&
        <ModalContentError>{error}</ModalContentError>
      }
    </>
  )
}

export default ModalField