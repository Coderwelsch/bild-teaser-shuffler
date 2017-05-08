import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
	Button,
  View,
} from 'react-native';


export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false
    }
  };

  constructor (props) {
  	super(props);
	  console.log("ssssss");

	this.state = {
		teasers: [ "Test Teaser 1", "Test Teaser 2" ],
		headlines: [ "Test Headline 1", "Test Headline 2" ],
		currentTeaser: "Random Teaser Text",
		currentHeadline: "Random Headline Text"
	}
  }

	setRandomTeaser() {
  	let teasers = this.state.teasers,
		randomItem = teasers[ Math.floor( Math.random() * teasers.length ) ];

  	this.setState({
		currentTeaser: randomItem
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

			<Button
			title = "PUSH"
			color = "#ABCDEF"
			onPress={this.randomize.bind(this)}
			/>


        </View>
    );
  }
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20
	},
	centeredView: {

	},
	teaserText: {
	  textAlign: "center",
      color: "#DD0000"
    },
	headlineText: {
		textAlign: "center",
		color: "#000000",
		fontSize: 21
	}
});