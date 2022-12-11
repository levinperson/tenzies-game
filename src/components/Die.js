import React from "react";

export default function Die(props) {
  return (
    <div
      className={props.isHeld === true ? "die-held" : "die"}
      onClick={props.holdDice}
    >
      <div className="die-num">
        <img
          src={require(`../images/dice-${props.value}.png`)}
          alt="dice"
          className="dice-images"
        />
      </div>
    </div>
  );
}
