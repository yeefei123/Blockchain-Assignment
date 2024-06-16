import { WalletConnectModal, useWalletConnectModal } from "@walletconnect/modal-react-native";
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const projectId = "5e0a645cdb585bef542ce7d4149f81e3";

const providerMetadata = {
  name: "Blockchain_Assignment",
  description: "YOUR_PROJECT_DESCRIPTION",
  url: "https://your-project-website.com/",
  icons: ["https://your-project-logo.com/"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

export default function App() {
  const { open, isConnected, address, provider } = useWalletConnectModal();

  const handleButtonPress = async () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{ uri: 'https://your-project-logo.com/' }}
      />
      <Text style={styles.heading}>Blockchain Crowdfunding</Text>
      <Text style={styles.status}>
        {isConnected ? `Connected: ${address}` : ""}
      </Text>
      <Pressable onPress={handleButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>
          {isConnected ? "Disconnect" : "Connect"}
        </Text>
      </Pressable>

      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    color: "#4CAF50" ,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6200ee",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  pressableMargin: {
    marginTop: 16,
  },
});
