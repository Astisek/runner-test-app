import React from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../redux/store'
import { ChartBlock, ChartBlockDescription, ChartBlockDescriptionMin, ChartBlockDescriptionSum, ChartBlockTitle } from '../../style/styled'
import Loader from '../Loader'
import { generateRangeString } from '../WalkingTable/WalkingTableRow'
import ChartLine from './ChartLine'

const Chart: React.FC = () => {
  const sessions = useSelector((state: AppStateType) => state.runner.sessions)
  const isLoading = useSelector((state: AppStateType) => state.runner.isLoading)

  const sortedSessions = sessions.length ? [...sessions].sort((a, b) => a.distance - b.distance) : sessions
  const min = sortedSessions.length ? generateRangeString(sortedSessions[0].distance) : 0
  const max = sortedSessions.length ? generateRangeString(sortedSessions[sortedSessions.length - 1].distance) : 0

  let date = new Date()
  date.setDate(date.getDate() - 7)
  const filtredSessions = sessions.filter(el => new Date(el.date) > date)

  let sumRange = 0
  filtredSessions.forEach(el => sumRange += el.distance)
  const sumRangString = sumRange ? generateRangeString(sumRange) : "0 метров"


  return <ChartBlock>
    <ChartBlockTitle>Суммарная активность</ChartBlockTitle>

    {
      isLoading ? 
      <Loader /> : 
      <div className="chart">
        <ChartLine lastSevenDaySessions={filtredSessions} /> 
      </div>
    }

    <ChartBlockDescription>
      <ChartBlockDescriptionMin>Минимум: {min}</ChartBlockDescriptionMin>
      <p>Максимум: {max}</p>
      <ChartBlockDescriptionSum>Суммарно за 7 дней:<br/>{sumRangString}</ChartBlockDescriptionSum>
    </ChartBlockDescription>
  </ChartBlock>
}

export default Chart