import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
class Genres extends Component {
    componentDidMount() {
        this.getListOfGenres();
    }
    state = {
        genresList: [],
        redirect: false,
        genreToSearch: ''
    }

    handleRedirect = () => {
        if (this.state.redirect)
            return <Redirect to={`/books?genre=${this.state.genreToSearch}`} />

    }

    getListOfGenres = () => {
        axios.get('http://localhost:3001/genres')
            .then(res => this.setState({ genresList: res.data }));
    }

    handleGenreClick = (data) => {
        console.log(data);
        this.setState({ genreToSearch: data })
        this.setState({ redirect: true });
    }
    render() {

        return (<div>
            {this.handleRedirect()}
            {this.state.genresList.map(c => {
                return (
                    <a onClick={() => this.handleGenreClick(c.genre)}>
                        {c.genre}<br />
                    </a>
                )
            })}
        </div>)
    }
}
export default Genres;