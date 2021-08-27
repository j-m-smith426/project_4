import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { useDispatch, useSelector } from 'react-redux';
import { VGame } from '../models/Videogame';
import { IAppState } from '../Redux/Store';

const systems = [
    {
        id:'0',
        name: 'PC'
    },
    {
        id:'1',
        name: 'Stadia'
    },
    {
        id:'2',
        name: 'PS3'
    },
    {
        id:'3',
        name: 'PS4'
    },
    {
        id:'4',
        name: 'PS5'
    },
    {
        id:'5',
        name: 'XBox'
    },
    {
        id:'6',
        name: 'Switch'
    },
    {
        id:'7',
        name: '3DS'
    },
    {
        id:'8',
        name: 'DS'
    },
    {
        id:'9',
        name: 'GameCube'
    },
    {
        id:'10',
        name: 'TableTop'
    },
]
const EditScreen = () =>
{
    const game: VGame = useSelector((state: IAppState) => state.VGame)
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [gameName, setGameName] = useState('');
    const [genre, setGenre] = useState('');
    const [selected, setSelected] = useState<any[]>([]);
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const navigator = useNavigation();
    
    useEffect(() =>
    {
        setloading(true);
        console.log('Current game:', game)
        console.log()
        getSys();
        setIsChecked(Boolean(game.Multiplayer));
        setGameName(game.gameNAME);
        setGenre(game.GENRA)
        setloading(false);
    }, [game])
    const getSys = () =>
    {
        let nums = [];
    for (let i of game.gameSYSTEM) {
        for (let j of systems) {
            if (j.name === i) {
                nums.push(j.id);
            }
        }
    }
    nums.sort();
        setSelected(nums);
    }

    const submit = () =>
    {
        const newGame: VGame = {
            ID:0,
            gameNAME: gameName,
            GENRA: genre,
            gameSYSTEM: selected.map((index) => systems[index].name),
            Multiplayer: isChecked
        }
        if (gameName !== '' && genre !== '') {
            
            dispatch({
                type: 'UPDATE_GAME',
                payload: {
                    game: newGame
                }
            });
            navigator.goBack();
        } else {
            console.log('Invalid Inputs');
        }
    }

    if (loading) {
        return (
        <Text>Loading</Text>
    )
}
    return (
        <View style={{flex:1, backgroundColor:'grey'}}>
        <View style={styles.container}>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Name:</Text>
                <TextInput placeholder='Name' style={styles.inputField} value={gameName} onChangeText={setGameName} ></TextInput>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Genre</Text>
                <TextInput placeholder='Genre' style={styles.inputField} value={genre} onChangeText={setGenre}></TextInput>
            </View>

        {/* <KeyboardAvoidingView> */}
            <View style={styles.inputGroup}>
                <Text style={styles.multiselectLabel}> Systems </Text>
                <MultiSelect
                    items={systems}
                    uniqueKey="id"
                    onSelectedItemsChange={setSelected}
                    selectedItems={selected}
                    selectText="Select Systems"
                    searchInputPlaceholderText="Search Items..."
                    onChangeInput={(text) => console.log(text)}
                    tagRemoveIconColor="black"
                    tagBorderColor="black"
                    tagTextColor="black"
                    //styleRowList={{backgroundColor:'yellow'}}
                    selectedItemTextColor="blue"
                    selectedItemIconColor="blue"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{color: '#CCC', fontSize:16}}
                    submitButtonColor="#48d22b"
                    submitButtonText="Submit"
                    />
                
            </View>
                    {/* </KeyboardAvoidingView> */}
            <View style={styles.inputGroup}>

                <View style={styles.row}>
                    <Text style={styles.inputLabel}>Multiplayer</Text>
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? '#4630EB' : 'black'}
                        
                        />
                </View>
            
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={submit}>
                    <Text style={styles.inputLabel}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    
    </View>
                        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //height:'100%',
        margin: '2%',
        backgroundColor:'grey',
        //justifyContent:'space-evenly'
        
    },
    checkbox: {
        
    },
    button: {
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 100,
        padding: 5,
        backgroundColor: 'lightblue'
    },
    inputField: {
        backgroundColor: 'white',
        fontSize: 16,
        padding:'1%',
        marginVertical:'2%'
    },
    inputGroup: {
        //flex:1,
        borderWidth: 1,
        borderRadius:10,
        padding:'1%',
        marginVertical: '5%',
        backgroundColor: 'lightblue'

    },
    inputLabel: {
        fontSize: 20,
        marginVertical:'1%'
    },
    row: {
        
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    multiselectLabel: {
        marginVertical: '2%',
        fontSize:20,
    }
});

export default EditScreen;