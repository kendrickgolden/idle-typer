import Points from "./components/CenterDisplay/Points";
import MainText from "./components/CenterDisplay/MainText";
import { createContext, useEffect, useState, useRef } from "react";
import UpgradeContainer from "./components/Store/PassiveGenerators/UpgradeContainer";
import PassivePoints from "./components/CenterDisplay/PassivePoints";
export const UserContext = createContext();

function App() {
  const [text, setText] = useState(null);
  const [points, setPoints] = useState(0);
  const [upgrades, setUpgrades] = useState([0, -1, -1, -1, -1]);
  const [levels, setLevels] = useState([0, -1, -1, -1, -1]);
  const [progress, setProgress] = useState(0);
  const PPS = useRef(0);
  const value = {
    text,
    setText,
    points,
    setPoints,
    upgrades,
    setUpgrades,
    levels,
    setLevels,
  };

  useEffect(() => {
    setInterval(() => {
      setPoints((prev) => prev + PPS.current);
    }, 1000);
  }, [PPS]);

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

    //Fisher-Yates shuffle algorithm for randomization
    for (let i = paragraphArray.length - 1; i > 0; i--) {
      let randInt = Math.floor(Math.random() * (i + 1));
      let tempPar = paragraphArray[randInt];
      paragraphArray[randInt] = paragraphArray[i];
      paragraphArray[i] = tempPar;
    }
    setText(paragraphArray);
  }

  return (
    <>
      <UserContext.Provider value={value}>
        <PassivePoints pps={PPS} />
        <UpgradeContainer pps={PPS} />
        <Points pps={PPS} />
        {text ? <MainText /> : null}
      </UserContext.Provider>
    </>
  );
}

export default App;
