import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { authReducer } from '../../Redux/Slices/authSlice';
import { userReducer } from '../../Redux/Slices/userSlice';

function T() {
    const navigate = useNavigate()
   let a = useSelector(userReducer)
   let token = useSelector(authReducer)
    console.log(a);
    console.log(token);
   
  return (
    <div>
      {
        Object.keys(a).map((items,index) => {
          return(
            <p key={index}>{a[items]}</p>
          )
        })
      }
      <p>{token.accessToken}</p>
    </div>

    
  )
}

export default T