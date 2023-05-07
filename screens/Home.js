import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "@rneui/base";
import { auth, db } from "../firebase";

const Home = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "YouChat",
      headerStyle: { backgroundColor: "#D8BFD8" },
      headerTitleStyle: { color: "#4f304f" },
      headerTitleAlign: "center",
      headerLeft: () => {
        <View style={{ marginLeft: 20 }}>
          <Avatar rounded source={{ auth }} />
        </View>;
      },
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D8BFD8",
  },
});
