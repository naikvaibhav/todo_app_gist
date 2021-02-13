import React, { Fragment, useState, useEffect } from "react";
import { Form, Modal, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const CustomModal = ({setIsShow, updateToDo, selectedTodo, mode, addProject, template, templateGenerated, isTemplate, uploadAsGist}) => {
  const [changedValue, setChangedValue] = useState(null)
 
   const renderModal =  templateGenerated ? (
    <Modal show={true} centered  size="md" onClose={()=> console.log('close called')}>
      <Modal.Header>
        <Modal.Title as='h5'>Preview of the file to be exported as gist</Modal.Title>
      </Modal.Header>
    <Modal.Body>
      {template}
    </Modal.Body>
    <div className='text-center py-2'>
        <Button variant="secondary" className="mr-2 btn-md" onClick={()=>{
          setIsShow(false)
          isTemplate(false)
          }}>
          Close
        </Button>
        <Button variant="flat" className="mr-2 btn-md" onClick={()=>uploadAsGist(template)}>
          <FontAwesomeIcon icon='file-upload'/>{' '}Upload as secret gist to github
        </Button>
      </div>
    </Modal>
    ) : (
      <Modal show={true} centered  size="md">
      <Modal.Body>
      <Form.Control type="text" defaultValue={selectedTodo?.description} placeholder={mode=='update'? 'Edit the todo' : 'Add the title of the project ex: Daily Task'}  onChange={(e) =>
            setChangedValue(e.target.value)
          }/>
      </Modal.Body>
      <div className='text-center py-2'>
        <Button variant="secondary" className="mr-2 btn-sm" onClick={()=>setIsShow(false)}>
          Close
        </Button>
        {mode == 'update' ? (<Button variant="flat" className="mr-2 btn-sm" onClick={()=>updateToDo(changedValue)}>
          Update
        </Button>) : (<Button variant="flat" className="mr-2 btn-sm" onClick={()=>addProject(changedValue)}>
          Add
        </Button>) }
      </div>
    </Modal>
    )

    return renderModal;
}

export default CustomModal
