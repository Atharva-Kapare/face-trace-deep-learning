import LandingPage from "./pages/LandingPage";
import DetectFaces from "./pages/DetectFaces";
import StartTracing from "./pages/StartTracing";
import "./css/App.css";

import { BrowserRouter as Router, Route} from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <div className="App">
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/detect_faces" component={DetectFaces}></Route>
          <Route exact path="/start_tracing" component={StartTracing}></Route>
        </div>
      </Router>
    </>
  );
};

export default App;
