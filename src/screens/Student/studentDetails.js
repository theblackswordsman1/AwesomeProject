import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { changeStudent, deleteStudent } from '../../firebase/firebaseServices';

const StudentDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { student } = route.params;

    const [fName, setFName] = useState(student.FName);
    const [sName, setSName] = useState(student.SName);
    const [dob, setDob] = useState(student.DOB);

    const [isEditMode, setIsEditMode] = useState(false);
    const toggleEditMode = () => setIsEditMode(!isEditMode);

    const saveProfileChanges = async () => {
        try {
            const response = await changeStudent(student.StudentID, fName, sName, dob);
            if (response.success) {
                Alert.alert("Success", "Student's details are updated.");
                navigation.goBack();
            }
        } catch (error) {
            console.error("Error updating student details: ", error);
            Alert.alert("Error", "Failed to update student details.");
        }
    };
    const removeProfile = async () => {
        try {
            const response = await deleteStudent(student.StudentID);
            if (response.success) {
                Alert.alert("Success", "Student is removed.");
                navigation.goBack();
            }
        } catch (error) {
            console.error("Error removing student: ", error);
            Alert.alert("Error", "Failed to remove student.");
        }
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: ("Student details")
        });
    }, [navigation, student]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.label}>{"StudentID: " + student.StudentID}</Text>
                <Text style={styles.label}>Student first name:</Text>
                {isEditMode ? (
                    <TextInput
                        style={styles.input}
                        value={fName}
                        onChangeText={setFName}
                    />
                ) : (
                    <Text style={styles.text}>{fName}</Text>
                )}
                <Text style={styles.label}>Student last name:</Text>
                {isEditMode ? (
                    <TextInput
                        style={styles.input}
                        value={sName}
                        onChangeText={setSName}
                    />
                ) : (
                    <Text style={styles.text}>{sName}</Text>
                )}
                <Text style={styles.label}>Student date of birth:</Text>
                {isEditMode ? (
                    <TextInput
                        style={styles.input}
                        value={dob}
                        onChangeText={setDob}
                    />
                ) : (
                    <Text style={styles.text}>{dob}</Text>
                )}
            </View>
            {isEditMode ? (
                <View style={styles.buttonContainer}>
                    <Button title="Delete Student" color={'red'} onPress={removeProfile} />
                    <Button title="Save Changes" onPress={saveProfileChanges} />
                </View>
            ) : (
                <View style={styles.buttonContainer}>
                    <Button title="Edit" onPress={toggleEditMode} />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'top',
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
    buttonContainer: {
        padding: 20,
    },
});

export default StudentDetails;