import React, { Component } from "react";
import "./App.css";
import Loader from "./components/Loader/Loader.js";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Searchbar from "./components/Searchbar/Searchbar";
import { gotService, images_per_page } from "./services/gotService.js";

const Status = {
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
  LOADING: "loading",
};

class App extends Component {
  state = {
    query: "",
    page: 1,
    images: [],
    error: null,
    status: null,
  };

  componentDidUpdate(snapshot) {
    const { query, page, images } = this.state;
    if (this.state.status === Status.LOADING) {
      this.setState({ status: Status.PENDING });

      gotService(query, page)
        .then((results) => {
          const resultsCount = results.hits.length;
          if (resultsCount === 0) {
            this.setState({
              error: new Error(`No search results for ${query}`),
              status: Status.REJECTED,
            });
            return;
          }

          const isMoreAvailable = this.checkAvailability(resultsCount);

          this.setState({
            images: [...images, ...results.hits],
            isMoreAvailable,
            status: Status.RESOLVED,
          });
        })
        .then(() => {
          if (page !== 1) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          }
        })
        .catch((error) => {
          this.setState({ error: true, status: Status.REJECTED });
        });
    }
  }

  handleSearchSubmit = (query) => {
    this.setState({ images: [], query, page: 1, status: Status.LOADING });
  };

  handleLoadMore = () => {
    this.setState(() => ({
      page: this.state.page + 1,
      status: Status.LOADING,
    }));
  };

  checkAvailability = (itemsLength) => {
    return !(itemsLength < images_per_page);
  };

  render() {
    const { images, isMoreAvailable, error, status } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {status === Status.REJECTED && <div className="error"> {error.message}</div>}
        <ImageGallery items={images} />
        {status === Status.PENDING && <Loader />}
        {status === Status.RESOLVED && isMoreAvailable && <Button onClick={this.handleLoadMore}>Load more</Button>}
      </div>
    );
  }
}

export default App;
