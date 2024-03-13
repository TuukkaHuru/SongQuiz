import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation , useRoute } from '@react-navigation/native';
import { useTheme } from "../context/UseTheme";
import Styles from '../Styles';


export default function GameOver() {
    const navigation = useNavigation();
    const route = useRoute();
    const { isDarkMode } = useTheme();

    const {totalPoints} =  route.params;

    const handleGoHome = () => {
        
       
        navigation.navigate('Home');
      };

    return (
        <View style={[Styles.container, isDarkMode ? Styles.dark : Styles.light, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={[isDarkMode ? Styles.dark : Styles.light, { fontSize: 20 }]}>Peli päättyi!</Text>
            <Text style={[isDarkMode ? Styles.dark : Styles.light, { fontSize: 20 }]}>Kokonaispistemäärä: {totalPoints}</Text>
             <Button title="Palaa Etusivulle" onPress={handleGoHome} />
        </View>
    );
}
