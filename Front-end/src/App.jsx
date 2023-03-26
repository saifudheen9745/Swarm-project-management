import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import UserRouter from './Router/UserRouter'


function App() {

  return (
    <div className="">
      <BrowserRouter>
        <UserRouter/>
      </BrowserRouter>
    </div>
  )
}

export default App
