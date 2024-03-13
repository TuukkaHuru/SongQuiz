import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation , useRoute } from '@react-navigation/native';
import axios from 'axios'; 
import { useTheme } from "../context/UseTheme";
import Styles from '../Styles';

export default function Game() {
  const navigation = useNavigation();
  const route = useRoute(); 
  const { isDarkMode } = useTheme();

  const [timeLeft, setTimeLeft] = useState(30);
  const [timerRunning, setTimerRunning] = useState(true);
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [userSong, setUserSong] = useState('');
  const [userArtist, setUserArtist] = useState('');
  const { gameOverPoints } = route.params;
  
  

  

  useEffect(() => {
    // Haetaan satunnainen kappale API:sta
    const fetchRandomSong = async () => {
      try {
        const response = await axios.get('API_ENDPOINT_URL'); // Vaihda API_ENDPOINT_URL oikeaan URL:iin
        const { song, artist } = response.data; // Oletetaan että API palauttaa kappaleen nimen ja artistin
        setSongName(song);
        setArtistName(artist);
      } catch (error) {
        console.error('Error fetching random song:', error);
      }
    };

    fetchRandomSong();
  }, []); // Tyhjä taulukko varmistaa, että useEffect suoritetaan vain kerran, kun komponentti on ladattu

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      navigation.navigate('Result', { 
        correctSong: songName, 
        correctArtist: artistName,
        userSong,
        userArtist,
        gameOverPoints,
        
      });
    }
  }, [timerRunning, timeLeft, navigation, songName, artistName]);

  const handleButtonPress = () => {
    
    // Välitetään käyttäjän antamat arvaukset Result-komponentille
    navigation.navigate('Result', { 
      correctSong: songName, 
      correctArtist: artistName,
      userSong,
      userArtist,
      gameOverPoints,
      
      
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTimeLeft(30);
      setTimerRunning(true);
      setSongName('');
      setArtistName('');
      setUserSong('');
      setUserArtist('');
    });

    return unsubscribe;
  }, [navigation]);


  return (
    <View style={[Styles.container, isDarkMode ? Styles.dark : Styles.light, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={[isDarkMode ? Styles.dark : Styles.light, { fontSize: 34, marginBottom: 200 }]}>Aikaa jäljellä: {timeLeft} s</Text>
      <TextInput
    placeholder="Kirjoita biisin nimi"
    value={userSong}
    onChangeText={setUserSong}
    style={[isDarkMode ? Styles.dark : Styles.light, { fontSize: 20 }]}
    placeholderTextColor={isDarkMode ? 'white' : 'black'}
/>
<TextInput
    placeholder="Kirjoita artisti"
    value={userArtist}
    onChangeText={setUserArtist}
    style={[isDarkMode ? Styles.dark : Styles.light, { fontSize: 20 }]}
    placeholderTextColor={isDarkMode ? 'white' : 'black'}
/>

      <Button title="Submit" onPress={handleButtonPress} />
      
    </View>
  );
}
