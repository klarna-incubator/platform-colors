import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ColorValue,
} from 'react-native';

import * as Colors from './colors';

const ColorRow = ({label, color}: {label: string; color: ColorValue}) => (
  <View style={styles.colorRow}>
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: color,
        marginRight: 10,
        shadowOpacity: 0.1,
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOffset: {width: 0, height: 0},
      }}
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
        {Object.entries(Colors).map(([name, color]) => (
          <ColorRow key={name} label={name} color={color} />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  colorRow: {
    paddingHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;
