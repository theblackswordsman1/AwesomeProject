import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { fetchGradesPointsForCourse } from '../../firebase/firebaseServices';

const screenWidth = Dimensions.get('window').width;

const CourseChartScreen = ({ route }) => {
    const { courseID } = route.params;
    const [gradeData, setGradeData] = useState({
        labels: [],
        datasets: [{ data: [] }],
    });
    const [averageGrade, setAverageGrade] = useState('');
    const [averagePoints, setAveragePoints] = useState(0);

    useEffect(() => {
        const fetchGrades = async () => {
            const gradeCounts = { 'F': 0, 'D': 0, 'C': 0, 'B': 0, 'A': 0 };
            const gradesArray = await fetchGradesPointsForCourse(courseID);
            let totalPoints = 0;
            let totalGradePoints = 0; // Sum of grade points for calculating GPA

            gradesArray.forEach(doc => {
                if (gradeCounts.hasOwnProperty(doc.Grade)) {
                    gradeCounts[doc.Grade] += 1;
                    totalPoints += parseFloat(doc.Points); // Convert string to float
                    // Map the grade to its grade point value and add to totalGradePoints
                    const gradePoint = mapGradeToPoint(doc.Grade);
                    totalGradePoints += gradePoint;
                }
            });

            const totalStudents = gradesArray.length;
            const averagePoints = totalPoints / totalStudents;
            const averageGPA = totalGradePoints / totalStudents;

            // Calculate the average grade based on average GPA
            const averageGrade = mapGPAToGrade(averageGPA);

            setGradeData({
                labels: Object.keys(gradeCounts),
                datasets: [{ data: Object.values(gradeCounts) }],
            });

            setAveragePoints(averagePoints.toFixed(2));
            setAverageGrade(averageGrade);
        };

        fetchGrades();
    }, [courseID]);

// Helper function to map a grade to its grade point
    function mapGradeToPoint(grade) {
        const gradePoints = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };
        return gradePoints[grade] || 0;
    }

// Helper function to map GPA to the closest grade
    function mapGPAToGrade(gpa) {
        if (gpa >= 3.5) return 'A';
        if (gpa >= 2.5) return 'B';
        if (gpa >= 1.5) return 'C';
        if (gpa >= 0.5) return 'D';
        return 'F';
    }



    return (
        <View style={styles.container}>
            <Text style={styles.chartTitle}>Grades Chart for Course {courseID}</Text>
            <BarChart
                data={gradeData}
                width={screenWidth}
                height={220}
                yAxisLabel=""
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#f1f8ff',
                    decimalPlaces: 0,
                    color: () => `rgba(0, 0, 0, 1)`,
                    labelColor: () => `rgba(0, 0, 0, 1)`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForBackgroundLines: {
                        strokeDasharray: '',
                        stroke: '#e3e3e3',
                    },
                    propsForLabels: {
                        fontFamily: 'HelveticaNeue',
                        fontSize: 12,
                    },
                }}
                fromZero={true}
                showBarTops={true}
                showValuesOnTopOfBars={true}
            />
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Average Grade & Points</Text>
                <Text style={styles.summaryText}>Average Grade: {averageGrade}</Text>
                <Text style={styles.summaryText}>Average Points: {averagePoints}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    summaryContainer: {
        marginTop: 24,
        padding: 16,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#f0f0f0', // Light grey background for the summary
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    summaryText: {
        fontSize: 14,
        fontWeight: '400',
    },
});

export default CourseChartScreen;
