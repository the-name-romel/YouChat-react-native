import { View, Text } from "react-native";
import * as React from "react";
import { Button, Input } from "@rneui/base";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddChat = ({ navigation }) => {
  const [input, setInput] = React.useState("");

  const createChat = async () => {
    try {
      await addDoc(collection(db, "chats"), { chatName: input });
      navigation.goBack();
    } catch (error) {
      alert("Error uploading data: ", error);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Add new Chat",
      headerStyle: { backgroundColor: "#D8BFD8" },
    });
  }, []);

  return (
    <View style={{ padding: 30 }}>
      <Input
        value={input}
        onChangeText={(text) => setInput(text)}
        placeholder="Enter a chat name"
        leftIcon={<AntDesign name="wechat" size={24} />}
        style={{ paddingHorizontal: 4 }}
      />
      <Button onPress={createChat} title="Create new Chat" />
    </View>
  );
};

export default AddChat;
