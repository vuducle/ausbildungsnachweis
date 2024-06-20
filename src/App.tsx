import "./App.css";
import FillAusbildungsnachweis from "./components/FillAusbildungsnachweis";
import TWICE from "./assets/twice_one.jpg";

function App() {
  return (
    <div className="App">
      <div
        className="flex justify-center items-center h-screen"
        style={{
          background: `url(${TWICE})`,
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
