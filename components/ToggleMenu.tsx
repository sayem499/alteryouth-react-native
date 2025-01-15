import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ToggleMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <TouchableOpacity onPress={handleToggle} style={[styles.toggleButton, isOpen && styles.activeToggle]}>
      <Svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="24"
        width="24"
        color={isOpen ? '#1dc468' : '#1dc468'}
      >
        {isOpen ? (
          // Cross icon with adjusted Path and viewBox
          <Path
            d="M368 144L144 368M144 144l224 224"
            strokeWidth="40"
            strokeLinecap="round"
            stroke="currentColor"
          />
        ) : (
          // Menu icon
          <Path d="M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z" />
        )}
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    zIndex: 10,
  },
  activeToggle: {
    zIndex: 20,
  },
});

export default ToggleMenu;