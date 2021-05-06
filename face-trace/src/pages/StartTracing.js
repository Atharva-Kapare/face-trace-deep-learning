import React, { Component, useState, useEffect } from "react";


import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

import "../css/StartTracing.css";

import Database from "./Database"

import firebase from "../firebase"

var db = firebase.firestore();




const StartTracing = () => {

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [imageSrc, setImageSrc] = useState("");


  useEffect(() => {
    // Run! Like go get some data from an API.
    db.collection("images").get().then((querySnapshot) => {
      images.length = 0;
      querySnapshot.forEach((doc) => {
        setImages(oldArray => [...oldArray, doc.data()]);
      });
    });
  }, []);


  // function updateFieldName(e) {
  //   var nameField = e.target.value;
  //   setName(nameField);

  //   console.log(name);

  //   //this.setState({ target: tagField });
  // }  
  // function updateFieldTarget(e) {
  //   var tagField = e.target.value;
  //   setName(tagField);

  //   console.log(tagField);
  // }

  function getPathToImage() {
    var name1 = document.getElementById("nameField").value;
    var target1 = document.getElementById("tagField").value;


    var Name = name1.replace(/\s/g, '');
    var target = target1.replace(/\s/g, '');

    setName(name1);
    setTarget(target1);

    return Name + "____" + target;
  }

  function addToDatabase() {
    var path = getPathToImage();
    var myObj = {
      image: imageSrc,
      name: document.getElementById("nameField").value,
      target: document.getElementById("tagField").value
    }

    db.collection("images").doc(path).set(
      myObj
    ).then(() => {
      console.log("Document successfully written!");
      setImages(oldArray => [...oldArray, myObj]);
    }).catch((error) => {
      console.warn(error);
    });
  }

  function captureFile(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
    }
  }



  return (
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
                onChange={(e) => captureFile(e)}
              />
            </div>
            <br />
            <div>
              <label>Name: </label>
              <input
                id="nameField"
                type="text"
                placeholder="Type their name here"
              />
            </div>
            <br />
            <div>
              <label>Enter a Tag:</label>
              <input
                id="tagField"
                type="text"
                placeholder="For eg resident or robber"
              />
            </div>
            <br />
            <AwesomeButton onPress={() => {
              addToDatabase();
            }}
              type="secondary"
              style={myButtonStyle}>Submit</AwesomeButton>
          </div>
        </div>
      </div>
    </>
  );
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