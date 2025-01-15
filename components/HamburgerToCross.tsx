import React, { useState } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const HamburgerToCross: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const rotateAnim = new Animated.Value(0); // Rotation for the top and bottom bars
  const slideAnim = new Animated.Value(0); // Slide effect for top and bottom bars
  const scaleXAnim = new Animated.Value(1); // For shrinking the middle bar

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);

    // Reset animations to prevent stacking
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: isOpen ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: isOpen ? 0 : 15, // Move from the right
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleXAnim, {
        toValue: isOpen ? 1 : 0, // Hide the middle bar
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Interpolation for rotation (cross transformation)
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'], // Rotation for the cross
  });

  // Interpolation for the sliding effect (move top and bottom bars from right to left)
  const slideX = slideAnim.interpolate({
    inputRange: [0, 15],
    outputRange: [0, 10], // Slide from the right
  });

  // Interpolation for shrinking the middle bar
  const scaleX = scaleXAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0], // Shrink the middle bar
  });

  return (
    <TouchableOpacity onPress={handleToggle} style={styles.container}>
      <Animated.View
        style={[
          styles.svgContainer,
          {
            transform: [{ rotate }],
          },
        ]}
      >
        <Svg width="30" height="30" viewBox="0 0 30 30">
          {isOpen ? (
            // Cross icon (top and bottom lines rotated)
            <>
              <Animated.View
                style={{
                  transform: [{ translateX: slideX }],
                }}
              >
                <Path
                  d="M5 7H25"
                  stroke="rgb(29, 196, 104)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </Animated.View>
              <Animated.View
                style={{
                  transform: [{ translateX: slideX }],
                }}
              >
                <Path
                  d="M5 23H25"
                  stroke="rgb(29, 196, 104)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </Animated.View>
            </>
          ) : (
            // Hamburger icon with middle bar shrinking
            <>
              <Path
                d="M5 6H25"
                stroke="rgb(29, 196, 104)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Wrapping the middle bar with Animated.View */}
                <Path
                  d="M5 12H25"
                  stroke="rgb(29, 196, 104)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              <Path
                d="M5 18H25"
                stroke="rgb(29, 196, 104)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </>
          )}
        </Svg>
      </Animated.View>
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
  svgContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HamburgerToCross;