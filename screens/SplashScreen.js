import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";
import logo from "../assets/logo.png";
import { auth } from "../firebase";

const SplashScreen = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      // Check if currentUser is set or not
      // If not then send for Authentication
      // else send to Home Screen
      navigation.replace(auth.currentUser ? "Home" : "Auth");
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#D8BFD8" }}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>YouChat</Text>
      </View>
      <Text style={styles.tagLine}>Chat the day away.</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    alignItems: "center",
    fontSize: 50,
    color: "#A020F0",
    fontWeight: "bold",
  },
  logo: {
    width: 200,
    height: 200,
  },
  tagLine: {
    fontSize: 22,
    textAlign: "center",
    color: "white",
    marginBottom: 100,
    color: "#A020F0",
  },
});
