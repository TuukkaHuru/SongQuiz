import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from "../context/UseTheme";
import Styles from '../Styles';
import { useStateValue } from '../context/UseStateValue';

export default function Result() {
    const route = useRoute();
    const navigation = useNavigation();
    const { isDarkMode } = useTheme();
    const { totalPoints, incrementPoints } = useStateValue(); // Käytetään tilan kontekstin hookia
   

    // Oikea vastaus
    const { correctSong, correctArtist } = route.params;
    const { userSong, userArtist } = route.params;
    const { gameOverPoints } = route.params;
    
     // Tilanne, onko käyttäjä saavuttanut gameover-pistemäärän
     const [gameOverReached, setGameOverReached] = useState(false);
     // Tilanne, onko pisteet laskettu
    const [pointsCalculated, setPointsCalculated] = useState(false);

    const [roundPoints, setRoundPoints] = useState(0);

    useEffect(() => {
        let points = 0;
        if (correctSong.toLowerCase() === userSong.toLowerCase()) {
            points += 2;
        }
        if (correctArtist.toLowerCase() === userArtist.toLowerCase()) {
            points += 1;
        }

        setRoundPoints(points);
        incrementPoints(points); // Lisätään pisteet
        setPointsCalculated(true); // Merkitään pisteet lasketuksi
    }, []);
   
    useEffect(() => {
        if (totalPoints >= gameOverPoints) {
            setGameOverReached(true);
        }
    }, [totalPoints, gameOverPoints]);

    const handleNextPress = () => {
        if (gameOverReached) {
            navigation.navigate('GameOver', { totalPoints, gameOverPoints });
        } else {
            navigation.navigate('Game', { gameOverPoints, totalPoints });
        }
    };

    return (
        <View style={[Styles.container, isDarkMode ? Styles.dark : Styles.light, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={[isDarkMode ? Styles.dark : Styles.light, { fontSize: 20,  }]}>Oikea vastaus:</Text>
            <Text style={[isDarkMode ? Styles.dark : Styles.light, { fontSize: 20,  }]}>Biisi: {correctSong}</Text>
            <Text style={[isDarkMode ? Styles.dark : Styles.light, { fontSize: 20,  }]}>Artisti: {correctArtist}</Text>
            <Text style={[isDarkMode ? Styles.dark : Styles.light, { fontSize: 20,  }]}>Sait {roundPoints} pistettä!</Text>
            <Text style={[isDarkMode ? Styles.dark : Styles.light, { fontSize: 20,  }]}>kokonaispistemäärä {totalPoints}!</Text>
            <Button
                title="Seuraava"
                onPress={handleNextPress}
            />
            
        </View>
    );
}
