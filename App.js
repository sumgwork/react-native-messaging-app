import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TouchableHighlight,
  BackHandler
} from "react-native";
import MessageList from "./components/MessageList";
import Status from "./components/Status";
import Toolbar from "./components/Toolbar";
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

  const [fullScreenImageId, setFullScreenImageId] = useState(null);

  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (fullScreenImageId) {
          setFullScreenImageId(null);
          return true;
        }
        return false;
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handlePressToolbarCamera = () => {};

  const handlePressToolbarLocation = () => {};

  const handleChangeFocus = isFocused => setIsInputFocused(isFocused);

  const dismissFullScreenImage = () => setFullScreenImageId(null);

  const handleSubmit = text => {
    setMessages([createTextMessage(text), ...messages]);
  };

  const handlePressMessage = ({ type, id }) => {
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
      case "image":
        setFullScreenImageId(id);
        setIsInputFocused(false);
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
        <Toolbar
          isFocused={isInputFocused}
          onSubmit={handleSubmit}
          onChangeFocus={handleChangeFocus}
          onPressCamera={handlePressToolbarCamera}
          onPressLocation={handlePressToolbarLocation}
        />
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

  const renderFullScreenImage = () => {
    if (!fullScreenImageId) return null;

    const image = messages.find(message => message.id === fullScreenImageId);
    if (!image) return null;
    const { uri } = image;

    return (
      <TouchableHighlight
        style={styles.fullScreenOverlay}
        onPress={dismissFullScreenImage}
      >
        <Image style={styles.fullScreenImage} source={{ uri }} />
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <Status />
      {renderMessageList()}
      {renderToolbar()}
      {renderInputMethodEditor()}
      {renderFullScreenImage()}
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
  },
  fullScreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    zIndex: 2
  },
  fullScreenImage: {
    flex: 1,
    resizeMode: "contain"
  }
});
