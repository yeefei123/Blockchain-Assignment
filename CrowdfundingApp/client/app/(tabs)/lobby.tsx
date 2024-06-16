import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { useActiveAccount, useActiveWallet, useDisconnect } from 'thirdweb/react';
import { shortenAddress } from 'thirdweb/utils';

const characters = [
  { id: 1, name: 'Character 1', image: require('../../assets/images/character1.png') },
  { id: 2, name: 'Character 2', image: require('../../assets/images/character2.png') },
  { id: 3, name: 'Character 3', image: require('../../assets/images/character3.png') },
  // Add more characters as needed
];

const Lobby = () => {
  const navigation = useNavigation();
  const account = useActiveAccount();
  const { disconnect } = useDisconnect();
  const activeWallet = useActiveWallet();

  const handleCharacterSelect = (characterId: number) => {
    // Implement character selection logic here if needed
  };

  const handleProfileCreate = () => {
    // Navigate to "(tabs)/singingZone"
    console.log('clicked')
navigation.navigate('(tabs)/singingZone');
  };

  const handleDisconnect = () => {
    if (activeWallet) {
      disconnect(activeWallet);
    }
    navigation.goBack(); // Navigate back to previous screen or handle navigation as needed
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.addressText}>
          {account && (
            <ThemedText type="defaultSemiBold">{shortenAddress(account.address)}</ThemedText>
          )}
        </ThemedText>
        {account ? (
          <Pressable style={styles.disconnectButton} onPress={handleDisconnect}>
            <ThemedText style={styles.buttonText}>Disconnect</ThemedText>
          </Pressable>
        ) : null}
        <View style={styles.characterContainer}>
          {characters.map((character) => (
            <Pressable
              key={character.id}
              style={styles.characterButton}
              onPress={() => handleCharacterSelect(character.id)}
            >
              <ThemedText>{character.name}</ThemedText>
              <Image source={character.image} style={styles.characterImage} />
            </Pressable>
          ))}
        </View>
        <Pressable style={styles.createButton} onPress={handleProfileCreate}>
          <ThemedText style={styles.buttonText}>Create Profile</ThemedText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  addressText: {
    marginBottom: 20,
  },
  characterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  characterButton: {
    padding: 10,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  characterImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  disconnectButton: {
    backgroundColor: '#FF3B30', // Red color for disconnect button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  createButton: {
    backgroundColor: 'blue', // Blue color for create button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
});

export default Lobby;
