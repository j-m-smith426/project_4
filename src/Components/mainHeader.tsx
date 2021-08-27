import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const mainHeader = () =>
{
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.header}>VideoGames</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddGame')}>
            <View style={styles.button}>
                    <Text style={styles.buttonText}>Add a Game</Text>
            </View>
                </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: '2%'
    },
    header: {
        fontSize:26,
    },
    buttonText: {
        fontSize:18
    },
    button: {
        alignSelf:'flex-end',
        backgroundColor: 'lightblue',
        padding:10,
        borderRadius: 1000
    }
});

export default mainHeader;