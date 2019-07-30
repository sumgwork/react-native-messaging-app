import Constants from "expo-constants";
import {
  StyleSheet,
  Platform,
  NetInfo,
  View,
  Text,
  StatusBar
} from "react-native";
import React, { useState, useEffect } from "react";

const statusHeight = Platform.OS === "ios" ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight
  },
  messageContainer: {
    zIndex: 1,
    position: "absolute",
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: "center"
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "red",
    borderRadius: 20
  },
  text: {
    color: "white"
  }
});

const Status = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    NetInfo.isConnected.addEventListener("connectionChange", status =>
      setIsConnected(status)
    );

    checkConnection();
    return () => {
      NetInfo.isConnected.removeEventListener("connectionChange");
    };
  }, []);

  const checkConnection = async () => {
    const isConnected = await NetInfo.isConnected.fetch();
    setIsConnected(isConnected);
  };

  const backgroundColor = isConnected ? "white" : "red";

  const statusBar = (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={isConnected ? "dark-content" : "light-content"}
      animated={false}
    />
  );

  const messageContainer = (
    <View style={styles.messageContainer} pointerEvents={"none"}>
      {statusBar}
      {!isConnected && (
        <View style={styles.bubble}>
          <Text style={styles.text}>No network connection</Text>
        </View>
      )}
    </View>
  );
  if (Platform.OS === "ios") {
    return (
      <View style={[styles.status, { backgroundColor }]}>
        {messageContainer}
      </View>
    );
  }
  return messageContainer;
};

export default Status;
