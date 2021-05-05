import "../css/DetectFaces.css";

export const DetectFaces = () => {
  return (
    <div className="maindiv">
      <h1>Detect Faces</h1>
      <div className="mainContent">
        <input
          type="file"
          id="file-selector"
          accept="image/png, image/jpeg"
          onChange={(e) => captureFile(e)}
        />
        <input type="submit" onClick={(e) => onSubmit(e)}/>
      </div>
    </div>
  );
};

function captureFile(e) {
  console.log(e.target.files[0]);
  const file = e.target.files[0];
}

function onSubmit(e){
  console.log(e);
}

export default DetectFaces;