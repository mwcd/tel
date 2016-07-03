/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  AsyncStorage,
  Component,
  Dimensions,
  Image,
  Linking,
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
 } = ReactNative;
var REQUEST_URL = 'http://api.dirt.frontfish.net/incidents'
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

const favorite = require('./icons/heart_alt.png');
const not_favorite = require('./icons/heart_white.png');

class solutionScreen extends Component {

  render() {
    var data = this.props.data;
    var url = null;
    if(data.image!=null) {
      var tempUrl=data._hdr
      tempUrl = tempUrl.substring(tempUrl.indexOf("image: ") + 7);
      tempUrl = tempUrl.substring(0, tempUrl.indexOf("\n"));
      url='http://images.techxlab.org' + tempUrl;
    }
    var section1 = this.remNewlines(data['_txt']);
    var isHistory = data['#history-and-development'] != null ? true : false;
    if (isHistory) {
      var section2 = this.remNewlines(data['#history-and-development']['_txt']);
    }
    var section3 = this.remNewlines(data['#availability']['_txt']);
    var isSpecifications = data['#specifications'] != null ? true : false;
    if (isSpecifications) {
      var section4 = this.remNewlines(data['#specifications']['_txt']);
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
              style={styles.back}
            />
          </TouchableHighlight>
          <TouchableHighlight underlayColor="transparent" onPress={()=>this.toggleFavorite(data)}>
            <Image
              source={this.favPic(data)}
              style={styles.back}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.body}>
          <View style={styles.dark}>
            <Text style={styles.title}>{data.name}</Text>
            <View style={styles.line2}>
              <Text style={styles.subtitle}>{data['#contact']['name']}</Text>
              <TouchableHighlight underlayColor="transparent" onPress={()=>this.mail(data)}>
                <Image
                  source={require('./icons/email.png')}
                  style={styles.email}
                />
              </TouchableHighlight>
            </View>
          </View>
          <ScrollView>
          {
            <View style={styles.scrollView}>
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Solution Overview & Benefits</Text>
                <Text style={styles.paragraph}>{section1}</Text>
              </View>
              {isHistory &&
                <View style={styles.section}>
                  <Text style={styles.sectionHeader}>History & Development</Text>
                  <Text style={styles.paragraph}>{section2}</Text>
                </View>}
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Availability</Text>
                <Text style={styles.paragraph}>{section3}</Text>
              </View>
              {isSpecifications &&
                <View style={styles.section}>
                  <Text style={styles.sectionHeader}>Specifications</Text>
                  <Text style={styles.paragraph}>{section4}</Text>
                </View>}
            </View>
          }
          </ScrollView>
        </View>
      </View>
    );
  }
  remNewlines(data) {
    indivData = data;
    var pos=indivData.lastIndexOf("\n");
    while(pos==indivData.length-1) {
      indivData=indivData.slice(0,indivData.length-2);
      pos=indivData.lastIndexOf("\n");
    }
    return indivData;
  }

  favPic(data) {
    if (this.favoriteIndex(data)!=-1) {
      return favorite;
    } else {
      return not_favorite;
    }
  }

  favoriteIndex(data) {
    temp_data = this.props.favorites
    data_length = this.props.favorites.length;
    for (i=0; i < data_length; i++) {
        if(temp_data[i]._hdr==data._hdr) {
          return i;
        }
      }
      return -1;
  }

  toggleFavorite(data) {
    favSpot = this.favoriteIndex(data);
    favs = this.props.favorites;
    if (favSpot!=-1) {
      this.props.favorites.splice(favSpot,1);
      AsyncStorage.setItem("favorites", JSON.stringify(favs));
    } else {
      this.props.favorites.push(data);
      AsyncStorage.setItem("favorites", JSON.stringify(favs));
    }
    this.setState({
      reload: null,
    });
  }

  mail(data) {
    var mailArray = data['#contact']['_txt'].split(" ");
    var address = mailArray[mailArray.length - 3];
    address = address.replace("\n", "");
    Linking.canOpenURL(address).then(supported => {
      if (supported) {
        Linking.openURL(address);
      } else {
        console.log('Don\'t know how to open URI: ' + mailData);
      }
    });
  }

}


 var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    height: height/3,
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
  back: {
    width: 30,
    height: 30,
    margin: 20,
    marginTop: -height/3 + 20,
  },
  email: {
    width: 30,
    height: 20,
    paddingTop: 5,
  },
  scrollView: {
    marginTop: -15,
  },
  overlay: {
    position: 'absolute',
    width: width,
    height: height/3,
  },
  body: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  dark: {
    borderColor: 'white',
    borderBottomColor: '#E3E2E1',
    borderWidth: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  subtitle: {
    fontSize: 16,
  },
  line2: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  section: {
    padding: 0,
    margin: 0,
  },
  sectionHeader: {
    color: '#FF9900',
    fontWeight: 'bold',
  },
  paragraph: {
    paddingTop: 5,
    paddingBottom: 15,
  },
 });

module.exports = solutionScreen;
