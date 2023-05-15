import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { ListItem, Avatar } from "@rneui/base";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "chats", id, "messages"),
        orderBy("timestamp", "asc")
      ),
      (querySnapshot) => {
        setChatMessages(querySnapshot.docs.map((doc) => doc.data()));
      }
    );

    return unsubscribe;
  }, []);

  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[chatMessages.length - 1]?.photoURL ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/2048px-Missing_avatar.svg.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: 800 }}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[chatMessages.length - 1]?.displayName}:{" "}
          {chatMessages?.[chatMessages.length - 1]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
