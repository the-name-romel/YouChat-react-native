import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const Chat = ({ navigation, route }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#D8BFD8" },
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/2048px-Missing_avatar.svg.png",
            }}
          />
          <Text style={{ marginLeft: 10, fontWeight: 700 }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
    });
  }, []);

  const sendMessage = async () => {
    Keyboard.dismiss();
    try {
      await addDoc(collection(db, "chats", route.params.id, "messages"), {
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: message,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setMessage("");
  };

  useLayoutEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "chats", route.params.id, "messages"),
        orderBy("timestamp", "asc")
      ),
      (querySnapshot) => {
        setMessages(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }
    );

    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
        style={styles.container}
      >
        <>
          <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
            {messages.map(({ id, data }) =>
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.receiver}>
                  <Avatar
                    position="absolute"
                    source={{ uri: data.photoURL }}
                    rounded
                    size={30}
                    bottom={-15}
                    right={-5}
                    //web
                    containerStyle={{
                      bottom: -15,
                      right: -5,
                      position: "absolute",
                    }}
                  />
                  <Text style={styles.receiverText}>{data.message}</Text>
                </View>
              ) : (
                <View key={id} style={styles.sender}>
                  <Avatar
                    position="absolute"
                    source={{ uri: data.photoURL }}
                    rounded
                    size={30}
                    bottom={-15}
                    left={-5}
                    //web
                    containerStyle={{
                      bottom: -15,
                      left: -5,
                      position: "absolute",
                    }}
                  />
                  <Text style={styles.senderText}>{data.message}</Text>
                  <Text style={styles.senderName}>{data.displayName}</Text>
                </View>
              )
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              placeholder="Aa"
              style={styles.textInput}
              value={message}
              onChangeText={(text) => setMessage(text)}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity
              onPress={sendMessage}
              activeOpacity={0.5}
              disabled={!message}
            >
              <Ionicons name="send" size={24} color="#D8BFD8" />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  receiver: {
    padding: 15,
    backgroundColor: "#D8BFD8",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#D8BFD8",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginLeft: 15,
    maxWidth: "80%",
    position: "relative",
    marginBottom: 20,
  },
  senderText: {
    color: "#303030",
    fontWeight: 500,
    marginLeft: 10,
    marginBottom: 8,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "#303030",
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    padding: 15,
    alignItems: "center",
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#D8BFD8",
    padding: 10,
    color: "#303030",
    borderRadius: 30,
  },
  receiverText: {},
});
