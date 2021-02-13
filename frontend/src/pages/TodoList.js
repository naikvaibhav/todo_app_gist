import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Form, ListGroup, Card, Modal, Button } from 'react-bootstrap'
import Axios from 'axios'

import { BASE_URL } from "../environment";
import { useAuth } from "../context/auth";
import CustomButton from '../components/CustomButton'
import Todo from '../components/Todo'
import CustomModal from '../components/CustomModal'

const TodoList = ({match, location}) => {
    const {authTokens} = useAuth(); 
    const projectId = match.params.projectId
    const projectName = location.state[0].projectname
    const [data, setdata] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [description, setDescription] = useState('')
    const [template, setTemplate] = useState('')
    const [stringTemplate, setStringTemplate] = useState('')
    const [templateGenerated, setTemplatedGenerated] = useState(false)
    let todoDescription = useRef()

    useEffect(()=>{
        Axios({
            method: "get",
            url: `${BASE_URL}/todo/view/${projectId}`,
            headers: {
              token: authTokens,
            },
          }).then((response)=>{
              setRefresh(false)
              if(response.data.data){
               return setdata([...response.data.data])
              }else{
                 return setdata([])
              }
          }).catch(err=> console.log(err.response))
    },[refresh])


    const showModal = (todo) => {
        setSelectedTodo(todo)
        setIsShow(true)
    }

    const updateToDo = (newValue) => {
        const data = { 
            'description': newValue
        }
        Axios({
            method: "put",
            url: `${BASE_URL}/todo/edit/${selectedTodo.todoId}/${projectId}`,
            data: data,
            headers: {
              token: authTokens,
            },
          }).then((response)=>{
              console.log(response)
              setRefresh(true)
              setIsShow(false)
              setSelectedTodo(null)
          }).catch(err=> console.log(err.response))
    }

    const removeTodo = (id) => {
        Axios({
            method: "delete",
            url: `${BASE_URL}/todo/${id}`,
            headers: {
              token: authTokens,
            },
          }).then((response)=>{
              console.log(response)
              setRefresh(true)
            //   setSelectedTodo(null)
          }).catch(err=> console.log(err.response))
    }

    const markTodo = (todoId, ischecked) => {
        const status = ischecked ? 'completed' : 'todo'
        const data = {
            'status': status
        }
        Axios({
            method: "put",
            url: `${BASE_URL}/todo/edit/${todoId}/${projectId}`,
            data: data,
            headers: {
              token: authTokens,
            },
          }).then((response)=>{
              console.log(response)
              setRefresh(true)
              setSelectedTodo(null)
          }).catch(err=> console.log(err.response))
    }

    const addToDo = () => {
        const data = {
            'description': description
        }

        Axios({
            method: "post",
            url: `${BASE_URL}/todo/create/${projectId}`,
            data: data,
            headers: {
              token: authTokens,
            },
          }).then((response)=>{
              console.log(response)
              setRefresh(true)
              setSelectedTodo(null)
              setDescription('')
              todoDescription.current.value = ''
          }).catch(err=> {
              console.log(err.response)
              setDescription('')
              setSelectedTodo(null)
            })
    }

    const createTemplate = (summaryData) => {
        let template = (
           <Card>
            <Card.Header style={{color: '#2196F3'}}>{summaryData.projectName}.{summaryData.fileExtension}</Card.Header>
            <Card.Body>
            <Card.Title as='h2' style={{fontWeight: '600'}}>{summaryData.projectName}</Card.Title>
            <hr/>
            <Card.Text style={{fontWeight: '600'}}>Summary: {summaryData.pendingTodos}/{summaryData.totalTodos} todos completed</Card.Text>
            <div className='pt-4'>
            <Card.Text style={{fontWeight: '600'}}>Pending</Card.Text>
             {
                 summaryData.pendingTodosList.map((pending,index) => {
                    return(<div className='d-flex' key={index}>
                    <Form.Check/>
                    <span>{pending.description}</span>
                    </div>)
                 })
             }
            </div>
            <div className='pt-4'>
            <Card.Text style={{fontWeight: '600'}}>Completed</Card.Text>
            {
                 summaryData.completedTodosList.map((completed,index) => {
                    return(<div className='d-flex' key={index}>
                    <Form.Check defaultChecked={true}/>
                    <span>{completed.description}</span>
                    </div>)
                 })
             }
            </div>
            </Card.Body>
            </Card>)
        setIsShow(true)
        setTemplate(template)
        setTemplatedGenerated(true)
    }

  
    const createStringTemplate = (summaryData) => {
        const template = `# ${summaryData.projectName}
## Summary: ${summaryData.pendingTodos}/${summaryData.totalTodos} todos completed
# Pending
${summaryData.pendingTodosList.map(each=> `- [ ] ${each.description}`).splice(',').join("\n")}
# Completed
${summaryData.completedTodosList.map(each=> `- [x] ${each.description}`).splice(',').join("\n")}`
        setStringTemplate(template)
    }

    const uploadAsGist = () => {
        const fileName = `${projectName}.md`;

        const data = {
            "description": "Gist created using the react todo application",
            "public": false,
            "files": {
                [fileName]: {
                    "content": stringTemplate
                }
            }
        }

        Axios({
            method: "post",
            url: `${BASE_URL}/project_summary`,
            data: data,
            headers: {
              token: authTokens,
            },
          }).then((response)=>{
              console.log(response)
              setIsShow(false)
              setStringTemplate('')
              setTemplatedGenerated(false)
              setTemplate('')
          }).catch(err=> {
              console.log(err.response)
            })
    }

    const createSummary = () => {
        const pendingTodos = data.filter(todo => todo.status !== 'todo').length
        const totalTodos = data.length
        const pendingTodosList = data.filter(todo => {
            if(todo.status === 'todo'){
                return todo.description
            }
        })

        const completedTodosList = data.filter(todo => {
            if(todo.status === 'completed'){
                return todo.description
            }
        })

        const summaryData = {
            'projectName': projectName,
            'fileExtension': 'md',
            'pendingTodos': pendingTodos,
            'totalTodos': totalTodos,
            'pendingTodosList': pendingTodosList,
            'completedTodosList': completedTodosList
        }
        createTemplate(summaryData)
        createStringTemplate(summaryData)
    }

    return(
        <>
        <div className='py-4'>
            <Row className='my-4'>
            <Col md={10}>
            <h2 className='text-center'>Project Title: {projectName.toUpperCase()}</h2>
            </Col>
            <Col md={2} className='text-right'>
            <CustomButton variant='flat' fnCalled={createSummary} btnName='Export as gist' size='md' />
            </Col>
            </Row>
        <Row>
        <Col md={10}>
        <Form.Control type="text" placeholder="Type here to add a todo to the list..." ref={todoDescription} onChange={(e) =>
              // console.log(e.target.value)
              setDescription(e.target.value)
            }/>
        </Col>
        <Col md={2} className='mb-0'>
        <CustomButton className='float-right' variant='flat' fnCalled={addToDo} btnName='Add todo' size='md' />
        </Col>
        </Row>

       
        {data.length <= 0 ? (<h1 className='align-items-center d-flex justify-content-center my-auto py-2'>No todos are created yet</h1>) : (
             <Row className='mt-5 text-center'>
             <Col>
             {
            data.map((todo,index)=>{
                return(
                <Card key={index} className='mb-2 py-0'>
                    <Card.Body style={{padding: '0.9rem'}}>
                        <Todo   
                        key={todo.todoId}
                        index={todo.todoId}
                        todo={todo}
                        showModal={showModal}
                        removeTodo={removeTodo}
                        markTodo={markTodo}
                        />
                    </Card.Body>
                </Card>
                )
            })
        }
        </Col>
        </Row>
        )}
        </div>
        <div>
            {
                isShow ?  (
                   <CustomModal template={template} templateGenerated={templateGenerated} isTemplate={setTemplatedGenerated} uploadAsGist={uploadAsGist} setIsShow={setIsShow} updateToDo={updateToDo} selectedTodo={selectedTodo} mode='update'/>
                ) : (null)
            }
        </div>
        </>
    )
}

export default TodoList