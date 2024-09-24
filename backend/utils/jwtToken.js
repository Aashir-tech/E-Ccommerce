// Creating Token and Saving in Cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,  // accessible only by web server
    secure: process.env.NODE_ENV === "production",  // cookie is sent only over HTTPS
    sameSite : process.env.NODE_ENV === "production" ? "None" : "Lax",  // required for cross-site cookies
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
