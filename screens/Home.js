import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTheme } from "../context/UseTheme";
import Styles from '../Styles';
import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../context/UseStateValue';

export default function Home() {
    const navigation = useNavigation();
    const { isDarkMode } = useTheme();
    const { resetPoints } = useStateValue();

    const handleStartGame = () => {
        // Nollaa pisteet ennen pelin aloittamista
        resetPoints();
        navigation.navigate('GameSet');
    };

    return (
        <View style={[Styles.container, isDarkMode ? Styles.dark : Styles.light, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={[isDarkMode ? Styles.dark : Styles.light, { fontSize: 34, marginBottom: 200 }]}>Music Quiz!</Text>
            <View style={{ marginBottom: 20 }}>
                <Button
                    title="Aloita peli"
                    onPress={handleStartGame}
                    style={{ fontSize: 20 }} 
                />
            </View>
        </View>
    )
}
