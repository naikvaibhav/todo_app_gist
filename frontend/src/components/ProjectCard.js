import React from 'react'
import { Link } from 'react-router-dom'
import {Card} from 'react-bootstrap'
import Moment from "moment";

const ProjectCard = ({project}) =>{
    return (
        <Link to={{pathname:`/todolist/${project.projectId}`, state: [{projectname: project.title}]}} style={{ textDecoration: 'none' }}>
        <Card className='my-3 p-3 rounded d-flex' style={{minHeight:'8vw'}}>
        <Card.Body  className='align-items-center d-flex justify-content-center'>
        <Card.Title as='div'><strong>{project.title}</strong></Card.Title>
        </Card.Body>
        <footer className="footer text-right text-muted" style={{fontSize:'12px'}}>
        Added on : {Moment(project.createdOn).format("MMM D, YYYY")}
        </footer>
        </Card>
        </Link>
    )
}

export default ProjectCard