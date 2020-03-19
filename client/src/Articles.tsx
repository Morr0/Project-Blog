import React from "react";
import ArticleModel from "./Models/Article"

import Article from "./Components/Article"

interface Props {
    articles: ArticleModel[]
}

export default class Articles extends React.Component<Props> {
    render (){
        const views = this.props.articles.map((article) => 
            <Article article={article} />
        );

        return (
            <div className="articles">
                {views}
            </div>
        );
    }
}