import "./App.css";
import FillAusbildungsnachweis from "./components/FillAusbildungsnachweis";
// import TWICE from "./assets/twice_one.jpg";
import BG from "./assets/bg.jpg";

function App() {
  return (
    <div className="App">
      <div
        className="flex justify-center items-center h-screen"
        style={{
          background: `url(${BG})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "scroll",
        }}
      >
        <FillAusbildungsnachweis />
      </div>
    </div>
  );
}

export default App;
