import React, {
  ActivityIndicatorIOS,
  AppRegistry,
  AsyncStorage,
  Component,
  Dimensions,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  StatusBar,
} from 'react-native';
import Drawer from 'react-native-drawer'
var singleScreen = require('./singleScreen');
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
var REQUEST_URL = 'http://www.techxlab.org/pages.json';

const all = require('./icons/all.png');
const all_alt = require('./icons/all_alt.png');
const heart = require('./icons/heart.png');
const heart_alt = require('./icons/heart_alt.png');
const tools = require('./icons/tools.png');
const tools_alt = require('./icons/tools_alt.png');
const cooking = require('./icons/cooking.png');
const cooking_alt = require('./icons/cooking_alt.png');
const health = require('./icons/health.png');
const health_alt = require('./icons/health_alt.png');
const education = require('./icons/education.png');
const education_alt = require('./icons/education_alt.png');
const transport = require('./icons/transport.png');
const transport_alt = require('./icons/transport_alt.png');
const water = require('./icons/water.png');
const water_alt = require('./icons/water_alt.png');
const additional = require('./icons/additional.png');
const additional_alt = require('./icons/additional_alt.png');




class homepage extends Component {
  componentDidMount() {
    this.loadData();
  }
  constructor(props) {
    super(props); 
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      data: null,
      sourceData: null,
      loaded: false,
      refreshing: false,
      drawer: false,
      curr_cat: 0,
      favorites: {null},
      categories: ['All solutions',
                   'Favorites',
                   'Agriculture & Tools',
                   'Energy & Cooking',
                   'Health & Medical Care',
                   'Education & Connectivity',
                   'Housing & Transport',
                   'Water & Sanitation',
                   'Additional Solutions'
      ],
      db_cats: ['agriculture',
                'energy',
                'medical',
                'education',
                'housing',
                'water',
                'other',
      ],
      icons: [all,
              all_alt,
              heart,
              heart_alt,
              tools,
              tools_alt,
              cooking,
              cooking_alt,
              health,
              health_alt,
              education,
              education_alt,
              transport,
              transport_alt,
              water,
              water_alt,
              additional,
              additional_alt
      ],
    };
  }
  fetchData(event) {
    this.setState({
      loaded: false,
    });
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        AsyncStorage.setItem("data", JSON.stringify(responseData.Solutions));
        this.setState({
          loaded: true,
        });
      })
      .done();
  }
  loadData() {
    //Load JSON data
    AsyncStorage.getItem('data', (err, result) => {
          if(result != null) {
            final=JSON.parse(result)
            this.setState({
              //for listview
              data: this.state.dataSource.cloneWithRows(final),
              // raw data
              sourceData: final,
              loaded: true,
            });
          } else {
            this.fetchData
          }
        });
    //Load user's current category
    AsyncStorage.getItem('curr_cat', (err, result) => {
          if(result != null) {
            this.change_cat(JSON.parse(result));
          } else {
            this.change_cat(0);
            AsyncStorage.setItem("curr_cat", JSON.stringify(0));
          }
    });
    //Load favorites
    AsyncStorage.getItem('favorites', (err, result) => {
      console.log(result);
          if (result != null) {
            this.setState({
              favorites: JSON.parse(result),
            });
          } else {
            this.setState({
              favorites: [],
            });
          }
    });
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View style={styles.all}>
        <StatusBar
         barStyle="light-content"
       />
        <Drawer
          ref={(ref) => this._drawer = ref}
          openDrawerOffset={0.2}
          captureGestures={false}
          content={
            <View style={styles.settings}>
              <Image
                source={require('./icons/settings_logo.png')}
                style={styles.settingsLogo}
              />
              <View style={styles.buttons}>
                <TouchableHighlight underlayColor="transparent" onPress={()=>this.change_cat(0)}>
                  <View style={styles.indivButton}>
                      <Image
                        source={this.icon_color(0)}
                        style={styles.catIcon}
                      />
                      <Text style={this.menuItem(0)}>{this.state.categories[0]}</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="transparent" onPress={()=>this.change_cat(1)}>
                  <View style={styles.indivButton}>
                      <Image
                        source={this.icon_color(1)}
                        style={styles.catIcon}
                      />
                      <Text style={this.menuItem(1)}>{this.state.categories[1]}</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="transparent" onPress={()=>this.change_cat(2)}>
                  <View style={styles.indivButton}>
                      <Image
                        source={this.icon_color(2)}
                        style={styles.catIcon}
                      />
                      <Text style={this.menuItem(2)}>{this.state.categories[2]}</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="transparent" onPress={()=>this.change_cat(3)}>
                  <View style={styles.indivButton}>
                      <Image
                        source={this.icon_color(3)}
                        style={styles.catIcon}
                      />
                      <Text style={this.menuItem(3)}>{this.state.categories[3]}</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="transparent" onPress={()=>this.change_cat(4)}>
                  <View style={styles.indivButton}>
                      <Image
                        source={this.icon_color(4)}
                        style={styles.catIcon}
                      />
                      <Text style={this.menuItem(4)}>{this.state.categories[4]}</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="transparent" onPress={()=>this.change_cat(5)}>
                  <View style={styles.indivButton}>
                      <Image
                        source={this.icon_color(5)}
                        style={styles.catIcon}
                      />
                      <Text style={this.menuItem(5)}>{this.state.categories[5]}</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="transparent" onPress={()=>this.change_cat(6)}>
                  <View style={styles.indivButton}>
                      <Image
                        source={this.icon_color(6)}
                        style={styles.catIcon}
                      />
                      <Text style={this.menuItem(6)}>{this.state.categories[6]}</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="transparent" onPress={()=>this.change_cat(7)}>
                  <View style={styles.indivButton}>
                      <Image
                        source={this.icon_color(7)}
                        style={styles.catIcon}
                      />
                      <Text style={this.menuItem(7)}>{this.state.categories[7]}</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="transparent" onPress={()=>this.change_cat(8)}>
                  <View style={styles.indivButton}>
                      <Image
                        source={this.icon_color(8)}
                        style={styles.catIcon}
                      />
                      <Text style={this.menuItem(8)}>{this.state.categories[8]}</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          }
          >
          <View style={styles.header}>
          <TouchableHighlight underlayColor="transparent" onPress={()=>this.switchDrawerState()}>
            <Image
              source={require('./icons/hamburger.png')}
              style={styles.hamburger}
            />
          </TouchableHighlight>
          <Text style={styles.icon}>tel</Text>
          <View style={styles.gap}>
          </View>
          <Image
            source={require('./icons/search.png')}
            style={styles.search}
          />
          <TouchableHighlight underlayColor="transparent" onPress={()=>this.fetchData()}>
            <Image
              source={require('./icons/refresh.png')}
              style={styles.refresh}
            />
          </TouchableHighlight>
        </View>
        <ListView
          dataSource={this.state.data}
          removeClippedSubviews={true}
          renderRow={this._renderRow.bind(this)}
          renderScrollComponent={(props) =><React.RecyclerViewBackedScrollView {...props}/>}
          style={styles.listView}
        />
        </Drawer>
      </View>
    );
  }

  renderLoadingView() {
    return (   
      <View style={styles.all}>
        <StatusBar
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
            <TouchableHighlight underlayColor="#5EC54B" onPress={()=>this.fetchData()}>
              <Image
                source={require('./icons/refresh.png')}
                style={styles.refresh}
              />
            </TouchableHighlight>
          </View>
        <View style={styles.container}>
          <ActivityIndicatorIOS
            animating={this.state.animating}
            style={[styles.centering, {height: 80}]}
            size="large"
          />
        </View>
      </View>
    );
  }

  _renderRow(data, sectionID, rowID, highlightRow) {
    let oddRow = rowID % 2 == 1;
    var url = null;
    //create image url
    if(data.image!=null) {
      var tempUrl=data._hdr
      tempUrl = tempUrl.substring(tempUrl.indexOf("image: ") + 7);
      tempUrl = tempUrl.substring(0, tempUrl.indexOf("\n"));
      url='http://images.techxlab.org' + tempUrl;
    }
    return (
      <TouchableHighlight onPress={()=>this.nextPage(data)}>
        <View style={[styles.container, oddRow && styles.oddRowStyle]}>
          <Image
            source={{uri: url}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <View style={styles.text}>
            <Text numberOfLines={1} style={styles.title}>{data.name}</Text>
            <Text numberOfLines={1} style={styles.subtitle}>{data['#contact']['name']}</Text>
            </View>
            <View style={styles.favorite}>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  } 
  
  //Only load new page if drawer is closed. Otherwise, close it.
  nextPage(data) {
    sourceData=this.props.sourceData;
    var favorites = this.state.favorites
    if (this.state.drawer==true) {
      this._drawer.close();
      this.state.drawer=false;
    } else {
      this.props.navigator.push({
          title: data.name,
          component: singleScreen,
          passProps: {data,
            favorites,
            sourceData,
          },
      });
    }
  }

  switchDrawerState() {
    if (this.state.drawer==false) {
      this._drawer.open();
      this.state.drawer=true;
    } else {
      this._drawer.close();
      this.state.drawer=false;
    }
  }

  change_cat(num) {
    this.setState({curr_cat: num});
    AsyncStorage.setItem("curr_cat", JSON.stringify(num));
    my_cat = this.state.curr_cat;
    temp_data = this.state.sourceData;
    data_length = temp_data.length;
    if(num==0) {
      final_data = temp_data;
    } else if (num == 1) {
      final_data = this.state.favorites;
    } else {
      var final_data = [];
      for (i=0; i < data_length; i++) {
        if(temp_data[i].category==this.state.db_cats[my_cat-2]) {
          final_data.push(temp_data[i]);
        }
      }
    }
    this.setState({
      data: this.state.dataSource.cloneWithRows(final_data),
    });
  }

  menuItem(num) {
    if (num == this.state.curr_cat) {
      return {
        fontSize: 16,
        margin: 15,
        marginLeft: 25,
        color:'#FF9900', 
        fontWeight:'bold',
      };
    } else {
      return {
        fontSize: 16,
        margin: 15,
        marginLeft: 25,
        color:'#555555',
        fontWeight:'bold',
      };
    }
  }

  icon_color(num) {
    if(num==(this.state.curr_cat)) {
      return this.state.icons[num*2+1];
    } else {
      return this.state.icons[num*2];
    }
  }
}


var styles = StyleSheet.create({
  all: {
    flex: 1,
  },
  settings: {
  },
  settingsLogo: {
    width: 4*width/5,
    height: 4*width/15.287356322,
  },
  buttons: {
    marginTop: 15
  },
  indivButton: {
    marginLeft: 25,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  catIcon: {
    width: 20,
    height: 20,
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
    backgroundColor: '#FFFFFF',
  },
  oddRowStyle: {
    backgroundColor: '#F3F2F1',
  },
  rightContainer: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
  },
  thumbnail: {
    margin: 5,
    width: 102,
    height: 60,
    borderColor: "#AAAACC",
    borderWidth: 1,
  },
  listView: {
    backgroundColor: '#F5FCFF',
  },
});

module.exports = homepage;