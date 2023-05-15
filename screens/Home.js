import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CustomListItem from "../components/CustomListItem";
import { AntDesign } from "@expo/vector-icons";
import { Avatar } from "@rneui/base";
import { auth, db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Home = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Auth");
    });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chats"), (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        chatData: doc.data(),
      }));
      setChats(data);
    });

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "YouChat",
      headerStyle: { backgroundColor: "#D8BFD8" },
      headerTitleStyle: { color: "black" },
      headerTitleAlign: "center",
      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            marginRight: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("AddChat")}>
            <AntDesign name="pluscircleo" size={24} color={"black"} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {chats.map(({ id, chatData: { chatName } }) => (
          <CustomListItem
            chatName={chatName}
            key={id}
            id={id}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
