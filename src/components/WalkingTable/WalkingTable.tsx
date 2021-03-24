import React, { useState } from "react"
import { useSelector } from "react-redux"
import { AppStateType } from "../../redux/store"
import { ErrorMessage, WalkingTableBlock, WalkingTableButton, WalkingTableContent, WalkingTableHeader, WalkingTableHeaderItem } from "../../style/styled"
import Loader from "../Loader"
import ModalForm from "../Modal/ModalForm/ModalForm"
import WalkingTableRow from "./WalkingTableRow"

const WalkingTable: React.FC = () => {
  const sessions = useSelector((state: AppStateType) => state.runner.sessions)
  const isLoading = useSelector((state: AppStateType) => state.runner.isLoading)
  const error = useSelector((state: AppStateType) => state.runner.error)

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [filter, setFilter] = useState<number>(1)

  const toggleDate = () => {
    if (filter === 1) setFilter(2)
    else setFilter(1)
  }
  const toggleRange = () => {
    if (filter === 3) setFilter(4)
    else setFilter(3)
  }

  let filtredSessions
  switch (filter) {
    case 1:
      filtredSessions = [...sessions].sort((a, b) => +new Date(b.date) - +new Date(a.date))
      break;
    case 2:
      filtredSessions = [...sessions].sort((a, b) => +new Date(a.date) - +new Date(b.date))
      break;
    case 3:
      filtredSessions = [...sessions].sort((a, b) => b.distance - a.distance)
      break;
    default:
      filtredSessions = [...sessions].sort((a, b) => a.distance - b.distance)
      break;
  }


  const walkingTableRows = filtredSessions.map(el => <WalkingTableRow 
    dateString={el.date}
    id={el.id}
    range={el.distance}
    key={el.id}
  />)
  return (
    <>
      <WalkingTableBlock>
        <WalkingTableHeader>
          <WalkingTableHeaderItem disable={filter === 1 || filter === 2 ? "false" : "true"} reverse={filter === 2 ? "true" : "false"} onClick={toggleDate}>Дата</WalkingTableHeaderItem>
          <WalkingTableHeaderItem disable={filter === 3 || filter === 4 ? "false" : "true"} reverse={filter === 4 ? "true" : "false"} onClick={toggleRange}>Дистанция</WalkingTableHeaderItem>
          {/* <div onClick={toggleDate} className={`walking-table__header-item ${filter === 1 ? "" : filter === 2 ? "walking-table__header-item--reverse" : "walking-table__header-item--disable"}`}>Дата</div>
          <div onClick={toggleRange} className={`walking-table__header-item ${filter === 3 ? "" : filter === 4 ? "walking-table__header-item--reverse" : "walking-table__header-item--disable"}`}>Дистанция</div> */}
        </WalkingTableHeader>

        <WalkingTableContent>

          {!!error && <ErrorMessage>{error}</ErrorMessage>}

          {
            isLoading ?
            <Loader /> : 
            walkingTableRows
          }


        </WalkingTableContent>
        <WalkingTableButton onClick={() => setOpenModal(true)} disabled={isLoading}>Добавить запись</WalkingTableButton>
        {openModal && <ModalForm setModal={setOpenModal} />}
      </WalkingTableBlock>
    </>
  )
}

export default WalkingTable
