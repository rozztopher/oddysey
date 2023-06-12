import React, { Component } from "react";

const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    section: 0,
    transitioning: false
  };

  setSection = (section) => {
    this.setState({ section: section });
  };

  setTransitioning = (bool) => {
    this.setState({ transitioning: bool })
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          section: this.state.section,
          transitioning: this.state.transitioning,
          setSection: this.setSection,
          setTransitioning: this.setTransitioning
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

const AppConsumer = AppContext.Consumer;

export { AppConsumer, AppContext };

export default AppProvider;
