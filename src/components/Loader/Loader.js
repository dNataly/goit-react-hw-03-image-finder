import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import s from "./Loader.module.css";

export default class App extends React.Component {
  render() {
    return <Loader type="Oval" color="#00BFFF" height={50} width={50} className={s.loader} />;
  }
}
