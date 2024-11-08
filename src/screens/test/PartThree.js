import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, FlatList, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import hstkFetch from "../../hstkFetch";
import { useNavigation } from '@react-navigation/native';

const PartThree = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        hstkFetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setFilteredPosts(data);
                setLoading(false);
            });
    }, []);

    const handleSearch = (text) => {
        setSearchText(text);
        if (text === "") {
            setFilteredPosts(posts);
        } else {
            const filteredData = posts.filter((post) =>
                post.title.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredPosts(filteredData);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('part-three-detail', { id: item.id })}
        >
            <AntDesign name="caretcircleoup" size={30} style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={[styles.itemText, styles.boldText]}>{item.id}</Text>
                <Text style={styles.itemText}>{item.title}</Text>
            </View>
            <AntDesign name="right" size={24} style={styles.chevron} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading ? (
                <ActivityIndicator size="large" color="#000000" style={styles.loader} />
            ) : (
                <>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by title"
                        value={searchText}
                        onChangeText={handleSearch}
                    />
                    {filteredPosts.length === 0 ? (
                        <Text style={styles.noResults}>No Results</Text>
                    ) : (
                        <FlatList
                            data={filteredPosts}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            contentContainerStyle={styles.listContainer}
                        />
                    )}
                </>
            )}
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
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    searchInput: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        margin: 12,
        paddingLeft: 10,
        borderRadius: 8,
    },
    noResults: {
        textAlign: "center",
        fontSize: 16,
        color: "red",
        marginTop: 20,
    },
    listContainer: {
        flexGrow: 1,
    },
});

export default PartThree;
