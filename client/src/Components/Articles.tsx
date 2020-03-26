import React from "react";
import ArticleModel from "../Models/Article"

import Article from "./Article"

interface Props {
}

interface State {
    articles: ArticleModel[]
}

let articles: ArticleModel[] = [];

export default class Articles extends React.Component<Props, State> {

    componentDidMount(){
        fetch("http://localhost:3400/posts/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((element: any) => {
                console.log(element);
                let article: ArticleModel = {
                    content: element.content,
                    title: element.title
                }
                console.log(article);
                articles.push(article);
            });
            this.forceUpdate();
        });
    }

    render (){
        const views = articles.map((article: ArticleModel) => 
            <Article article={article} />
        );

        return (
            <div className="articles">
                {views}
            </div>
        );
    }
}