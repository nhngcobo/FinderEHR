import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

export default function LoginDropdown({ onProfile, onLogout, onAbout }) {
  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <View style={styles.dropdown}>
        <TouchableOpacity onPress={onProfile}>
          <Text style={styles.dropdownItem}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.dropdownItem}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onAbout}>
          <Text style={styles.dropdownItem}>About</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 50,
  },
  dropdown: {
    marginTop: Dimensions.get('window').height * 0.03,
    marginRight: Dimensions.get('window').width * 0.05,
    width: 100,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 6,
    fontSize: 14,
    color: '#333',
  },
});
