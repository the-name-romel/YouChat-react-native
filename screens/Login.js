import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import * as React from "react";
import logo from "../assets/logo.png";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errortext, setErrortext] = React.useState("");

  React.useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribeAuth;
  }, []);

  const handleSignIn = () => {
    setErrortext("");
    if (!email) {
      alert("Please fill Email");
      return;
    }
    if (!password) {
      alert("Please fill Password");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        if (user) navigation.replace("Home");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-email")
          setErrortext("Wrong email or username.");
        else if (error.code === "auth/user-not-found")
          setErrortext("No User Found");
        else {
          setErrortext("Please check your email id or password");
        }
      });
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <ScrollView style={styles.whiteSheet}>
        <KeyboardAvoidingView behavior="padding" style={{ height: "100%" }}>
          <SafeAreaView style={styles.form}>
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
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
            <Text style={styles.errorTextStyle}> {errortext} </Text>
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
                Log In
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
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text
                  style={{ color: "#D8BFD8", fontWeight: "600", fontSize: 14 }}
                >
                  Sign Up
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
