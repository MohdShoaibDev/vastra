import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { commonColors } from "@utility/appColors";

interface InputFieldProps extends TextInputProps {
  showToggle?: boolean;
  secureTextEntry?: boolean;
  onToggle?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  showToggle = false,
  secureTextEntry,
  onToggle,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        {...rest}
        placeholderTextColor={commonColors.lightGray}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />

      {showToggle && (
        <TouchableOpacity onPress={onToggle}>
          <Icon
            name={secureTextEntry ? "eye-off" : "eye"}
            size={20}
            color="#777"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F3F6",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginTop: 10,
    borderWidth: 1, 
    borderColor: commonColors.white
  },
  input: {
    flex: 1,
    height: 50,
    color: "#000",
  },
});
