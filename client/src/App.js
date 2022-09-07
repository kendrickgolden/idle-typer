import Points from "./components/Points";
import MainText from "./components/MainText";
import { createContext, useEffect, useState } from "react";
import Upgrades from "./components/Upgrades/UpgradeMenu";

export const UserContext = createContext();

function App() {
  const [text, setText] = useState(null);
  const [points, setPoints] = useState(0);
  const value = { text, setText, points, setPoints };


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
      <UserContext.Provider value={value}>
        <Upgrades />
        <Points/>
        {text ? <MainText /> : null}
        {console.log(text)}
      </UserContext.Provider>
    </>
  );
}

export default App;
