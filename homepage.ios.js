/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  AsyncStorage,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

var REQUEST_URL = 'http://www.techxlab.org/pages.json';

class homepage extends Component {
  componentDidMount() {
    this.fetchData();
  }
  constructor(props) {
    super(props); 
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      refreshing: false,
    };
  }
  fetchData() {
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        loaded: true,
      });
    })
    .done();
  }
  // fetchData(event) {
  //   console.log("boop");
  //   this.setState({
  //     dataSource: this.state.dataSource.cloneWithRows(result),
  //     loaded: false,
  //   });
  //   fetch(REQUEST_URL)
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       AsyncStorage.setItem("data", JSON.stringify(responseData.Solutions));
  //       AsyncStorage.getItem('data', (err, result) => {
  //         this.setState({
  //           dataSource: this.state.dataSource.cloneWithRows(result),
  //           loaded: true,
  //         });
  //       });
  //     })
  //     .done();
  // }
   render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={this._renderHeader}
        renderRow={this._renderRow}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading ...
        </Text>
      </View>
    );
  }

  _renderHeader() {
    return (
      <TouchableHighlight underlayColor="#DDDDDD" onPress={this.test}>
        <Text style={styles.title}>Refresh</Text>
      </TouchableHighlight>
    );
  }

  test() {
    console.log("Button works.`")
  }

  _renderRow(data) {
    var url = null;
    if(data.image!=null) {
      var tempUrl=data.image;
      tempUrl = tempUrl.replace("tel_", "");
      tempUrl = tempUrl.replace(new RegExp("_", 'g'), "-");
      url="https://raw.githubusercontent.com/techxlab/images.techxlab.org/gh-pages" + tempUrl;
    }
    return (
      <View style={styles.container}>
        <Image
          source={{uri: url}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{data.name}</Text>
          
        </View>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = homepage;