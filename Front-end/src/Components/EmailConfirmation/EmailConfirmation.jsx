import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import apiCall from "../../Api/api";

function EmailConfirmation() {
  const navigate = useNavigate();
  const { verifyMail, resendVerifyMail } = apiCall();
  const { id, token } = useParams();
  const [verified, setVerified] = useState(false);
  const [alreadyVerifiedUser, setAlreadyVerifiedUser] = useState(false);
  const [linkExpired, setLinkExpired] = useState(false);
  const [resendMail, setResendMail] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);
  useEffect(() => {
    const helo = async () => {
      try {
        const response = await verifyMail({ id, token });
        if (response) {
          setVerified(true);
        }
      } catch (error) {
        if (error.msg.msg == "Invalid Link") {
          setLinkExpired(false);
          setInvalidLink(true);
        }else if(error.msg.msg == "Link expired"){
          setLinkExpired(true);
        }else if(error.msg.msg == "User already verified"){
          setAlreadyVerifiedUser(!alreadyVerifiedUser)
        }
      }
    };
    helo();
  }, [verified]);

  const handleNewVerifyLinkRequest = async () => {
    try {
      if (resendMail == false) {
        setResendMail(!resendMail);
      }
      const reponse = await resendVerifyMail({ userId: id });
    } catch (error) {
      //handleErrorhere
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-300 to-blue-400 flex justify-center items-center flex-col">
      <div
        className="flex items-center justify-center min-h-screen p-5 min-w-screen"
        style={{ display: linkExpired || resendMail || invalidLink ? "none" : "block" }}
      >
        <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
          {setAlreadyVerifiedUser ? <h3 className="text-2xl">The user is already veified</h3> :<h3 className="text-2xl">Thanks for verifying your email</h3>}
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
              />
            </svg>
          </div>

          {alreadyVerifiedUser ? <p className="text-xl font-semibold">
            Please click below to proceed to login
          </p> :<p className="text-xl font-semibold">
            We're happy you're here. Let's get you logged in. <br />
            Click here to login{" "}
          </p>}
          <button
            onClick={() => navigate("/login")}
            type="button"
            className="text-white mt-9 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Proceed to Login
          </button>
        </div>
      </div>

      <div
        className="flex items-center justify-center min-h-screen p-5 min-w-screen"
        style={{
          display: invalidLink || linkExpired ? "block" : "none",
        }}
      >
        <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
          {invalidLink ? (
            <h3 className="text-2xl">Sorry, This link is invalid</h3>
          ) : (
            <h3 className="text-2xl">Sorry, The link has expired</h3>
          )}
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
              />
            </svg>
          </div>

          <p className="text-xl font-semibold">
            Oops looks like somethings changed. <br />
            Please register again for a new link
          </p>
          {<button
            onClick={()=>navigate('/register')}
            type="button"
            className="text-white mt-9 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Register
          </button>}
        </div>
      </div>

      <div
        className="flex items-center justify-center min-h-screen p-5 min-w-screen"
        style={{ display: resendMail ? "block" : "none" }}
      >
        <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
          <h3 className="text-2xl">A new mail has been sent to your email</h3>
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
              />
            </svg>
          </div>

          <p className="text-xl font-semibold">
            If you didn't receive a mail
            <br />
            Click here to resend link{" "}
          </p>
          <button
            onClick={handleNewVerifyLinkRequest}
            type="button"
            className="text-white mt-9 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Request for a new link
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailConfirmation;
