import React, {useState} from 'react';
import {Alert, Button, StyleSheet, TextInput, View} from "react-native";
import { addCourse } from '../../firebase/firebaseServices';

const AddCourseScreen = ({ navigation }) => {
    const [courseID, setCourseID] = useState('');
    const [courseName, setCourseName] = useState('');

    const handleAddCoursePress = async () => {
        if (courseID === '' || courseName === '') {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            const result = await addCourse(courseID, courseName);
            if (result.success) {
                Alert.alert('Success', 'Course has been added');
                setCourseID('');
                setCourseName('');
                navigation.goBack();
            }
        } catch (error) {
            console.error("Error adding course: ", error);
            Alert.alert('Error', 'There was an error adding the course');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Course ID"
                value={courseID}
                onChangeText={setCourseID}
            />
            <TextInput
                style={styles.input}
                placeholder="Course Name"
                value={courseName}
                onChangeText={setCourseName}
            />
            <Button
                title="Add Course"
                onPress={handleAddCoursePress}
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

export default AddCourseScreen;
