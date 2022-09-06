import MainText from "./components/MainText";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

function App() {
  const [text, setText] = useState(null);
  const value = { text };

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
        {text ? <MainText /> : null}
        {console.log(text)}
      </UserContext.Provider>
    </>
  );
}

export default App;
