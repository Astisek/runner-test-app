import { Field, Form } from "formik"
import styled from "styled-components"
import arrow from '../img/vector.png'

export const colorBlack =  "#1C2025"
export const colorWhite =  "#E5E5E5"
export const colorActive =  "#EC174F"

export const HeaderStyle = styled.header`
  width: 100%;
  background: ${colorBlack};
`

export const HeaderTitle = styled.h1`
  color: #fff;
  margin-left: 20px;
  padding: 10px;
  font-size: 2rem;
  font-weight: bold;
`

export const WalkingBlock = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 2fr;
  margin-top: 60px;
  max-height: 580px;
  margin-bottom: 30px;
  @media (max-width: 725px) {
    grid-template-columns: 1fr
		max-height: 1180px
  }
`

export const WalkingTableBlock = styled.div`
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, .3);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 580px;
`

export const WalkingTableButton = styled.button`
  outline: none;
  background: ${colorActive};
  border: none;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
  transition: .3s;
  min-height: 60px;
  &:hover {
    background: ${colorBlack};
    color: ${colorWhite};
  }
`

export const WalkingTableHeader = styled.div`
  padding: 16px;
  background: ${colorBlack};
  display: grid;
  grid-template-columns: 1fr 1fr;
`

type WalkingTableHeaderItemType = {
  disable: string,
  reverse: string
}

export const WalkingTableHeaderItem = styled.div`
  font-size: 1.15rem;
  color: #fff;
  cursor: pointer;
  ${(props: WalkingTableHeaderItemType) => props.disable === 'true' ? "opacity: .5;" : ""}
  &:after {
    content: url(${arrow});
    margin-left: 4px;
    display: inline-block;
    padding: 0px 3px;
    background: ${colorActive};
    border-radius: 2px;
  }
  ${(props: WalkingTableHeaderItemType) => props.reverse === 'true' ? "&:after {transform: rotate(180deg);}" : ""}
`

export const WalkingTableContent = styled.div`
  overflow-y: scroll;		
  font-family: 'PT Sans', sans-serif;
  height: 100%;
  &::-webkit-scrollbar {
		width: 5px;
		background-color: ${colorBlack};
  }
	&::-webkit-scrollbar-thumb {
		background: ${colorActive};
  }
`

export const WalkingTableContentRow = styled.div`
  width: 100%;
  display: grid;
  position: relative;
  padding: 4px 16px;
  grid-template: 20px 20px / 1fr 1fr;
  grid-template-areas: "day range" "date range";
  &:nth-child(2n) {
    background: ${colorWhite};
  }
  &:nth-child(2n-1) {
    background: #fff;
  }
`

export const WalkingTableActionButton = styled.button`
  outline: none;
  width: 15px;
  background: transparent;
  border: none;
  cursor: pointer;
  & + & {
    margin-left: 6px;
  }
`

export const WalkingTableContentDay = styled.div`
  grid-area: day;
  align-self: end;
  font-size: 0.8rem;
  color: rgba(28, 32, 37, 0.4);
`
export const WalkingTableContentDate = styled.div`
  grid-area: date;
  font-size: 1.1rem;
  align-self: start;
`
export const WalkingTableContentRange = styled.div`
  grid-area: range;
  align-self: center;
  font-size: 1rem;
`

export const ChartBlock = styled.div`
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, .3);
  display: flex;
  flex-direction: column;
  background: #fff;
  justify-content: space-between;
  height: 580px;
`

export const ChartBlockTitle = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  margin-left: 20px;
  margin-top: 10px;
`

export const ChartBlockDescription = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  font-size: 1.5rem;
  color: #fff;
  font-weight: bold;
  align-items: center;
  background: ${colorBlack};
  min-height: 60px;
  padding: 0 20px;
  & > * {
    padding: 10px 0;
  }
`

export const ChartBlockDescriptionSum = styled.p`
  text-align: right;
`
export const ChartBlockDescriptionMin = styled.p`
  padding-right: 10px;
`

export const Modal = styled.div`
  width: 100vw;
  background: rgba(0, 0, 0, .3);
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

export const ModalContent = styled.div`
  position: fixed;
  width: 30%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
  @media (max-width: 725px) {
    width: 90%
  }
`

export const ModalContentTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 20px;
`

export const ModalContentForm = styled(Form)`
  background: #fff;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, .3);
  display: flex;
  flex-direction: column;
  padding: 20px;
`
export const ModalContentFormDiv = styled.div`
  background: #fff;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, .3);
  display: flex;
  flex-direction: column;
  padding: 20px;
`

export const ModalContentInput = styled(Field)`
  padding: 8px;
  outline: none;
  border: none;
  background: ${colorWhite};
  ${props => props.errortype === 'true' && `
    border: 2px solid #E95353;
  `}
  & + & {
    margin-top: 10px;
  }
`

export const ModalContentInputButton = styled.button`
  padding: 8px;
  outline: none;
  border: none;
  background: ${colorWhite};
  background: ${colorActive};
  font-weight: bold;
  color: ${colorWhite};
  cursor: pointer;
  margin-top: 10px;
`

export const ModalContentClose = styled.div`
  width: 15px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`

export const ModalContentError = styled.div`
  margin-bottom: 10px;
  color: #E95353;
  font-weight: bold;
  font-size: 1.1rem;
`

export const ModalContentYesNo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ModalContentYesNoButton = styled.button`
  padding: 12px 40px;
  outline: none;
  border: none;
  margin-top: 10px;
  background: ${colorActive};
  font-weight: bold;
  color: ${colorWhite};
  cursor: pointer;
`

export const LoaderBlock = styled.div`
  margin: 30px auto;
  width: 16px;

`

export const ErrorMessage = styled.p`
  margin: 30px auto;
  text-align: center;
`



