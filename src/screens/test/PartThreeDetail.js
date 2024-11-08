import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, FlatList, StyleSheet, Button, ActivityIndicator } from "react-native";
import hstkFetch from "../../hstkFetch";
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PartThreeDetail = () => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hiddenComments, setHiddenComments] = useState([]);
    const route = useRoute();

    const { id } = route.params;

    useEffect(() => {
        hstkFetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => response.json())
            .then(data => {
                setPost(data);
                setLoading(false);
            });

        hstkFetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
            .then(response => response.json())
            .then(data => {
                setComments(data);
            });

        const loadHiddenComments = async () => {
            const storedHiddenComments = await AsyncStorage.getItem('hiddenComments');
            if (storedHiddenComments) {
                setHiddenComments(JSON.parse(storedHiddenComments));
            }
        };

        loadHiddenComments();
    }, [id]);

    const hideComment = async (commentId) => {
        const updatedHiddenComments = [...hiddenComments, commentId];
        setHiddenComments(updatedHiddenComments);
        await AsyncStorage.setItem('hiddenComments', JSON.stringify(updatedHiddenComments));
    };

    const renderComment = ({ item }) => {
        if (hiddenComments.includes(item.id)) return null;
        return (
            <View style={styles.commentContainer}>
                <Text style={styles.commentEmail}>{item.email}</Text>
                <Text style={styles.commentBody}>{item.body}</Text>
                <Button title="Hide Comment" onPress={() => hideComment(item.id)} />
            </View>
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#000000" />;
    }

    return (
        <SafeAreaView style={styles.container}>
            {post && (
                <>
                    <Text style={styles.title}>{post.title}</Text>
                    <Text style={styles.body}>{post.body}</Text>
                </>
            )}

            <FlatList
                data={comments}
                renderItem={renderComment}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={<Text>No comments available.</Text>}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    body: {
        fontSize: 16,
        marginVertical: 10,
    },
    commentContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    commentEmail: {
        fontWeight: 'bold',
    },
    commentBody: {
        fontSize: 14,
        marginVertical: 4,
    },
});

export default PartThreeDetail;
