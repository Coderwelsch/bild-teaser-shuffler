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

    this.state = {
    	teasers: [""],
    	headlines: [""],
    	currentTeaser: "",
    	currentHeadline: ""
    }

    fetch('http://bild.de')
      .then((response) => response.text())
      .then((responseHTML) => {
          
          var matches = this.extractMeta(responseHTML);

          console.log(matches);

          this.setState({
            teasers: matches.kickers,
            headlines: matches.headlines
          })

          this.randomize();


          return console.log(responseHTML);

      })
      .catch((error) => {
          console.error("Error: ", error);
      });
  }

  extractMeta(body) {
    var kickers = [];
    var headlines = []
    var reKicker = /\<span class="kicker"\>(.*?)\<\/span\>/g;
    var reHeadline = /\<span class="headline"\>(.*?)\<\/span\>/g;

     var matched;
     var i = 0;

     while (matched = reKicker.exec(body)) {
         kickers[i] = matched[1];
         // console.log(matched[1]);
         i++;
     }

     var matched;
     i = 0;
     while (matched = reHeadline.exec(body)) {
         headlines[i] = matched[1].replace("<br />", " ");
         // console.log(matched[1].replace("<br />", " "));
         i++;
     }

     return {kickers, headlines};


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