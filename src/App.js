import React from "react";
import PropTypes from "prop-types";
import NavBar from './components/NavBar'
import CategoriesList from './containers/CategoriesListContainer'
import CategoryTypeSideBar from './components/CategoryTypeSideBar'

const App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <div className="container-fluid row mx-0 px-0">
        <CategoryTypeSideBar />
        <CategoriesList />
      </div>
    </React.Fragment>
  );
};

App.propTypes = {
  history: PropTypes.object,
};

export default App;
