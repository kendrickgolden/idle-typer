import LevelButton from "./LevelButton";

export default function LevelMenu(props) {

  const level1 = { name: "Keyboard Upgrade", price: 1000};
  const level2 = { name: "Keyboard Upgrade", price: 1000};
  const level3 = { name: "Keyboard Upgrade", price: 1000,};
  const level4 = { name: "Keyboard Upgrade", price: 1000,};
  const level5 = { name: "Keyboard Upgrade", price: 1000};

  const levelArray = [level1, level2, level3, level4, level5];

  return (
    <ul className="menu-scene">
      {levelArray.map((level, index) => (
        <LevelButton key={index} index={index} info={level} />
      ))}
    </ul>
  );
}
