import React, { useState, useEffect } from "react";
import { CameraRoll, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as Permissions from "expo-permissions";
import PropTypes from "prop-types";
import Grid from "./Grid";

const keyExtractor = ({ uri }) => uri;

const ImageGrid = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== "granted") {
      console.log("Camera roll permission denied");
      return;
    }

    const results = await CameraRoll.getPhotos({
      first: 20,
      assetType: "Photos",
      groupTypes: "All"
    });

    const { edges } = results;

    const loadedImages = edges.map(item => item.node.image);

    setImages(loadedImages);
  };

  const renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
    const style = { width: size, height: size, marginLeft, marginTop };
    return <Image source={{ uri }} style={style} />;
  };

  return (
    <Grid renderItem={renderItem} data={images} keyExtractor={keyExtractor} />
  );
};

ImageGrid.propTypes = {
  onPressImage: PropTypes.func
};

ImageGrid.defaultProps = {
  onPressImage: () => {}
};

const styles = StyleSheet.create({
  image: {
    flex: 1
  }
});

export default ImageGrid;
