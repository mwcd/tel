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
  StatusBar,
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
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.Solutions),
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
      <View style={styles.all}>
      <StatusBar
       backgroundColor="blue"
       barStyle="light-content"
     />
        <View style={styles.header}>
          <Image
            source={require('./icons/hamburger.png')}
            style={styles.hamburger}
          />
          <Text style={styles.icon}>tel</Text>
          <View style={styles.gap}>
          </View>
          <Image
            source={require('./icons/search.png')}
            style={styles.search}
          />
          <TouchableHighlight underlayColor="#DDDDDD" onPress={()=>this.test()}>
            <Image
              source={require('./icons/refresh.png')}
              style={styles.refresh}
            />
          </TouchableHighlight>
        </View>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        style={styles.listView}
      />
      </View>
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


  test() {
    console.log("Button works.")
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
  all: {
    flex: 1,
  },
  header: {
    paddingTop: 10,
    backgroundColor: '#5EC54B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hamburger: {
    width: 20,
    height: 20,
    margin: 20,
  },
  icon: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  gap: {
    flex: 1,
  },
  search: {
    width: 20,
    height: 20,
    margin: 10,
  },
  refresh: {
    width: 20,
    height: 20,
    margin: 10,
    marginRight: 20,
  },
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
    backgroundColor: '#F5FCFF',
  },
});

module.exports = homepage;