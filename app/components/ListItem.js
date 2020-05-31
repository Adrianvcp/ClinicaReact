import React from "react";

const users = [
  {
    name: "brynn",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
  }
];

import { View, Text, Image, StyleSheet } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";

// implemented without image with header
<Card title="CARD WITH DIVIDER">
  {users.map((u, i) => {
    return (
      <View key={i} style={styles.user}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: u.avatar }}
        />
        <Text style={styles.name}>{u.name}</Text>
      </View>
    );
  })}
</Card>;

const styles = StyleSheet.create({
  image: {
    width: "30%",
    height: 140,
    marginTop: 50,
    margin: 35,
    marginLeft: 140
  },
  name: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center"
  },
  user: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
