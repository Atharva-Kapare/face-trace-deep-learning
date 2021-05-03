import background from "../img/bkground.png";
import "../css/LandingPage.css";

import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const Landingpage = () => {
  return (
    <div
      className="App-header"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <h1>Welcome to FaceTrace</h1>

      <AwesomeButton onPress={(next) => {myFunc();}} type="primary" style={myButtonStyle} >
        Start Tracing
      </AwesomeButton>
      <AwesomeButton onPress={(next) => {myFunc();}} type="secondary" style={myButtonStyle} >
        Detect Faces
      </AwesomeButton>
    </div>
  );
};

function myFunc() {
  console.log("Hello");
}


const myButtonStyle = {
  width: "25vw",
  height: "5vh",
  fontSize: "100%",
};

export default Landingpage;
