import { IResolvers } from "@graphql-tools/utils";
import { database } from "../data/data.store";

const query : IResolvers = {
    Query: {
        students(): any {
            return database.students;
        },
        courses(): any {
            return database.courses;
        },
        course(__: void, {courseId}): any {
            const result = database.courses.filter(course => course.id == courseId)[0];
            if(result === undefined){
                return {
                    id: "-1",
                    title: "Undefined Title",
                    description: `No record found with the value: ${courseId}`,
                    classes: 0,
                    logo: "Undefined logo",
                    time: 0,
                    level: 'NA',
                    path: '/',
                    teacher: 'Undefined teacher',
                    reviews: []
                }
            }
            return result;
        },
        student(__: void, {id}): any {
            const result = database.students.filter(student => student.id == id)[0];
            if(result === undefined){
                return {
                    id: '-1',
                    name: "Undefined",
                    email: "Undefined",
                    courses: []
                }
            }
            return result;
        }
    }
}

export default query;