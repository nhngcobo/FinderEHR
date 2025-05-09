import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LoginDropdown from './components/LoginDropdown';
import LoginComponent from './components/LoginComponent';
import SignUpComponent from './components/SignUpComponent';

export default function App() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleOutsidePress = () => {
    setShowDropdown(false);
  };

  const loginImg = require('./assets/icons8-login-100.png');
  const logoImg = require('./assets/220110779.png');

  return (
    <View style={styles.root}>
      <View style={styles.logoContainer}>
        <Image source={logoImg} style={styles.logo} />
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={toggleDropdown}>
          <Image source={loginImg} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {showDropdown && (
        <>
          <Pressable style={styles.overlay} onPress={handleOutsidePress} />
          <View style={styles.dropdownContainer}>
            <LoginDropdown
              onProfile={() => {
                setShowLoginModal(true);
                handleOutsidePress();
              }}
              onLogout={() => {
                alert('Logout selected');
                handleOutsidePress();
              }}
              onAbout={() => {
                alert('About selected');
                handleOutsidePress();
              }}
            />
          </View>
        </>
      )}

      {showLoginModal && (
        <LoginComponent
          visible={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          switchToSignUp={() => {
            setShowLoginModal(false);
            setShowSignUpModal(true);
          }}
        />
      )}

      {showSignUpModal && (
        <SignUpComponent
          visible={showSignUpModal}
          onClose={() => setShowSignUpModal(false)}
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFAFA',
    paddingTop: Dimensions.get('window').height * 0.05,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: Dimensions.get('window').height * 0.12,
    resizeMode: 'contain',
  },
  iconContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.09,
    right: Dimensions.get('window').width * 0.05,
    zIndex: 50,
  },
  icon: {
    width: 25,
    height: 25,
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 40,
  },
  dropdownContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.09,
    right: Dimensions.get('window').width * 0.05,
    zIndex: 45,
  },
});
