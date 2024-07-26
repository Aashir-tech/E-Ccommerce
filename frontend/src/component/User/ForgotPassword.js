import React, { useEffect, useState } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/loader";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeError, forgotPassword } from "../../redux/slice/user";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";

const ForgotPassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { isError, message, isLoading, errorMessage } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("email", email);

    dispatch(forgotPassword(myForm));
  };
  useEffect(() => {
    if (isError) {
      alert.error(errorMessage);
      dispatch(removeError());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, isError , errorMessage, alert, message]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="FORGOT PASSWORD" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">FORGOT PASSWORD</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="SEND"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
