import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { searchStudents, StudentToCourse } from '../../firebase/firebaseServices';

const AddStudentToCourse = () => {
    const route = useRoute();
    const { courseID } = route.params;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);

    const getStudents = async () => {
        // Only fetch data if at least one search parameter is provided
        if (firstName.trim() === '' && lastName.trim() === '' && studentId.trim() === '') {
            Alert.alert('Error', 'Please enter at least one search criteria');
            setFilteredStudents([]);
            return;
        }
        try {
            const allStudents = await searchStudents(firstName, lastName, studentId);
            if (allStudents.length === 0) {
                // Handle case where search returns no results
                Alert.alert('No Results', 'No students found matching the search criteria.');
            }
            setFilteredStudents(allStudents);
        } catch (error) {
            console.error("Error fetching students: ", error);
            Alert.alert('Error', 'Failed to fetch students');
        }
    };

    return (
        <>
            <TextInput
                style={styles.searchBar}
                placeholder="First Name"
                value={firstName}
                onChangeText={text => setFirstName(text)} // Update firstName as user types
            />
            <TextInput
                style={styles.searchBar}
                placeholder="Last Name"
                value={lastName}
                onChangeText={text => setLastName(text)} // Update lastName as user types
            />
            <TextInput
                style={styles.searchBar}
                placeholder="Student ID"
                value={studentId}
                onChangeText={text => setStudentId(text)} // Update studentId as user types
            />
            <Button
                title="Search"
                onPress={getStudents} // Function to be called when the button is pressed
            />
            <FlatList
                data={filteredStudents}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            console.log("Adding to course:", courseID, "Student ID:", item.id, "First Name:", item.FName, "Last Name:", item.SName);
                            Alert.alert(
                                "Confirmation",
                                "Do you want to add the student to the course?",
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                    },
                                    {
                                        text: "Yes", onPress: () => StudentToCourse(courseID, item.id, item.FName, item.SName) }
                                ],
                                { cancelable: false }
                            );
                        }}
                    >
                        <Text style={styles.title}>{item.FName + " " + item.SName}</Text>
                    </TouchableOpacity>
                )}
            />
        </>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        margin: 10,
        padding: 10,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 5,
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    title: {
        fontSize: 18,
    },
});

export default AddStudentToCourse;
