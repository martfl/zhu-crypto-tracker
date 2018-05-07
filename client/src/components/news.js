import React from 'react';
import { Helmet } from 'react-helmet';
import Card from './card';

class NewsFeed extends React.Component {
  constructor() {
    super();
    this.state = {
      newsList: [],
    };
  }

  componentDidMount() {
    fetch('https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=b8bcd04ff7c7401b89bbb664aef5cc7c')
      .then(result => result.json())
      .then(data => {
        const newsList = data.articles.map(news => {
          console.log(news);
          return <Card card={news} key={news.id} />;
        });
        this.setState({ newsList });
      });
  }

  render() {
    return (
      <div className="news-list">
        <Helmet>
          <title>zhu - news feed</title>
        </Helmet>
        <div className="container col-6">{this.state.newsList}</div>
      </div>
    );
  }
}

export default NewsFeed;
