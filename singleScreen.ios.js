/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  Component,
  Dimensions,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
 } = ReactNative;
 var REQUEST_URL = 'http://api.dirt.frontfish.net/incidents'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

 class incidentScreen extends Component {
  render() {
    var data = this.props.data;
    var url = null;
    if(data.image!=null) {
      var tempUrl=data.image;
      tempUrl = tempUrl.replace("tel_", "");
      tempUrl = tempUrl.replace(new RegExp("_", 'g'), "-");
      url="https://raw.githubusercontent.com/techxlab/images.techxlab.org/gh-pages" + tempUrl;
    }
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={{uri: url}}
            style={styles.image}
          />
          <Image
            source={require('./icons/overlay.png')}
            style={styles.overlay}
          />
        </View>
        <View style={styles.header}>
          <TouchableHighlight underlayColor="transparent" onPress={()=>this.props.navigator.pop()}>
            <Image
              source={require('./icons/back.png')}
              style={styles.refresh}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>{data.name}</Text>
          <View styel={styles.line2}>
            <Text numberOfLines={1} style={styles.subtitle}>{data['#contact']['name']}</Text>
            <TouchableHighlight underlayColor="transparent" onPress={()=>this.props.navigator.pop()}>
              <Image
                source={require('./icons/email.png')}
                style={styles.refresh}
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }

}


 var styles = StyleSheet.create({
  container: {

  },
  imgContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  image: {
    position: 'absolute',
    width: width,
    height: height/3,
  },
  header: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  refresh: {
    position: 'absolute',
    width: 30,
    height: 30,
    margin: 20,
  },
  overlay: {
    position: 'absolute',
    width: width,
    height: height/3,
  },
  body: {
    paddingTop: height/3,
    paddingLeft: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  subtitle: {
    fontSize: 16,
  },
  line2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
 });

module.exports = incidentScreen;
