import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import {fetchAttendingStudents} from '../../firebase/firebaseServices';

const AttendingStudents = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { courseID } = route.params;
    const [attendingStudents, setAttendingStudents] = useState([]);

    const getAttendingStudents = async ( ) => {
        try {
            const attendingStudentsArray = await fetchAttendingStudents( courseID );
            setAttendingStudents(attendingStudentsArray);
        } catch (error) {
            console.error("Error fetching attending students: ", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getAttendingStudents();
        }, [])
    );

    return (
        <>
            <FlatList
            data={attendingStudents}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => navigation.navigate('EditGradePoints', { AttendingStudent: item })}
                >
                    <Text style={styles.title}>{item.FName + " " + item.SName}</Text>
                </TouchableOpacity>
            )}
        />
            <Button
                title="Add Student To Course"
                onPress={() => navigation.navigate('AddStudentToCourse', { courseID })}
            />
        </>
    );

};

const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    title: {
        fontSize: 18,
    },
    button: {

    }
});

export default AttendingStudents;