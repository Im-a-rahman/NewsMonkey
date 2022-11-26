import React, { Component } from 'react'

export class Newsitem extends Component {


  render() {
    let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
    
    return (
        <div className="card">
        <img src={!imageUrl?"https://c.ndtvimg.com/2022-11/gdc92e38_satish-jarkiholi_625x300_08_November_22.jpg":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'85%'}}>
    {source}
 
  </span>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toLocaleTimeString()}</small></p>
          <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-dark">Read more</a>
        </div>
        </div>
      
    )
  }
}

export default Newsitem
