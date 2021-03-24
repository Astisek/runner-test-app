import React from 'react'
import load from '../img/loading.gif'
import { LoaderBlock } from '../style/styled'

const Loader: React.FC = () => {

  return <LoaderBlock>
    <img src={load} alt="Loading" />
  </LoaderBlock>
}

export default Loader