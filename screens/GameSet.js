import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, useRoute  } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { useTheme } from "../context/UseTheme";
import Styles from '../Styles';

export default function GameSet() {
    const navigation = useNavigation();
    const [gameOverPoints, setGameOverPoints] = useState(30); // Oletusarvo 30 pistettä
    const { isDarkMode } = useTheme();

    const handleSliderChange = (value) => {
        setGameOverPoints(value);
    };

    const handleButtonPress = () => {
        // Tässä voit välittää valitun pistemäärän eteenpäin sovelluksessa tarvittavalla tavalla
        console.log("Valittu pistemäärä:", gameOverPoints); // Tulosta valittu pistemäärä
        navigation.navigate('Game', { gameOverPoints }); // Välitetään valitut pisteet Game-komponentille
    };

    return (
        <View style={[Styles.container, isDarkMode ? Styles.dark : Styles.light, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={[isDarkMode ? Styles.dark : Styles.light, { fontSize: 34 }]}>Valitse monestako pisteestä peli on poikki:</Text>
            <Text style={[isDarkMode ? Styles.dark : Styles.light, { fontSize: 34 }]}>{gameOverPoints}</Text>
            <Slider
                style={{ width: '100%', height: 40, marginTop: 20 }}
                minimumValue={10}
                maximumValue={100}
                step={1}
                value={gameOverPoints}
                onValueChange={handleSliderChange}
            />
            <View style={{ marginTop: 20 }}>
                <Button
                    title="Valmis"
                    onPress={handleButtonPress}
                />
            </View>
        </View>
    );
}
