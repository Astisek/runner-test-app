import { Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { runnerThunks } from '../../../redux/runner-reducer'
import ModalField from './ModalField'
import withModal from '../withModal'
import { ModalContentForm, ModalContentInputButton, ModalContentTitle } from '../../../style/styled'

type PropsType = {
  edit?: boolean,
  setModal: (bool: boolean) => void,
  date?: string,
  distance?: number,
  id?: number
}

const ModalForm: React.FC<PropsType> = ({edit = false, date, distance = "", setModal, id = 0}) => {
  const dispatch = useDispatch()

  const handleSubmitCreate = (values: typeof initialValues) => {
    dispatch(runnerThunks.create(new Date(values.date), +values.distance))
    setModal(false)
  }
  const handleSubmitEdit = (values: typeof initialValues) => {
    dispatch(runnerThunks.edit(id, new Date(values.date), +values.distance))
    // setModal(false)
  }
  const validationSchema = yup.object().shape({
    distance: yup.string().required("Поле обязательно для входа"),
    date: yup.date().required("Поле обязательно для входа").transform((value) => new Date(value)).max(new Date(), "Неверный формат даты")
  })

  const propsDate = date ? new Date(date) : null

  propsDate?.setMonth(propsDate?.getMonth() + 1)

  const initialValues = {
    date: propsDate ? `${propsDate.getFullYear()}-${propsDate.getMonth() < 10 ? "0"+propsDate.getMonth(): propsDate.getMonth()}-${propsDate.getDate() < 10 ? "0"+propsDate.getDate(): propsDate.getDate()}` : "",
    distance: distance
  }
  return (
    <>
        <Formik
          initialValues={initialValues}
          onSubmit={edit ? handleSubmitEdit : handleSubmitCreate}
          validationSchema={validationSchema}
        >
          {({errors, touched}) => <ModalContentForm>
            <ModalContentTitle>{edit ? "Изменить значение" : "Добавить значение"}</ModalContentTitle>
            <ModalField 
              error={errors.date}
              name={"date"}
              touched={touched.date}
              type={"date"}
            />

            <ModalField 
              error={errors.distance}
              name={"distance"}
              touched={touched.distance}
              type={"number"}
              placeholder="Введите дистанцию"
            />

            <ModalContentInputButton type="submit">{edit ? "Изменить" : "Добавить"}</ModalContentInputButton>

          </ModalContentForm>}
        </Formik>
    </>
  )
}

export default withModal(ModalForm)