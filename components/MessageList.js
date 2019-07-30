import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { MapView } from "expo";
import PropTypes from "prop-types";
import { MessageShape } from "../utils/MessageUtils";

const keyExtractor = item => item.id;

const MessageList = ({ onPressMessage, messages }) => {
  console.log("messages", messages);

  const renderMessageBody = ({ type, text, uri, coordinates }) => {
    switch (type) {
      case "text":
        return (
          <View style={styles.messageBubble}>
            <Text style={styles.text}>{text}</Text>
          </View>
        );
      case "image":
        return <Image source={{ uri }} style={styles.image} />;
      case "location":
        return (
          <MapView
            style={styles.map}
            initialRegion={{
              ...coordinates,
              latitudeDelta: 0.08,
              longitudeDelta: 0.04
            }}
          >
            <MapView.Marker coordinate={coordinates} />
          </MapView>
        );
      default:
        return null;
    }
  };

  const renderMessageItem = ({ item }) => (
    <View key={item.id} style={styles.messageRow}>
      <TouchableOpacity onPress={item => onPressMessage(item)}>
        {renderMessageBody(item)}
      </TouchableOpacity>
    </View>
  );
  return (
    <FlatList
      keyExtractor={keyExtractor}
      style={styles.container}
      inverted
      data={messages}
      renderItem={renderMessageItem}
      keyboardShouldPersistTaps={"handled"}
    />
  );
};

MessageList.propTypes = {
  onPressMessage: PropTypes.func,
  messages: PropTypes.arrayOf(MessageShape).isRequired
};

MessageList.defaultProps = {
  onPressMessage: () => {}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "visible"
  },
  messageRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 60
  },
  messageBubble: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "rgb(16,135,255)",
    borderRadius: 20
  },
  text: {
    color: "white",
    fontSize: 18
  },
  image: { width: 150, height: 150, borderRadius: 10 },

  map: { width: 250, height: 250, borderRadius: 10 }
});

export default MessageList;
