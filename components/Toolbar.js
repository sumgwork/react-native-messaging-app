import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";

const Toolbar = ({
  onPressCamera,
  onPressLocation,
  onSubmit,
  onChangeFocus,
  isFocused
}) => {
  const [text, setText] = useState("");

  let input;
  const setInputRef = ref => {
    input = ref;
  };

  useEffect(() => {
    if (isFocused) {
      input.focus();
    } else {
      input.blur();
    }
  }, [isFocused]);
  const handleSubmitEditing = () => {
    if (!text) return;
    onSubmit(text);
    setText("");
  };

  const handleFocus = () => {
    onChangeFocus(true);
  };

  const handleBlur = () => {
    onChangeFocus(false);
  };

  return (
    <View style={styles.toolbar}>
      {/* Use emojis for icons */}
      <ToolbarButton title={"📷"} onPress={onPressCamera} />
      <ToolbarButton title={"📍"} onPress={onPressLocation} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          underlineColorAndroid={"transparent"}
          placeholder={"Type something!"}
          blurOnSubmit={false}
          value={text}
          onChangeText={text => setText(text)}
          onSubmitEditing={handleSubmitEditing}
          ref={setInputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
    </View>
  );
};

Toolbar.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  onChangeFocus: PropTypes.func,
  onSubmit: PropTypes.func,
  onPressCamera: PropTypes.func,
  onPressLocation: PropTypes.func
};

Toolbar.defaultProps = {
  onChangeFocus: () => {},
  onSubmit: () => {},
  onPressCamera: () => {},
  onPressLocation: () => {}
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 16,
    backgroundColor: "white"
  },
  button: { top: -2, marginRight: 12, fontSize: 20, color: "grey" },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0,0,0,0.02)"
  }
});

const ToolbarButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);

ToolbarButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default Toolbar;
