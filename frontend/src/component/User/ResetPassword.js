import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Loader from "../layout/Loader/loader";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LockIcon from "@mui/icons-material/Lock";
import { removeError, resetPassword } from "../../redux/slice/user";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

const ResetPassword = () => {
    const params = useParams()
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, success, isLoading, errorMessage } = useSelector(
    (state) => state.forgotPassword
  );

  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(eyeOff);

  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(eyeOff);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("password", password);
    myForm.append("confirmPassword", confirmPassword);

    dispatch(resetPassword({token : params.token, passwords : myForm}));
  };

  const handleTogglePassword = () => {
    if (passwordType === "password") {
      setPasswordIcon(eye);
      setPasswordType("text");
    } else {
      setPasswordIcon(eyeOff);
      setPasswordType("password");
    }
  };

  const handleToggleConfirmPassword = () => {
    if (confirmPasswordType === "password") {
      setConfirmPasswordIcon(eye);
      setConfirmPasswordType("text");
    } else {
      setConfirmPasswordIcon(eyeOff);
      setConfirmPasswordType("password");
    }
  };

  useEffect(() => {
    if (isError) {
      alert.error(errorMessage);
      dispatch(removeError());
    }

    if (success) {
      alert.success("PASSWORD UPDATED SUCCESSFULLY");

      navigate("/login");
    }
  }, [dispatch, errorMessage, isError, alert, navigate, success]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="RESET PASSWORD" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">RESET PASSWORD</h2>
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
            
                <div>
                  <LockOpenIcon />
                  <input
                    type={passwordType}
                    placeholder="New Password"
                    required
                    autoComplete="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="ToggleVisibility"
                    onClick={handleTogglePassword}
                  >
                    <Icon icon={passwordIcon} size={20} />
                  </div>
                </div>
                <div>
                  <LockIcon />
                  <input
                    type={confirmPasswordType}
                    placeholder="Confirm Password"
                    required
                    autoComplete="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div
                    className="ToggleVisibility"
                    onClick={handleToggleConfirmPassword}
                  >
                    <Icon icon={confirmPasswordIcon} size={20} />
                  </div>
                </div>

                <input
                  type="submit"
                  value="UPDATE"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
