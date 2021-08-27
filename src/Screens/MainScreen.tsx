import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import mainHeader from '../Components/mainHeader';
import { IAppState } from '../Redux/Store';
import { VGame } from '../models/Videogame';
import { Modal, Portal } from 'react-native-paper';


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
        console.log(selected);
        dispatch({
            type: "DELETE_GAME",
            payload: {
                gameName: selected?.gameNAME
            }
        });
        setModalOpen(false);
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
                            {Boolean(item.Multiplayer)&&<View style={styles.Multi}>
                                    <AntDesign name="addusergroup" size={24} color="black" />
                            </View>}
                    </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => '' + item.ID}
                ListHeaderComponent={mainHeader}
            >

            </FlatList>
            </View>
            <Portal>
                <Modal
                    visible={open}
                    onDismiss={() => setModalOpen(false)}
                    contentContainerStyle={styles.modal}
                    >
                    <View >
                        <Text style={styles.modalquestion}>Are you sure you want to delete {selected?.gameNAME}</Text>
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <TouchableOpacity style={styles.modalButton} onPress={deleteGame}>
                            <Text>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={()=>setModalOpen(false)}>
                            <Text>No</Text>
                        </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
                    
                </Portal>
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
    justifyContent: 'center',
    alignItems: 'center',
        margin: 22,
        padding: '10%',
    backgroundColor: 'white'
    },
    modalquestion: {
        fontSize:18
    },
    modalButton: {
        marginTop: '5%',
        marginHorizontal: '10%',
        backgroundColor: 'lightblue',
        padding: '5%',
        paddingHorizontal:'10%',
        borderWidth: 1,
        borderRadius:50
    },
    Multi: {
        //flexDirection: 'row',
        //position: 'absolute',
        alignSelf: 'flex-end',
        //marginTop: '25%'
    }
});

export default MainScreen;