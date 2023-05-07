import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { Avatar } from "@rneui/base";

const Chat = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/2048px-Missing_avatar.svg.png",
            }}
          />
          <Text>{route.params.chatName}</Text>
        </View>
      ),
    });
  }, []);
  return (
    <View>
      <Text>{route.params.chatName}</Text>
    </View>
  );
};

export default Chat;
