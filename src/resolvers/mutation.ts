import { IResolvers } from "@graphql-tools/utils";
import { database } from "../data/data.store";
import _ from "lodash";

const mutation : IResolvers = {
    Mutation : {
        newCourse(__:void, {course}): any {
            const item = {
                id: String(database.courses.length+1),
                title: course.title,
                description: course.description,
                classes: course.classes,                
                time: course.time,
                logo: course.logo,
                level: course.level,
                path: course.path,
                teacher: course.teacher,
                reviews: []
            }
            if(database.courses.filter(item => item.title === course.title).length === 0){
                database.courses.push(item);
                return item;
            }
            else{
                return {
                    id: '-1',
                    title: 'The course already exist.',
                    description: '',
                    classes: -1,                
                    time: 0,
                    logo: '',
                    level: '',
                    path: '',
                    teacher: '',
                    reviews: []
                }
            }
        },
        modifyCourse(__:void, {course}): any {
            const item = _.findIndex(database.courses, function(o){
                return o.id === course.id;
            });
            if(item > -1){
                const modifyItem = database.courses[item].reviews;
                course.reviews = modifyItem;
                database.courses[item] = course;
                return course;
            }
            else{
                return {
                    id: '-1',
                    title: 'The course not found.',
                    description: '',
                    classes: -1,                
                    time: 0,
                    logo: '',
                    level: '',
                    path: '',
                    teacher: '',
                    reviews: []
                }
            }
        },
        deleteCourse(__: void, {id}): any {
            const courseRemove = _.remove(database.courses, function(item){
                return item.id === id;
            });
            if(courseRemove[0] === undefined){
                return {
                    id: '-1',
                    title: 'The course not found.',
                    description: "Do wasn't removed course.",
                    classes: -1,                
                    time: 0,
                    logo: '',
                    level: '',
                    path: '',
                    teacher: '',
                    reviews: []
                }
            }
            return courseRemove[0];
        },
    }
}

export default mutation;