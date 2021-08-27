import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import mainHeader from '../Components/mainHeader';
import { IAppState } from '../Redux/Store';
import { VGame } from '../models/Videogame';


const MainScreen = () => {
    const games = useSelector((state: IAppState) => state.VGames);
    const [selected, setSelected] = useState<VGame>()
    const [open, setModalOpen] = useState(false);
    const navigator = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type:'UPDATE_LIST'
        })
    }, [])
    const viewGame = (gameName: string) =>
    {
        dispatch({
            type: 'RETRIEVE_GAME',
            payload: {
                gameName
            }
        });
        navigator.navigate('EditGame');
    }

    const confirmDelete = (item: VGame) =>
    {
        setSelected(item);
        setModalOpen(true);

    }

    const deleteGame = () =>
    {
        dispatch({
            type: "DELETE_GAME",
            payload: {
                game:selected
            }
        })
    }
    
    return (
        <>
        <View style={styles.container}>
            <FlatList
                data={games}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => viewGame(item.gameNAME)}>

                    <View style={styles.item}>
                            <Text style={styles.itemNameText}>{item.gameNAME}</Text>
                            <View style={styles.delete}>
                                <TouchableOpacity onPress={()=>confirmDelete(item)}>
                                    <AntDesign name="closecircle" size={24} color="black" />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.itemText}>Genra: {item.GENRA}</Text>
                            <Text style={styles.itemText}>{item.gameSYSTEM.map((sys) => sys + ', ')}</Text>
                    </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => '' + item.ID}
                ListHeaderComponent={mainHeader}
            >

            </FlatList>
            </View>
            <View style={styles.modal}>
                <Modal
                    animationType='fade'
                    transparent={false}
                    visible={open}
                    >
                    <View style={styles.modal}>
                        <Text>Are you sure you want to delete {selected?.gameNAME}</Text>
                        <View style={{flexDirection:'row'}}>
                        <TouchableOpacity>
                            <Text>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>setModalOpen(false)}>
                            <Text>No</Text>
                        </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
                    
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: '5%',
        marginTop: '10%'
    },
    item: {
        borderWidth:1,
        borderRadius: 10,
        padding: '5%',
        margin:'2%'
    },
    itemNameText: {
        fontSize: 24
    },
    itemText: {
        fontSize: 16
    },
    delete: {
        alignSelf: 'flex-end',
        position: 'absolute',
        margin: '1%'
    },
    modal: {
        flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    }
});

export default MainScreen;