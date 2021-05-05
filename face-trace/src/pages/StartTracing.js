import React, { Component } from "react";


import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

import "../css/StartTracing.css";

import Database from "./Database"

import firebase from "../firebase"

var db = firebase.firestore();

var images = [];
db.collection("images").onSnapshot((querySnapshot) => {
  images.length = 0;
  querySnapshot.forEach((doc) => {
    images.push(doc.data());
  });
})

class StartTracing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "",
      name: "",
      target: ""
    };

    db.collection("images").get().then((querySnapshot) => {
      images.length = 0;
      querySnapshot.forEach((doc) => {
          images.push(doc.data());
      });
    });
  


      this.captureFile = this.captureFile.bind(this);
      this.addToDatabase = this.addToDatabase.bind(this);
      this.updateFields = this.updateFields.bind(this);
      this.getPathToImage = this.getPathToImage.bind(this);
    }
  

  captureFile(e) {
      const file = e.target.files[0];

      if(file) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.setState({ image: reader.result });
          console.log(this.state.image);
        };
      }
    console.log(this.state.image);
    }

  updateFields() {
      var nameField = document.getElementById("nameField").value;
      this.setState({ name: nameField });
      var tagField = document.getElementById("tagField").value;
      this.setState({ target: tagField });
    }


  addToDatabase() {
      var path = this.getPathToImage(this.state.name, this.state.target);

      db.collection("images").doc(path).set({
        image: this.state.image,
        name: this.state.name,
        target: this.state.target
      }).then(() => {
        console.log("Document successfully written!");

      }).catch((error) => {
        console.warn(error);
      });
      console.log(images);
    }

  getPathToImage(name1, target1) {
      var Name = name1.replace(/\s/g, '');
      var target = target1.replace(/\s/g, '');

      return Name + "____" + target;
    }

  render() {
      return(
      <>
    <div className="maindiv">
      <h1 className="temp">Start Tracing</h1>
      <div>
        <Database images={images} />
      </div>
      <div className="mainContent">
        <div className="inputfields">
          <div>
            <input
              type="file"
              id="imageField"
              accept="image/png, image/jpeg"
              onChange={this.captureFile}
            />
          </div>
          <br />
          <div>
            <label>Name: </label>
            <input
              id="nameField"
              type="text"
              placeholder="Type their name here"
              onChange={this.updateFields}
            />
          </div>
          <br />
          <div>
            <label>Enter a Tag:</label>
            <input
              id="tagField"
              type="text"
              placeholder="For eg resident or robber"
              onChange={this.updateFields}
            />
          </div>
          <br />
          <AwesomeButton onPress={(next) => {
            this.addToDatabase();
          }}
            type="secondary"
            style={myButtonStyle}>Submit</AwesomeButton>
        </div>
      </div>
    </div>
      </>
    );
  }
}



function onSubmit(e) {
  console.log(e);
}


const myButtonStyle = {
  width: "25vw",
  height: "5vh",
  fontSize: "100%",
};

export default StartTracing;
