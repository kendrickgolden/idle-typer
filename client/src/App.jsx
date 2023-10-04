import Points from "./components/CenterDisplay/Points";
import MainText from "./components/CenterDisplay/MainText";
import { createContext, useEffect, useState } from "react";
import PassiveContainer from "./components/Store/PurchaseStore/PurchaseStore";
import Upgrades from "components/Store/UpgradeStore/UpgradeStore";
import PassivePoints from "./components/CenterDisplay/PassivePoints";
export const UserContext = createContext();

function App() {
  const [text, setText] = useState(null);
  const [points, setPoints] = useState(0);
  const value = {
    text,
    setText,
  };

  const title = "Frankenstein; or, the Modern Prometheus";

  //import paragraphs of text
  useEffect(() => {
    fetch(`/api/text?title=${title}`)
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
   // setText(['test test test', 'hello hello', 'yes yes'])
  }

  const typingUpgrade = {
    name: "Typing Upgrade",
    desc: "+.1 pts per word typed",
    //keep pts=0 to avoid interfering with point per second calculation
    pts: 0,
    price: 1000,
    quant: 0,
    upgrades: 0,
    upgradePrice: 10000,
    needed: 10,
  };

  const speedUpgrade = {
    name: "Speed Upgrade",
    desc: "10% bonus to speed points",
    pts: 0,
    price: 1000,
    quant: 0,
    upgrades: 0,
    upgradePrice: 10000,
    needed: 10,
  }

  const passiveUpgrade1 = {
    name: "Passive Upgrade 1",
    pts: 1,
    price: 2500,
    quant: 0,
    upgrades: 0,
    upgradePrice: 25000,
    needed: 10,
  };
  const passiveUpgrade2 = {
    name: "Passive Upgrade 2",
    pts: 5,
    price: 5000,
    quant: 0,
    upgrades: 0,
    upgradePrice: 50000,
    needed: 10,
  };
  const passiveUpgrade3 = {
    name: "Passive Upgrade 3",
    pts: 10,
    price: 10000,
    quant: 0,
    upgrades: 0,
    upgradePrice: 100000,
    needed: 10,
  };
  const passiveUpgrade4 = {
    name: "Passive Upgrade 4",
    pts: 20,
    price: 20000,
    quant: 0,
    upgrades: 0,
    upgradePrice: 200000,
    needed: 10,
  };

  const [storeArray, setStoreArray] = useState([
    typingUpgrade,
    speedUpgrade,
    passiveUpgrade1,
    passiveUpgrade2,
    passiveUpgrade3,
    passiveUpgrade4,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(
        (prev) =>
          prev + storeArray.reduce((acc, cur) => acc + cur.quant * cur.pts, 0)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [points, storeArray]);

  return (
    <>
      <div id="header"> IDLE TYPER </div>

      <div id="body">
        <UserContext.Provider value={value}>
          <PassiveContainer
            storeArray={storeArray}
            setStoreArray={setStoreArray}
            points={points}
            setPoints={setPoints}
          />
          <Upgrades
            storeArray={storeArray}
            setStoreArray={setStoreArray}
            points={points}
            setPoints={setPoints}
          />
          <div id="center-display">
            <Points points={points} />
            <PassivePoints storeArray={storeArray} />
            {text ? (
              <MainText setPoints={setPoints} storeArray={storeArray} />
            ) : null}
          </div>
        </UserContext.Provider>
      </div>
    </>
  );
}

export default App;
