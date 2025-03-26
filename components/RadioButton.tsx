import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { View, ViewProps, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = ViewProps & { options: string[]; onSelect: (value: string) => void }

const RadioButton = ({ options, onSelect, ...props }: Props) => {
  const { colors } = useTheme()

  const [selected, setSelected] = useState<string | null>(null);

  const handlePress = (option: string) => {
    setSelected(option);
    onSelect(option);
  };

  return (
    <View style={styles.container} {...props}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={styles.radioContainer}
          onPress={() => handlePress(option)}
        >
          <View style={[styles.outerCircle, { borderColor: colors.primary }]}>
            {selected === option && <View style={[styles.innerCircle, { backgroundColor: colors.primary }]} />}
          </View>
          <Text style={styles.label}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    margin: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  label: {
    fontSize: 14,
  },
});

export default RadioButton;