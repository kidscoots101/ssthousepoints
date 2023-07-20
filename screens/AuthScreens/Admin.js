import React, { useState } from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "../../firebase";
// import { Input } from 'react-native-elements';
import { db } from "../../firebase";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tabs = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ left: 10, top: 20 }}>
        <Text style={styles.title}>Admin Console</Text>
        <Text style={styles.subtitle}>Welcome, Admin!</Text>
      </View>
      <Tabs.Navigator style={{ top: 20 }}>
        <Tabs.Screen name="Add Announcement" component={AddAnnouncement} />
        <Tabs.Screen name="Add Event" component={AddEvent} />
      </Tabs.Navigator>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

const Admin = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Points"
        component={PointsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const AddAnnouncement = () => {
  const [header, setHeader] = useState("");
  const [text, setText] = useState("");

  const handleAddItem = () => {
    db.collection("Announcements")
      .add({
        header,
        text,
      })
      .then(() => {
        console.log("Item added successfully!");
        setHeader("");
        setText("");
      })
      .catch((error) => {
        console.error("Error adding item: ", error);
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Header"
        value={header}
        onChangeText={setHeader}
        placeholder="Enter header..."
      />
      <TextInput
        style={[styles.input, { marginTop: 20, marginBottom: 20 }]}
        label="Text"
        value={text}
        onChangeText={setText}
        placeholder="Enter text..."
      />
      <View style={{ alignSelf: "center" }}>
        <TouchableOpacity
          onPress={handleAddItem}
          style={{
            backgroundColor: "#DB5461",
            borderRadius: 10,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              padding: 10,
              fontSize: 17,
            }}
          >
            Add Announcements
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const AddEvent = () => {
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [header, setHeader] = useState("");
  const [venue, setVenue] = useState("");

  const handleAddItem = () => {
    db.collection("houseevents")
      .add({
        date,
        desc,
        header,
        venue,
      })
      .then(() => {
        console.log("Item added successfully!");
        setDate("");
        setDesc("");
        setHeader("");
        setVenue("");
      })
      .catch((error) => {
        console.error("Error adding item: ", error);
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        label="Header"
        style={[styles.input, { marginBottom: 20 }]}
        value={header}
        onChangeText={setHeader}
        placeholder="Enter Header..."
      />
      <TextInput
        label="Text"
        style={[styles.input, { marginBottom: 20 }]}
        value={date}
        onChangeText={setDate}
        placeholder="Enter Date..."
      />
      <TextInput
        label="Text"
        style={[styles.input, { marginBottom: 20 }]}
        value={desc}
        onChangeText={setDesc}
        placeholder="Enter Description..."
      />
      <TextInput
        label="Text"
        style={[styles.input, { marginBottom: 20 }]}
        value={venue}
        onChangeText={setVenue}
        placeholder="Enter Venue..."
      />
      <View style={{ alignSelf: "centre" }}>
        <TouchableOpacity
          onPress={handleAddItem}
          style={{
            backgroundColor: "#DB5461",
            borderRadius: 10,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              padding: 10,
              fontSize: 17,
            }}
          >
            Add Event
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PointsScreen = () => {
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    });
  };
  const navigation = useNavigation();
  return (
    <View style={[styles.containerpoints]}>
      <Text style={styles.title}>Points</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    padding: 20,
  },
  containerpoints: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 100,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 25,
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: "100%",
  },
});

export default Admin;
