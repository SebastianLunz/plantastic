import React from "react";
import {Student} from "../models/student";


function StudentRow(props) {
    const student = props.student;
    const {fullName, numberOfBeers, participationCount} = student;
    return (
        <tr>
            <td> {fullName} </td>
            <td> {numberOfBeers}</td>
            <td> {participationCount}</td>
        </tr>
    );
}

function StudentList(props) {

    return (
        <table className='student-table' cellSpacing="0" cellPadding="0">
            <thead>
            <tr>
                <th>Full name</th>
                <th>Number of beers</th>
                <th>Participation</th>
            </tr>
            </thead>
            <tbody>
            <StudentRow student={new Student('Marek', 3, 1)}/>
            </tbody>
        </table>
    );

}

export default StudentList;