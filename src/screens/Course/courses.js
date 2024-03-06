import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchCourses } from '../../firebase/firebaseServices'; // Ensure this path is correct

const Courses = () => {
    const navigation = useNavigation();
    const [courses, setCourses] = useState([]);

    const getCourses = async () => {
        try {
            const coursesArray = await fetchCourses();
            setCourses(coursesArray);
        } catch (error) {
            console.error("Error fetching courses: ", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getCourses();
        }, [])
    );

    return (
        <>
            <FlatList
                data={courses}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => navigation.navigate('CourseAdministration', { course: item })}
                    >
                        <Text style={styles.title}>{item.CourseID}</Text>
                    </TouchableOpacity>
                )}
            />
            <Button
                title="Add Course"
                onPress={() => navigation.navigate('AddCourseScreen')}
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
});

export default Courses;
