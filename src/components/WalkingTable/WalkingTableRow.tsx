import React, { useState } from "react";
import { CSSTransition } from 'react-transition-group'
import pen from '../../img/pen.png'
import close from '../../img/close.png'
import ModalForm from "../Modal/ModalForm/ModalForm";
import YesNo from "../Modal/YesNo/YesNo";
import { useDispatch } from "react-redux";
import { runnerThunks } from "../../redux/runner-reducer";
import { WalkingTableActionButton, WalkingTableContentDate, WalkingTableContentDay, WalkingTableContentRange, WalkingTableContentRow } from "../../style/styled";

type PropsType = {
  dateString: string
  range: number
  id: number
}

export const generateRangeString = (range: number) => {
  let meter = range % 1000
  let km = ( range - meter ) / 1000
  const string = `${km ? `${km} ${wordConverter(km, "километр")} ` : ""}${meter ? `${meter} ${wordConverter(meter, "метр")}` : ""}`

  return string
}
export const wordConverter = (num: number, str: string) => {
  const forSwitch = num % 100 < 20 ? num : num % 10
  
  switch (forSwitch) {
    case 1:
      return `${str}`  
    case 2: 
    case 3: 
    case 4: 
      return `${str}а`
    default:
      return `${str}ов`
  }
}

const WalkingTableRow: React.FC<PropsType> = ({dateString, range, id}) => {
  const dispatch = useDispatch()

  const [isHover, setIsHover] = useState<boolean>(false)
  const [openedEdit, setOpenedEdit] = useState<boolean>(false)
  const [openedDelete, setOpenedDelete] = useState<boolean>(false)

  const handleDelete = () => {
    dispatch(runnerThunks.delete(id))
  }

  const date = new Date(dateString)
  
  let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
  const day = days[date.getDay()]
  const dateText = date.toLocaleDateString()
  
  const rangeString = generateRangeString(range)

  return (
    <>
    <WalkingTableContentRow onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <WalkingTableContentDay>{day}</WalkingTableContentDay>
      <WalkingTableContentDate>{dateText}</WalkingTableContentDate>
      <WalkingTableContentRange>
        {rangeString}
      </WalkingTableContentRange>
        <CSSTransition in={isHover} classNames="walking-table-content__action" timeout={300} unmountOnExit>
          <div className="walking-table-content__action" onClick={() => setIsHover(false)}>
            <WalkingTableActionButton onClick={() => setOpenedEdit(true)}>
              <img src={pen} alt="pen" />
            </WalkingTableActionButton>
            <WalkingTableActionButton onClick={() => setOpenedDelete(true)}>
              <img src={close} alt="delete" />
            </WalkingTableActionButton>
          </div>
        </CSSTransition>

    </WalkingTableContentRow>
    {openedEdit && <ModalForm edit={true} setModal={setOpenedEdit} date={dateString} distance={range} id={id} />}
    {openedDelete && <YesNo action={handleDelete} setModal={setOpenedDelete} />}
    </>
  );
};

export default WalkingTableRow