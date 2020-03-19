import React from 'react';
import Articles from "./Components/Articles";
import "./styles/styles.css"

import ArticleModel from "./Models/Article"

let article: ArticleModel = {
  content: "This content is content",
  title: "qlihgnkqwr"
}

let article2: ArticleModel = {
  content: "TITITITITIITLE",
  title: "qlihgnkqwr"
}

async function awaiter(){
    let res = await fetch("http://localhost:3400", {});
}

function App() {
awaiter();

return (
    <div className="App">
      <Articles articles={[article, article2]} />
    </div>
);
}

export default App;
