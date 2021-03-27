import React from 'react';
import {
  DynamicColorIOS,
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  StatusBar,
  ColorValue,
} from 'react-native';
import {resolveColorSync} from '@klarna/platform-colors';

import logo from './logo.png';
import * as Colors from './colors';

const ColorRow = ({label, color}: {label: string; color: ColorValue}) => (
  <View style={styles.colorRow}>
    <View
      style={[
        styles.colorSample,
        {
          backgroundColor: color,
        },
      ]}
    />
    <Text style={styles.colorLabel}>{label}</Text>
  </View>
);

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Image source={logo} style={styles.logo} />
        {Object.entries(Colors).map(([name, color]) => (
          <ColorRow key={name} label={name} color={color} />
        ))}
        <ColorRow
          label="Resolved PlatformColor"
          color={resolveColorSync(Colors.contrasted)}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
  },
  logo: {
    width: 250,
    aspectRatio: 701 / 356,
    height: 150,
    alignSelf: 'center',
  },
  colorRow: {
    paddingHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorSample: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    shadowOpacity: 0.2,
    shadowColor: '#999',
    shadowRadius: 1,
    shadowOffset: {width: 0, height: 0},
  },
  colorLabel: {
    color: Colors.text,
  },
});

export default App;
