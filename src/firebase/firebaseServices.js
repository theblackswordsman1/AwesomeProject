// src/firebase/firebaseServices.js
import {collection, doc, getDocs, setDoc, where, query, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const fetchCourses = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "Courses"));
        const coursesArray = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return coursesArray;
    } catch (error) {
        console.error("Error fetching courses: ", error);
        throw new Error(error);
    }
};

export const addCourse = async (courseID, courseName) => {
    try {
        await setDoc(doc(db, 'Courses', courseID), {
            CourseID: courseID,
            CourseName: courseName
        });
        return { success: true };
    } catch (error) {
        console.error("Error adding course: ", error);
        throw error;
    }
};


export const fetchStudents = async ()  => {
    try {
        const querySnapshot = await getDocs(collection(db, "Students"));
        const studentsArray = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return studentsArray;
    } catch (error) {
        console.error("Error fetching courses: ", error);
        throw new Error(error);
    }
};


export const addStudent = async (studentID, fName, sName, DOB) => {
    try {
        await setDoc(doc(db, 'Students', studentID), {
            StudentID: studentID,
            FName: fName,
            SName: sName,
            DOB: DOB
        });
        return { success: true };
    } catch (error) {
        console.error("Error adding student: ", error);
        throw error;
    }
};


export const fetchAttendingStudents = async ( courseID ) => {
    try {
        const gradesQuery = query(collection(db, "Grades"), where("CourseID", "==", courseID));

        const querySnapshot = await getDocs(gradesQuery);
        const attendingStudentsArray = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return attendingStudentsArray;
    } catch (error) {
        console.error("Error fetching Attending students: ", error);
        throw new Error(error);
    }
};

export const searchStudents = async (firstName, lastName, studentId) => {
    try {
        let allMatches = [];

        const snapshots = [];

        if (firstName) {
            const queryByFirstName = query(collection(db, "Students"), where("FName", "==", firstName));
            snapshots.push(await getDocs(queryByFirstName));
        }
        if (lastName) {
            const queryByLastName = query(collection(db, "Students"), where("SName", "==", lastName));
            snapshots.push(await getDocs(queryByLastName));
        }
        if (studentId) {
            const queryByStudentId = query(collection(db, "Students"), where("StudentID", "==", studentId));
            snapshots.push(await getDocs(queryByStudentId));
        }

        snapshots.forEach(snapshot => {
            snapshot.forEach(doc => {
                if (!allMatches.some(match => match.id === doc.id)) {
                    allMatches.push({ id: doc.id, ...doc.data() });
                }
            });
        });

        return allMatches;
    } catch (error) {
        console.error("Error fetching students: ", error);
        throw new Error(error.message);
    }
};

export const StudentToCourse = async ( courseID, studentID, FName, SName) => {
    try {
        // Combine courseID and studentID to form the document ID
        const documentId = `${courseID}_${studentID}`;

        // Create or update the document with the combined ID in the 'Grades' collection
        await setDoc(doc(db, 'Grades', documentId), {
            CourseID: courseID,
            StudentID: studentID,
            FName: FName,
            SName: SName,
            Points: "Not set",
            Grade: "Not set"
        });

        return { success: true };
    } catch (error) {
        console.error("Error adding student to course: ", error);
        throw error;
    }
};

export const ChangeGradePoints = async (courseID, studentID, points, grade) => {
    try {
        // Combine courseID and studentID to form the document ID
        const documentId = `${courseID}_${studentID}`;

        await setDoc(doc(db, 'Grades', documentId), {
            Points: points,
            Grade: grade
        }, { merge: true });

        return { success: true };
    } catch (error) {
        console.error("Error updating student's grade and points: ", error);
        throw error; // Propagate the error to be handled by the caller
    }
};

export const changeStudent = async (studentID, fName, sName, DOB) => {
    try {

        const documentId = `${studentID}`;

        await setDoc(doc(db, 'Students', documentId), {
            FName: fName,
            SName: sName,
            DOB: DOB
        }, { merge: true });

        return { success: true };
    } catch (error) {
        console.error("Error updating student: ", error);
        throw error;
    }
};

export const deleteStudent = async (studentID) => {
    try {
        const documentId = `${studentID}`;

        // Use deleteDoc to delete the document
        await deleteDoc(doc(db, 'Students', documentId));

        return { success: true };
    } catch (error) {
        console.error("Error deleting student: ", error);
        throw error;
    }
};

export const fetchGradesPointsForCourse = async ( courseID ) => {
    try {
        // Create a query against the collection, filtering by CourseID
        const gradesQuery = query(collection(db, "Grades"), where("CourseID", "==", courseID));

        const querySnapshot = await getDocs(gradesQuery);
        const gradesArray = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return gradesArray;
    } catch (error) {
        console.error("Error fetching Attending students: ", error);
        throw new Error(error);
    }
};