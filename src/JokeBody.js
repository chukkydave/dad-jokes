// import React, { Component } from 'react';
// import Joker from './Joker';
// import axios from 'axios';

// class JokeBody extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { jokes: [], rating: 0 };
// 	}

// 	static defaultProps = {
// 		numOfJokes: 10,
// 	};

// 	async componentDidMount() {
// 		let jokeArr = [];
// 		while (jokeArr.length < this.props.numOfJokes) {
// 			let res = await axios.get('https://icanhazdadjoke.com/', {
// 				headers: { Accept: 'application/json' },
// 			});
// 			jokeArr.push({ joke: res.data.joke, id: res.data.id });
// 		}
// 		this.setState({ jokes: jokeArr });
// 	}

// 	// addRating() {
// 	// 	this.state.rating + 1;
// 	// }

// 	render() {
// 		let allJokes = this.state.jokes.map((jk) => (
// 			<Joker joke={jk.joke} id={jk.id} rating={this.state.rating} />
// 		));
// 		return (
// 			<div>
// 				<h1>Dad Jokes</h1>
// 				{allJokes}
// 			</div>
// 		);
// 	}
// }

// export default JokeBody;
