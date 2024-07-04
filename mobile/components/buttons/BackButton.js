import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {
    const navigation = useNavigation();
    return (
        <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()} // Navegar hacia atrás
        >
            <AntDesign name="arrowleft" size={24} color="black" selectable={undefined} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    backButton: {
        padding: 10,
        paddingHorizontal: 16,
    },
});
