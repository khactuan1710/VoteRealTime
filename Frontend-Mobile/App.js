/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import io from 'socket.io-client'

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

class App extends React.Component {

  state = {

    voteTrump: 1,
    voteClinton: 1,
  };

  componentDidMount() {
    this.socket = io("http://127.0.0.1:3500");
    this.socket.on("newVoteTrump", vote => {
      this.setState({ voteTrump: vote })
    });
    this.socket.on("newVoteClinton", vote => {
      this.setState({ voteClinton: vote })
    })
  }

  voteTrump = () => {
    this.setState({ voteTrump: this.state.voteTrump + 1 }, function () {
      this.socket.emit('voteEventTrump', this.state.voteTrump)
    })

  }

  voteClinton = () => {
    this.setState({ voteClinton: this.state.voteClinton + 1 }, function () {
      this.socket.emit('voteEventClinton', this.state.voteClinton)
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center', marginTop: 200, flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30 }}>{this.state.voteTrump}</Text>
          <Text style={{ marginLeft: 100, fontSize: 30 }}>{this.state.voteClinton}</Text>
        </View>
        <View style={{ marginTop: -200, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>

          <TouchableHighlight style={styles.button} onPress={this.voteTrump}>

            <Text>Vote Trump</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.button, { backgroundColor: 'red', marginLeft: 20 }]} onPress={this.voteClinton}>
            <Text>Vote Clinton</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    height: 50,
    width: 120,
    backgroundColor: 'blue',
    marginTop: 250
  }
});

export default App;
