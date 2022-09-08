import Points from "./components/Points";
import MainText from "./components/MainText";
import { createContext, useEffect, useState, useRef } from "react";
import UpgradeMenu from "./components/Upgrades/UpgradeMenu";
import UpgradeButton from "./components/Upgrades/ActiveUpgrades/UpgradeButton";

export const UserContext = createContext();

function App() {
  const [text, setText] = useState(null);
  const [points, setPoints] = useState(0);
  const [upgrades, setUpgrades] = useState([0, 0, 0, 0, 0]);
  const PPS = useRef(0);
  const value = { text, setText, points, setPoints, upgrades, setUpgrades};


  useEffect(() => {
    setInterval(() => {
      setPoints((prev) => prev + PPS.current);
      console.log(PPS.current);
      console.log(upgrades);
    }, 1000);
    
  },[PPS]);
  

  const title = "Frankenstein; or, the Modern Prometheus";
  useEffect(() => {
    fetch(`http://localhost:5000/api/text?title=${title}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => setText(data));
  }, []);

  return (
    <>
    {console.log("test")}
      <UserContext.Provider value={value}>
        <UpgradeMenu pps={PPS} />
        <Points pps={PPS}/>
        {text ? <MainText /> : null}
      {console.log(PPS.current)}
      </UserContext.Provider>
    </>
  );
}

export default App;
