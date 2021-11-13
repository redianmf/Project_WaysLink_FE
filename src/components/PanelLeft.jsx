import React, { useContext } from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import { useHistory } from "react-router";

import Logo from "../assets/image/DumblinkLogo.png";
import TemplateIconBlack from "../assets/icons/templateIconBlack.png";
import TemplateIconYellow from "../assets/icons/templateIconYellow.png";
import ProfileIconBlack from "../assets/icons/profileIconBlack.png";
import ProfileIconYellow from "../assets/icons/profileIconYellow.png";
import MyLinkIconBlack from "../assets/icons/mylinkIconBlack.png";
import MyLinkIconYellow from "../assets/icons/mylinkIconYellow.png";
import LogoutIcon from "../assets/icons/logoutIcon.png";

function PanelLeft() {
  const [state, dispatch] = useContext(UserContext);
  let history = useHistory();
  let url = window.location.href;
  let path = "http://localhost:3000/";

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <Col className="left-panel" sm={3}>
      <div className="text-center pt-3 ">
        <Image
          className="cursor-link"
          onClick={() => history.push("/template")}
          src={Logo}
        />
      </div>
      <div className="container-title-panel mt-5">
        {url === path + "template" ? (
          <div onClick={() => history.push("/template")} className="pt-4">
            <Image className="cursor-link" src={TemplateIconYellow} />
            <span className="panel-title-yellow cursor-link">Template</span>
          </div>
        ) : (
          <div onClick={() => history.push("/template")} className="pt-4">
            <Image className="cursor-link" src={TemplateIconBlack} />
            <span className="panel-title-black cursor-link">Template</span>
          </div>
        )}

        {url === path + "profile" ? (
          <div onClick={() => history.push("/profile")} className="pt-4">
            <Image className="cursor-link" src={ProfileIconYellow} />
            <span className="panel-title-yellow cursor-link">Profile</span>
          </div>
        ) : (
          <div onClick={() => history.push("/profile")} className="pt-4">
            <Image className="cursor-link" src={ProfileIconBlack} />
            <span className="panel-title-black cursor-link">Profile</span>
          </div>
        )}

        {url === path + "my-links" ? (
          <div onClick={() => history.push("/my-links")} className="pt-4">
            <Image className="cursor-link" src={MyLinkIconYellow} />
            <span className="panel-title-yellow cursor-link">My Link</span>
          </div>
        ) : (
          <div onClick={() => history.push("/my-links")} className="pt-4">
            <Image className="cursor-link" src={MyLinkIconBlack} />
            <span className="panel-title-black cursor-link">My Link</span>
          </div>
        )}

        {/* <div onClick={() => history.push("/profile")} className="pt-3 mt-4">
          <Image className="cursor-link" src={ProfileIconBlack} />
          <span className="panel-title-black cursor-link">Profile</span>
        </div>
        <div onClick={() => history.push("/my-links")} className="pt-3 mt-4">
          <Image className="cursor-link" src={MyLinkIconBlack} />
          <span className="panel-title-black cursor-link">My Link</span>
        </div> */}
        <div onClick={handleLogout} className="logout-icon pt-3">
          <Image className="cursor-link" src={LogoutIcon} />
          <span className="panel-title-black cursor-link">Logout</span>
        </div>
      </div>
    </Col>
  );
}

export default PanelLeft;
