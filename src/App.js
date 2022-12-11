import "./App.css";
import React from "react";
import Die from "./components/Die";
import useWindowSize from "./components/useWindowSize";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld === true);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function allNewDice() {
    const array = [];
    for (let i = 0; i < 10; i++) {
      array.push({
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false,
        id: i + 1,
      });
    }
    return array;
  }

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld === false
          ? { ...die, value: Math.floor(Math.random() * 6 + 1) }
          : die;
      })
    );
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function startOver() {
    setDice(allNewDice());
    setTenzies(false);
  }

  const { width, height } = useWindowSize();

  function renderConfetti() {
    if (tenzies) {
      return <Confetti width={width} height={height} numberOfPieces="300" />;
    }
  }

  const diceElement = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    );
  });

  return (
    <div className="App">
      <main className="container">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="container-inner">{diceElement}</div>
        <button className="roll-btn" onClick={tenzies ? startOver : rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
        {renderConfetti()}
      </main>
    </div>
  );
}

export default App;
