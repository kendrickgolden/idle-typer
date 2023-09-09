import Points from "./components/Points";
import MainText from "./components/MainText";
import { createContext, useEffect, useState, useRef } from "react";
import UpgradeContainer from "./components/Upgrades/UpgradeContainer";
//import LevelMenu from "./components/Levels/LevelMenu";
import UpgradeButton from "./components/Upgrades/ActiveUpgrades/UpgradeButton";
import LevelContainer from "./components/Levels/LevelContainer";
import PassivePoints
 from "./components/PassivePoints";
export const UserContext = createContext();

function App() {
  const [text, setText] = useState(null);
  const [points, setPoints] = useState(0);
  const [upgrades, setUpgrades] = useState([0, -1, -1, -1, -1]);
  const [levels, setLevels] = useState([0,-1,-1,-1,-1])
  const [progress, setProgress] = useState(0);
  const PPS = useRef(0);
  const value = { text, setText, points, setPoints, upgrades, setUpgrades, levels, setLevels};


  useEffect(() => {
    setInterval(() => {
      setPoints((prev) => prev + PPS.current);
    }, 1000);
    
  },[PPS]);
  

  const title = "Frankenstein; or, the Modern Prometheus";

  //import paragraphs of text
  useEffect(() => {
    fetch(`http://localhost:5000/api/text?title=${title}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => randomizeParagraphs(data));
  }, []);

  function randomizeParagraphs(text) {
    let paragraphArray = [];
    text.chapters.forEach(function (chapter) { 
      paragraphArray = paragraphArray.concat(chapter.paragraphs);
      
    });
    setText(paragraphArray);
  }

  return (
    <>
    {console.log(text)}
      <UserContext.Provider value={value}>
        <PassivePoints pps={PPS} />
        <UpgradeContainer pps={PPS} />
        <LevelContainer />
         <Points pps={PPS}/>
        {text ? <MainText /> : null}
      </UserContext.Provider>
    </>
  );
}

export default App;
