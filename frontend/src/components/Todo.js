import React, { useState } from 'react'
import CustomButton from './CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form } from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image'

const Todo = ({ todo, index, status, markTodo, removeTodo, showModal }) => {
    const updateTodo = () =>{
       showModal(todo)
    }
    const [checked, setChecked] = useState(false)

    return (
      <div className="todo">
        <div className='d-flex justify-content-md-around'>
        <Form.Check defaultChecked={todo?.status == 'completed' ? true  : false} onChange={(e)=>markTodo(todo.todoId,e.target.checked)}/>
        <span style={{ textDecoration: todo?.status == 'completed' ? "line-through" : "" }}>{todo.description}</span>
        </div>
        <div>
          {/* <CustomButton variant="outline-success" btnName='✓'/>{' '}
          <CustomButton variant="outline-danger" btnName='✕'/> */}
          <Button className='rounded-circle' variant='flat' size='sm' onClick={() => updateTodo()}><span><FontAwesomeIcon icon="pencil-alt"></FontAwesomeIcon></span></Button>{' '}
          <Button className='rounded-circle' variant='flat' size='sm' onClick={() => removeTodo(todo.todoId)}><span><FontAwesomeIcon icon="trash"></FontAwesomeIcon></span></Button>
        </div>
      </div>
    );
  }

export default Todo