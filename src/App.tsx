import React, { useEffect } from "react"
import { useDispatch } from "react-redux";
import Chart from "./components/Chart/Chart";
import Header from "./components/Header"
import WalkingTable from "./components/WalkingTable/WalkingTable";
import { runnerThunks } from "./redux/runner-reducer";
import "./style/style.sass"
import { WalkingBlock } from "./style/styled";

const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(runnerThunks.getAll())
  }, [dispatch])

  return (
    <>
      <Header />

      <main>
        <div className="container">
          <WalkingBlock>
            <WalkingTable />
            <Chart />
          </WalkingBlock>
        </div>
      </main>
    </>
  );
};

export default App
