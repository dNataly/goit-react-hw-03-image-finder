import React, { Component } from "react";
import s from "./Searchbar.module.css";
import { BsSearch } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";

export default class Searchbar extends Component {
  state = {
    query: "",
  };

  handleSearchFormSubmit = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const query = this.state.query.trim();

    if (query) {
      this.props.onSubmit(query);
    }
    this.setState({ query: "" });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>
              <BsSearch />
            </span>
          </button>

          <input className={s.SearchFormInput} type="text" autoComplete="off" autoFocus placeholder="Search images and photos" onChange={this.handleSearchFormSubmit} />
        </form>
      </header>
    );
  }
}
