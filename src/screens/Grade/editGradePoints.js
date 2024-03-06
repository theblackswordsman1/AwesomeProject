import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChangeGradePoints } from '../../firebase/firebaseServices';

const EditGradePoints = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { AttendingStudent } = route.params;

    const [points, setPoints] = useState(AttendingStudent.Points);
    const [grade, setGrade] = useState(AttendingStudent.Grade);

    const saveChanges = async () => {
        try {
            const response = await ChangeGradePoints(AttendingStudent.CourseID, AttendingStudent.StudentID, points, grade);
            if (response.success) {
                Alert.alert("Success", "Student's grade and points have been updated.");
                navigation.goBack();
            }
        } catch (error) {
            console.error("Error updating student's grade and points: ", error);
            Alert.alert("Error", "Failed to update student's grade and points.");
        }
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: (AttendingStudent.CourseID.toString() + " - " + AttendingStudent.FName.toString()) + " " + AttendingStudent.SName.toString()
        });
    }, [navigation, AttendingStudent]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.label}>Student Points:</Text>
                <TextInput
                    style={styles.input}
                    value={points}
                    onChangeText={setPoints}
                    keyboardType="numeric"
                />
                <Text style={styles.label}>Student Grade:</Text>
                <TextInput
                    style={styles.input}
                    value={grade}
                    onChangeText={setGrade}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Save Changes" onPress={saveChanges} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        padding: 20,
    },
});

export default EditGradePoints;
