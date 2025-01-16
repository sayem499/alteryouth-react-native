import React from 'react';
import { View, StyleSheet } from 'react-native';
import SvgAlteryouthLogo from './SvgAlteryouthLogo';
import HamburgerToCross from './HamburgerToCross';

const TopBar: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Left-aligned hamburger menu */}
      <View style={styles.menuContainer}>
        <HamburgerToCross />
      </View>
      {/* Center-aligned logo */}
      <View style={styles.logoContainer}>
        <SvgAlteryouthLogo width={150} height={80} color="#1dc468" />
      </View>
      {/* Optional: You can also have a right-aligned element here, e.g., profile or notifications */}
      <View style={styles.rightContainer}>
        {/* Add any elements you want on the right side */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',  // Ensures that the menu and logo are spaced apart
    height: 60,
    backgroundColor: '#fafafa',
    paddingHorizontal: 20,
  },
  menuContainer: {
    paddingHorizontal: 0,  // Adjust padding for space around the hamburger
  },
  logoContainer: {
    flex: 1,  // Takes up the remaining space
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    paddingHorizontal: 10,  // Adjust padding if you want something on the right side
  },
});

export default TopBar;