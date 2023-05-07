import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import * as React from "react";
import logo from "../assets/logo.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export default function Register({ navigation }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [image, setImage] = React.useState("");
  const [errortext, setErrortext] = React.useState("");

  const handleRegister = () => {
    setErrortext("");
    if (!name) return alert("Please fill Name");
    if (!email) return alert("Please fill Email");
    if (!password) return alert("Please fill Password");

    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        if (user) {
          updateProfile(user.user, {
            displayName: name,
            photoURL:
              image ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/2048px-Missing_avatar.svg.png",
          })
            .then(() => navigation.replace("Home"))
            .catch((error) => {
              alert(error);
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          setErrortext("That email address is already in use!");
        } else {
          setErrortext(error.message);
        }
      });
  };
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <ScrollView style={styles.whiteSheet}>
        <KeyboardAvoidingView behavior="padding" style={{ height: "100%" }}>
          <SafeAreaView style={styles.form}>
            <Text style={styles.title}>Sign up</Text>
            <TextInput
              autoFocus={true}
              style={styles.input}
              placeholder="Enter full name"
              keyboardType="default"
              textContentType="name"
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              textContentType="password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter image URL (optional)"
              textContentType="URL"
              value={image}
              onChangeText={(img) => {
                setImage(img);
              }}
            />
            {errortext != "" ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
                Sign up
              </Text>
            </TouchableOpacity>
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
                Already have an accout?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  style={{ color: "#D8BFD8", fontWeight: "600", fontSize: 14 }}
                >
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ScrollView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8BFD8",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#D8BFD8",
    alignSelf: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  logo: {
    width: 150,
    height: 150,
    top: 40,
    alignSelf: "center",
    position: "absolute",
    zIndex: 1,
  },
  whiteSheet: {
    width: "100%",
    height: "90%",
    marginTop: "40%",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: "flex-start",
    marginHorizontal: 30,
    marginTop: 50,
  },
  button: {
    backgroundColor: "#D8BFD8",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
