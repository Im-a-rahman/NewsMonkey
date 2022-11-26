import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        defaultProps: 'general'

    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
     capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`
    }
    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=06ba3825aaa94c2e91ab5bf1e00489b8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })

    }


    async componentDidMount() {

        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=06ba3825aaa94c2e91ab5bf1e00489b8&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // })
        this.updateNews();


    }
    handleNextClick = async () => {
        // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        // }
        // else {


        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=06ba3825aaa94c2e91ab5bf1e00489b8&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({ loading: true });

        //     let data = await fetch(url);

        //     let parsedData = await data.json();
        //     this.setState({
        //         articles: parsedData.articles,
        //         page: this.state.page + 1,
        //         loading : false
        //     })
        // }
        this.setState({ page: this.state.page + 1 });
        this.updateNews();

    }
    handlePrevClick = async () => {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=06ba3825aaa94c2e91ab5bf1e00489b8&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        //    this.setState({loading:true});

        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     this.setState({
        //         articles: parsedData.articles,
        //         page: this.state.page - 1,
        //         loading : false
        //     })
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    render() {

        return (

            <div className='container my-3'>
                <h2 className='text-center'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                {this.state.loading && <Spinner />}
                <div className="row my-5">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-3" key={element.url ? element.url : ""}>
                            <Newsitem source={element.source.name} title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""} author={element.author ? element.author : "Unknown"} date={element.publishedAt ? element.publishedAt : "Recently"} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

                </div>
            </div>
        )
    }
}

export default News
