// imports
import React, { Component } from 'react';
import {
	AppRegistry,
	
	Alert,
	Image,
	StyleSheet,
	Text,
	Button,
	View
} from 'react-native';


export default class AlternativeNews extends Component {
	constructor (props) {
		super(props);

		this.state = {
			teasers: [""],
			headlines: [""],
			currentTeaser: "PLACEHOLDER",
			currentHeadline: "PLACEHOLDER"
		};

		this.fetchUrl();
	}

	fetchUrl () {
		fetch('http://bild.de')
			.then((response) => {return response.text()})
			.then((responseHTML) => {
				var matches = this.extractMeta(responseHTML);

				this.setState({
					teasers: matches.kickers,
					headlines: matches.headlines
				});

				this.randomize();
			})
			.catch((error) => {
				Alert.alert(error.message);
			});
	}

	extractMeta(body) {
		var kickers = [];
		var headlines = [];
		var reKicker = /\<span class="kicker"\>(.*?)\<\/span\>/g;
		var reHeadline = /\<span class="headline"\>(.*?)\<\/span\>/g;

		var matched;
		var i = 0;

		while (matched = reKicker.exec(body)) {
			kickers[i] = matched[1];
			i++;
		}

		var matched;
		i = 0;
		while (matched = reHeadline.exec(body)) {
			headlines[i] = matched[1].replace("<br />", " ").replace("<span>", " ").replace("<br />", " ") ;
			i++;
		}

		return {kickers, headlines};
	}

	setRandomTeaser() {
		let teasers = this.state.teasers,
			randomItem = teasers[ Math.floor( Math.random() * teasers.length ) ];

		this.setState({
			currentTeaser: randomItem.toUpperCase()
		});
	}

	setRandomHeadline() {
		let headlines = this.state.headlines,
			randomItem = headlines[ Math.floor( Math.random() * headlines.length ) ];

		this.setState({
			currentHeadline: randomItem
		});
	}

	randomize() {
		this.setRandomTeaser();
		this.setRandomHeadline();
	}

	render() {
		return (
			<View style={styles.mainView}>
				<View style={styles.centeredView}>
					<Text style={styles.teaserText}>
						{this.state.currentTeaser}
					</Text>
					<Text style={styles.headlineText}>
						{this.state.currentHeadline}
					</Text>
				</View>

				<Button title="Erneut mischen" color="#DD0000" style={styles.button} onPress={ this.randomize.bind(this) } />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		borderWidth: 1,
		borderColor: '#CCCCCC'
	},
	button: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 20,
		right: 20,
		height: 50,
		color: '#DD0000'
	},
	randomizeBtn: {
		alignContent: "flex-end",
		color: "#000000",
		backgroundColor: "#DD0000"
	},
	teaserText: {
		textAlign: "center",
		fontWeight: "bold",
		color: "#DD0000"
	},
	headlineText: {
		textAlign: "center",
		color: "#000000",
		fontWeight: "bold",
		fontSize: 21
	}
});

AppRegistry.registerComponent('AlternativeNews', () => AlternativeNews);
