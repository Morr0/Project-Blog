import React from 'react';
import "./styles/styles.css"

// Components
import Articles from "./Components/Articles";
import Header from "./Components/Header";

import ArticleModel from "./Models/Article"
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';

function App() {
return (
    <div className="App">
      <Articles />
    </div>
);
}

export default App;
