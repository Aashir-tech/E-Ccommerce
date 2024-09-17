import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Loader from "../layout/Loader/loader";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {
  removeError,
  updatePassword,
  reset,
} from "../../redux/slice/userSlice";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

const UpdatePassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, isUpdated, isLoading, errorMessage } = useSelector(
    (state) => state.profile
  );

  const [oldPasswordType, setOldPasswordType] = useState("password");
  const [oldPasswordIcon, setOldPasswordIcon] = useState(eyeOff);

  const [newPasswordType, setNewPasswordType] = useState("password");
  const [newPasswordIcon, setNewPasswordIcon] = useState(eyeOff);

  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(eyeOff);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("oldPassword", oldPassword);
    myForm.append("newPassword", newPassword);
    myForm.append("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  const handleToggleOldPassword = () => {
    if (oldPasswordType === "password") {
      setOldPasswordIcon(eye);
      setOldPasswordType("text");
    } else {
      setOldPasswordIcon(eyeOff);
      setOldPasswordType("password");
    }
  };

  const handleToggleNewPassword = () => {
    if (newPasswordType === "password") {
      setNewPasswordIcon(eye);
      setNewPasswordType("text");
    } else {
      setNewPasswordIcon(eyeOff);
      setNewPasswordType("password");
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

    if (isUpdated) {
      alert.success("CHANGED PASSWORD SUCCESSFULLY");

      navigate("/account");
      dispatch(reset());
    }
  }, [dispatch, errorMessage, isError, alert, navigate, isUpdated]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="CHANGE" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">CHANGE PASSWORD</h2>
              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="oldPassword">
                  <VpnKeyIcon />
                  <input
                    type={oldPasswordType}
                    placeholder="Old Password"
                    required
                    autoComplete="old-password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <div
                    className="ToggleVisibility"
                    onClick={handleToggleOldPassword}
                  >
                    <Icon icon={oldPasswordIcon} size={20} />
                  </div>
                </div>
                <div className="newPassword">
                  <LockOpenIcon />
                  <input
                    type={newPasswordType}
                    placeholder="New Password"
                    required
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <div
                    className="ToggleVisibility"
                    onClick={handleToggleNewPassword}
                  >
                    <Icon icon={newPasswordIcon} size={20} />
                  </div>
                </div>
                <div className="confirmPassword">
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
                  value="CHANGE"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;
