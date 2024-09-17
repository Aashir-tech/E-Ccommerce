import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/loader";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import { useNavigate } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import {
  loadUser,
  removeError,
  reset,
  updateProfile,
} from "../../redux/slice/userSlice";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";

const UpdateProfile = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { isError, isUpdated, isLoading, errorMessage } = useSelector(
    (state) => state.profile
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  // console.log("AVATAR", avatar);
  // console.log("AVATAR PREVIEW", avatarPreview);

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("avatar", avatar);
    // console.log("AVATAR", avatar);

    // for (let [key, value] of myForm.entries()) {
    //   console.log(key, value);
    // }
    // console.log("FORM DATA " , myForm)
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        // console.log("Inside updateProfile Data CHange", reader.result);
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (isError) {
      // console.log(isError)
      alert.error(errorMessage);
      dispatch(removeError());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/account");
      dispatch(reset());
    }
  }, [dispatch, errorMessage, alert, isError, navigate, user, isUpdated]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="UPDATE PROFILE" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">UPDATE PROFILE</h2>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
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

                <div id="updateProfileImage">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="avatar preview"
                      // style={{
                      //   width: "50px",
                      //   height: "50px",
                      //   borderRadius: "50%",
                      // }}
                    />
                  ) : (
                    <div className="altImage">
                      <AccountCircleIcon />
                    </div>
                  )}
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="UPDATE"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default UpdateProfile;
