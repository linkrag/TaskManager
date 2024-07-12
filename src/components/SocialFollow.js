import React from "react";
import classes from "./SocialFollow.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faLinkedin,
    faInstagram
} from "@fortawesome/free-brands-svg-icons";

export default function SocialFollow() {
    return (
        <div className={classes.social_container}>
            <a href="https://www.facebook.com/" className={classes.icon}>
                <FontAwesomeIcon icon={faFacebook} size="1x" />
            </a>
            <a href="https://www.linkedin.com/" className={classes.icon}>
                <FontAwesomeIcon icon={faLinkedin} size="1x" />
            </a>
            <a href="https://www.youtube.com/" className={classes.icon}>
                <FontAwesomeIcon icon={faYoutube} size="1x" />
            </a>

            <a href="https://www.instagram.com/" className={classes.icon}>
                <FontAwesomeIcon icon={faInstagram} size="1x" />
            </a>
        </div>
    );
}
