import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import MessageList from "./components/MessageList";
import Status from "./components/Status";
import {
  createImageMessage,
  createLocationMessage,
  createTextMessage
} from "./utils/MessageUtils";

export default function App() {
  const [messages, setMessages] = useState([
    createImageMessage("https://unsplash.it/300/300"),
    createTextMessage("World"),
    createLocationMessage({
      latitude: 37.78825,
      longitude: -122.4324
    }),
    createTextMessage("Hello")
  ]);

  handlePressMessage = ({ type, id }) => {
    switch (type) {
      case "text":
        Alert.alert(
          "Delete message?",
          "Are you sure you want to permanently delete this message?",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {
                setMessages(messages.filter(message => message.id !== id));
              }
            }
          ]
        );
        break;
      default:
        break;
    }
  };

  const renderMessageList = () => {
    return (
      <View style={styles.content}>
        <MessageList messages={messages} onPressMessage={handlePressMessage} />
      </View>
    );
  };

  const renderToolbar = () => {
    return (
      <View style={styles.toolbar}>
        <Text>Toolbar</Text>
      </View>
    );
  };

  const renderInputMethodEditor = () => {
    return (
      <View style={styles.inputMethodEditor}>
        <Text>Editor</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Status />
      {renderMessageList()}
      {renderToolbar()}
      {renderInputMethodEditor()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  content: {
    flex: 1,
    backgroundColor: "white"
  },
  toolbar: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.4)"
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: "white"
  }
});
