import React from "react";
import { SafeAreaView, Text, View, FlatList, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import localData from "../../localPlaceholderData";

const PartOne = () => {
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <AntDesign name="caretcircleoup" size={30} style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={[styles.itemText, styles.boldText]}>{item.id}</Text>
                <Text style={styles.itemText}>{item.title}</Text>
            </View>
            <AntDesign name="right" size={24} style={styles.chevron} />
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={localData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    textContainer: {
        flex: 1,
        maxWidth: '50%',
    },
    itemText: {
        fontSize: 14,
    },
    boldText: {
        fontWeight: 'bold',
    },
    icon: {
        marginRight: 5,
    },
    chevron: {
        marginLeft: 'auto',
    },
});

export default PartOne;
