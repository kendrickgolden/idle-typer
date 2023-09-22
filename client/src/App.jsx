import Points from "./components/CenterDisplay/Points";
import MainText from "./components/CenterDisplay/MainText";
import { createContext, useEffect, useState } from "react";
import PassiveContainer from "./components/Store/PassiveGenerators/PassiveContainer";
import Upgrades from "components/Store/Upgrades/Upgrades";
import PassivePoints from "./components/CenterDisplay/PassivePoints";
export const UserContext = createContext();

function App() {
  const [text, setText] = useState(null);
  const [points, setPoints] = useState(99999999);
  const value = {
    text,
    setText,
  };

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

  const PassiveUpgrade1 = {
    name: "Passive Upgrade 1",
    pts: 1,
    price: 2500,
    quant: 0,
    boosts: 0,
    boostPrice: 25000,
    needed: 10,
  };
  const PassiveUpgrade2 = {
    name: "Passive Upgrade 2",
    pts: 5,
    price: 5000,
    quant: 0,
    boosts: 0,
    boostPrice: 50000,
    needed: 10,
  };
  const PassiveUpgrade3 = {
    name: "Passive Upgrade 3",
    pts: 10,
    price: 10000,
    quant: 0,
    boosts: 0,
    boostPrice: 100000,
    needed: 10,
  };
  const PassiveUpgrade4 = {
    name: "Passive Upgrade 4",
    pts: 20,
    price: 20000,
    quant: 0,
    boosts: 0,
    boostPrice: 200000,
    needed: 10,
  };

  const [passiveArray, setPassiveArray] = useState([
    PassiveUpgrade1,
    PassiveUpgrade2,
    PassiveUpgrade3,
    PassiveUpgrade4,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(
        (prev) =>
          prev + passiveArray.reduce((acc, cur) => acc + cur.quant * cur.pts, 0)
      );
      console.log(points);
    }, 1000);

    return () => clearInterval(interval);
  }, [points, passiveArray]);

  return (
    <>
      <UserContext.Provider value={value}>
        <PassivePoints passiveArray={passiveArray} />
        <PassiveContainer
          passiveArray={passiveArray}
          setPassiveArray={setPassiveArray}
          points={points}
          setPoints={setPoints}
        />
        <Upgrades
          passiveArray={passiveArray}
          setPassiveArray={setPassiveArray}
          points={points}
          setPoints={setPoints}
        />
        <Points points={points} />
        {text ? <MainText setPoints={setPoints}/> : null}
      </UserContext.Provider>
    </>
  );
}

export default App;
