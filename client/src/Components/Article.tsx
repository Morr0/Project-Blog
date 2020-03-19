import React from "react";
import ArticleModel from "../Models/Article";

interface Props {
    article: ArticleModel;
}

export default class Article extends React.Component<Props> {

    render(){
        return (
            <div className="article">
                <h1 className="art_header">{this.props.article.title}</h1>
                <p className="art_content">{this.props.article.content}</p>
            </div>
        );
    }
}