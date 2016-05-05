/* Adopted from Facebook examples: https://github.com/facebook/react-native/tree/master/Examples" */
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Component,
  ListView,
  Text,
  View,
  TouchableHighlight,
} = ReactNative;
var homepage = require('./homepage');

class tel extends Component {
constructor(props) {
    super(props); 
    this.state = {};
}


  render = () => {
    return (
      <NavigatorIOS
        style={styles.container}
        ref='nav'
        initialRoute={{
          title: 'TEL',
          component: homepage,
        }}
      navigationBarHidden={true} />
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


module.exports = tel;
AppRegistry.registerComponent('tel', () => tel);
