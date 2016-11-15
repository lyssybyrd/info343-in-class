import React from "react";
export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        var image = "http://image.tmdb.org/t/p/w154/";

        return (
            <div>
                <h2>{this.props.movie.title}</h2>
                <p>{this.props.movie.overview}</p>
                <img src= {image + this.props.movie.poster_path} alt="Movie Image"/>
                
            </div>
            
        );
    }
}

