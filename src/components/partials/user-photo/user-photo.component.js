import React, { Component } from "react";

import LoadingPanel from "./../../partials/loading-panel/loading-panel.component";

import StitchService from "./../../../services/stitch.service";

import { bufferToBase64 } from "./../../../helpers/get-data";

import "./user-photo.css";

const stitchService = StitchService.getInstance();

class UserPhoto extends Component {
  state = { userPhoto: "", loading: false };

  componentDidMount() {
    const { imageId } = this.props;

    if (!imageId) return;
    this.setState({ loading: true });
    stitchService.getPhoto(imageId).then((pic) => {
      if (pic) {
        if (pic.pictureURL) {
          this.setState({ loading: false, userPhoto: pic.pictureURL });
        } else {
          if (pic && (pic.picture || pic.photo || pic.thumbNail)) {
            pic = pic.thumbNail
              ? pic.thumbNail
              : pic.picture
              ? pic.picture
              : pic.photo;
            this.setState({
              loading: false,
              userPhoto: "data:image/jpeg;base64," + bufferToBase64(pic.buffer),
            });
          } else {
            this.setState({ loading: false });
          }
        }
      } else {
        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { userPhoto, loading } = this.state;

    return (
      <div className="user-photo">
        {loading ? (
          <LoadingPanel />
        ) : (
          <img
            className="icon profile-pic"
            src={userPhoto || require("../../../assets/user-header-icon.png")}
            alt="no user"
          />
        )}
      </div>
    );
  }
}

export default UserPhoto;
