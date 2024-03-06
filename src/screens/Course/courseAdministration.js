import React, { useLayoutEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import { useNavigation,  useRoute } from '@react-navigation/native';

const CourseAdministration = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { course } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: (course.id.toString() + " - " + course.CourseName.toString())
        });
    }, [navigation, course]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('AttendingStudents', { courseID: course.id })}
            >
                <Text style={styles.title}>Attending Students</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('CourseChart', { courseID: course.id })}
            >
                <Text style={styles.title}>Course Chart</Text>
            </TouchableOpacity>
        </View>
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
        position: 'bottom'
}
});

export default CourseAdministration;
