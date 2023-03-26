import React from 'react'
import {Routes,Route} from 'react-router-dom'
import HomePage from '../Components/HomePage/HomePageComponent'
import EmailConfirmationPage from '../Pages/User/EmailConfirmationPage'
import LandingPage from '../Pages/User/LandingPage'
import LoginPage from '../Pages/User/LoginPage'
import OtpLoginPage from '../Pages/User/OtpLoginPage'
import RegisterPage from '../Pages/User/RegisterPage'
import ResetPasswordPage from '../Pages/User/ResetPasswordPage'
import TestPage from '../Pages/User/TestPage'


function UserRouter() {
  return (
    <div>
        <Routes>
          //User Routes

          <Route exact path='/login' element={<LoginPage/>}/>
          <Route exact path='/register' element={<RegisterPage/>}/>
          <Route exact path='/' element={<LandingPage/>}/>
          <Route exact path='/test' element={<TestPage/>}/>
          <Route exact path='/verifyMail/:id/:token' element={<EmailConfirmationPage/>}/>
          <Route exact path='/otp' element={<OtpLoginPage/>}/>
          <Route exact path='/home' element={<HomePage/>}/>
          <Route exact path='/resetpassword' element={<ResetPasswordPage/>}/>
          
        </Routes>
    </div>
  )
}

export default UserRouter