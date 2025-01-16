import React, { useState } from 'react';
import { TouchableOpacity, Animated, View, StyleSheet } from 'react-native';

const HamburgerToCross: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const rotateAnim = new Animated.Value(0); // Rotation for top and bottom bars
  const translateYTop = new Animated.Value(0); // Y-axis translation for the top bar
  const translateYBottom = new Animated.Value(0); // Y-axis translation for the bottom bar
  const middleBarTranslateY = new Animated.Value(0); // Translate middle bar to hide it

  // A flag to prevent animations from starting when one is already in progress
  const [animating, setAnimating] = useState(false);

  const handleToggle = () => {
    if (animating) return; // Prevent further clicks until animation completes

    setAnimating(true);
    setIsOpen((prevState) => !prevState); // Toggle the state for the transition

    // Use Animated.parallel to run all animations at the same time
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: isOpen ? 0 : 1, // Control the rotation angle
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateYTop, {
        toValue: isOpen ? 0 : 28, // Move top bar up
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateYBottom, {
        toValue: isOpen ? 0 : -28, // Move bottom bar down
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(middleBarTranslateY, {
        toValue: isOpen ? 0 : -100, // Move middle bar out of view (making it disappear)
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After the animation completes, reset animating flag
      setAnimating(false);
    });
  };

  // Interpolations for rotation angles of the top and bottom bars
  const topRotate = rotateAnim.interpolate({
    inputRange: [0, 1], // Fixed range with three points
    outputRange: ['0deg', '73deg'],// Rotate top bar more to create a cross effect
  });

  const bottomRotate = rotateAnim.interpolate({
    inputRange: [0, 1], // Fixed range with three points
    outputRange: ['0deg', '-73deg'], // Rotate bottom bar more to create a cross effect
  });

  return (
    <TouchableOpacity onPress={handleToggle} style={styles.container}>
      <View style={styles.hamburgerContainer}>
        {/* Top Bar */}
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                { rotate: topRotate },
                { translateY: translateYTop },
              ],
            },
          ]}
        />

        {/* Middle Bar */}
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [{ translateY: middleBarTranslateY }],
            },
          ]}
        />

        {/* Bottom Bar */}
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                { rotate: bottomRotate },
                { translateY: translateYBottom },
              ],
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburgerContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    width: 24, // Thinner bars
    height: 3,  // Default bar height
    backgroundColor: 'rgb(29, 196, 104)',
    borderRadius: 2,
    marginVertical: 2, // Reduced margin for smaller gaps between bars
  },
});

export default HamburgerToCross;