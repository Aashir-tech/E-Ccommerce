import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const About = () => {
  const visitLinkedin = () => {
    window.location = "https://www.linkedin.com/in/aashir-haris/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dcjmafca2/image/upload/v1726585200/WhatsApp_Image_2024-09-17_at_8.29.19_PM_yapz1i.jpg"
              alt="Student"
            />
            <Typography>Aashir Haris</Typography>
            <Button onClick={visitLinkedin} color="primary">
              Visit LinkedIn
            </Button>
            <span>
              This is a sample wesbite made by @aashir_haris with help of 6 Pack Programmer.            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Subscribe to his channel</Typography>
            <a
              href="https://www.youtube.com/channel/UCO7afj9AUo0zV69pqEYhcjw"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.linkedin.com/in/aashir-haris/" target="blank">
              <LinkedInIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;