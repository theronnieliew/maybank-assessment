import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {List} from '@ant-design/react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import {useDispatch, useSelector, Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {search} from './store/actions/searchAction';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {store, persistor} from './store';

import {ListItem} from './components/ListItem';
import {GOOGLE_API_KEY} from './config/constants';

const Home = () => {
  const mapRef = useRef<MapView>(null);
  const dispatch = useDispatch();
  const {results} = useSelector(state => state.search);

  const LATITUDE_DELTA = 0.015;
  const LONGITUDE_DELTA = 0.0121;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const [currentLat, setCurrentLat] = useState<number | null>(null);
  const [currentLong, setCurrentLong] = useState<number | null>(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const moveToLocation = (latitude: number, longitude: number) => {
    setCurrentLat(latitude);
    setCurrentLong(longitude);

    mapRef.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      1500,
    );
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <View style={styles.searchBar}>
            <GooglePlacesAutocomplete
              styles={styles}
              minLength={2}
              placeholder="Search Location"
              onPress={(data, details) => {
                if (details) {
                  moveToLocation(
                    details.geometry.location.lat,
                    details.geometry.location.lng,
                  );
                  dispatch(search(details.name));
                }
              }}
              query={{
                key: GOOGLE_API_KEY,
                language: 'en',
              }}
              fetchDetails={true}
            />
            {isKeyboardVisible ? (
              <View style={styles.recentSearchView}>
                <Text style={styles.recentSearchText}>Recent Searches</Text>
                <List>
                  {results.map(item => (
                    <ListItem key={item.key} name={item} />
                  ))}
                </List>
              </View>
            ) : null}
          </View>

          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <Marker
              coordinate={{latitude: currentLat, longitude: currentLong}}
            />
          </MapView>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  searchBar: {
    zIndex: 1,
    width: '100%',
    flex: 0.6,
  },
  recentSearchView: {
    backgroundColor: 'white',
  },
  recentSearchText: {
    marginHorizontal: 20,
    fontSize: 18,
    marginBottom: 5,
  },

  // Google Map AutoComplete
  textInputContainer: {
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  textInput: {
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
    backgroundColor: '#81D8D0',
    borderRadius: 50,
  },
  row: {
    backgroundColor: '#81D8D0',
    borderRadius: 50,
    marginHorizontal: 20,
    marginVertical: 1,
  },
});

export default AppWrapper;
