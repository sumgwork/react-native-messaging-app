import PropTypes from "prop-types";
import uuidv1 from "uuid/v1";

export const MessageShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "image", "location"]),
  text: PropTypes.string,
  uri: PropTypes.string,
  coordinates: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  })
});

export const createTextMessage = text => {
  return {
    type: "text",
    id: uuidv1(),
    text
  };
};

export const createLocationMessage = coordinates => {
  return {
    type: "location",
    id: uuidv1(),
    coordinates
  };
};

export const createImageMessage = uri => {
  return {
    type: "image",
    id: uuidv1(),
    uri
  };
};
