import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import apiCall from "../../Api/api";

const swalAlerts = () => {
  const {resendVerifyMail} = apiCall()
  const navigate = useNavigate();
  const successRegistration = () => {
    Swal.fire({
      title: "Confirm your email to complete the registration ",
      text: "To verify, Click on the link sent to your email",
      icon: "success",
      height: "200",
      width: "300",
      confirmButtonText: "Login",
      showCancelButton: false,
      allowOutsideClick: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirect to login page
        navigate("/login");
      }
    });
  };

  const verifyEmailSwal = (email) => {
    Swal.fire({
      title: "Please confirm your email to Login ",
      text: "To verify, Click on the link sent to your email, if not",
      icon: "success",
      height: "200",
      width: "300",
      confirmButtonText: "Resent verify mail",
      allowOutsideClick: true
    }).then((result) => {
      if (result.isConfirmed) {
        
        // Redirect to login page
        navigate("/login");
      }
    });
  }
  

  return { successRegistration, verifyEmailSwal };
};

export default swalAlerts;
