import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {fetchStudents} from "../../firebase/firebaseServices";
import {useState, useCallback} from "react";

function Students() {
    const navigation = useNavigation();
    const [students, setStudents] = useState([]);

    const getStudents = async () => {
        try {
            const studentsArray = await fetchStudents();
            setStudents(studentsArray);
        } catch (error) {
            console.error("Error fetching students: ", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getStudents();
        }, [])
    );

    return (
        <>
            <FlatList
                data={students}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => navigation.navigate('StudentDetails', { student: item })}
                    >
                        <Text style={styles.title}>{item.FName + " " + item.SName}</Text>
                    </TouchableOpacity>
                )}
            />
            <Button
                title="Add Student"
                onPress={() => navigation.navigate('AddStudentScreen')}
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

export default Students;