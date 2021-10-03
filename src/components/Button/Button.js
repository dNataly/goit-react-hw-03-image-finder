import React from "react";
import s from "./Button.module.css";

export default function Button(props) {
  return (
    <button type="button" onClick={props.onClick} className={s.Button}>
      {props.children}
    </button>
  );
}
