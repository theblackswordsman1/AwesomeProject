import React, {useState} from 'react';
import {Alert, Button, StyleSheet, TextInput, View} from "react-native";
import { addStudent } from '../../firebase/firebaseServices';

const AddStudentScreen = ({ navigation }) => {
    const [studentID, setStudentID] = useState('');
    const [fName, setFName] = useState('');
    const [sName, setSName] = useState('');
    const [DOB, setDOB] = useState('');

    const handleAddStudentPress = async () => {
        if (studentID === '' || fName === '' || sName === '' || DOB === '') {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            const result = await addStudent(studentID, fName, sName, DOB);
            if (result.success) {
                Alert.alert('Success', 'Student has been added');
                setStudentID('');
                setFName('');
                setSName('');
                setDOB('');
                navigation.goBack();
            }
        } catch (error) {
            console.error("Error adding student: ", error);
            Alert.alert('Error', 'There was an error adding the student');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Student ID"
                value={studentID}
                onChangeText={setStudentID}
            />
            <TextInput
                style={styles.input}
                placeholder="Student First Name"
                value={fName}
                onChangeText={setFName}
            />
            <TextInput
                style={styles.input}
                placeholder="Student Last Name"
                value={sName}
                onChangeText={setSName}
            />
            <TextInput
                style={styles.input}
                placeholder="Date of Birth (YYYY-MM-DD)"
                value={DOB}
                onChangeText={setDOB}
            />
            <Button
                title="Add Student"
                onPress={handleAddStudentPress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
});

export default AddStudentScreen;
