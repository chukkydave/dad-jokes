import React, { Component } from 'react';
import Joker from './Joker';
import axios from 'axios';
import './JokeList.css';
import { v4 as uuidv4 } from 'uuid';

class JokeList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
			rating: 0,
			loading: false,
		};
		this.seenJokes = new Set(this.state.jokes.map((jk) => jk.joke));
		this.handleClick = this.handleClick.bind(this);
	}

	static defaultProps = {
		numOfJokes: 10,
	};

	componentDidMount() {
		if (this.state.jokes.length === 0) this.getJokes();
	}

	async getJokes() {
		try {
			let jokeArr = [];
			while (jokeArr.length < this.props.numOfJokes) {
				let res = await axios.get('https://icanhazdadjoke.com/', {
					headers: { Accept: 'application/json' },
				});
				let newJoke = res.data.joke;
				if (!this.seenJokes.has(newJoke)) {
					jokeArr.push({ joke: res.data.joke, id: uuidv4(), votes: 0 });
				} else {
					console.log('duplicate joke');
					console.log(newJoke);
				}
			}
			this.setState(
				(st) => ({
					jokes: [
						...st.jokes,
						...jokeArr,
					],
					loading: false,
				}),
				() => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes)),
			);
		} catch (e) {
			alert(e);
			this.setState({ loading: false });
		}
	}

	handleVote(id, delta) {
		this.setState(
			(st) => ({
				jokes: st.jokes.map(
					(j) =>

							j.id === id ? { ...j, votes: j.votes + delta } :
							j,
				),
			}),
			() => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes)),
		);
	}
	handleClick() {
		this.setState({ loading: true }, this.getJokes);
	}

	render() {
		let sJoke = this.state.jokes.sort((a, b) => b.votes - a.votes);
		if (this.state.loading) {
			return (
				<div className="JokeList-spinner">
					<i className="far fa-8x fa-laugh fa-spin" />
					<h1 className="JokeList-title">loading...</h1>
				</div>
			);
		}
		let allJokes = sJoke.map((jk) => (
			<Joker
				key={jk.id}
				joke={jk.joke}
				id={jk.id}
				votes={jk.votes}
				rating={this.state.rating}
				upVote={() => this.handleVote(jk.id, 1)}
				downVote={() => this.handleVote(jk.id, -1)}
			/>
		));
		return (
			<div className="JokeList">
				<div className="JokeList-sidebar">
					<h1 className="JokeList-title">
						<span>Dad</span> Jokes
					</h1>
					<img
						src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
						alt="laugh emoji"
					/>
					<button className="JokeList-getmore" onClick={this.handleClick}>
						Fetch Jokes
					</button>
				</div>
				<div className="JokeList-jokes">{allJokes}</div>
			</div>
		);
	}
}

export default JokeList;
