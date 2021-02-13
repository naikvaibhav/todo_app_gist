import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import Axios from 'axios'

import ProjectCard from '../components/ProjectCard'
import Loader from '../components/Loader'
import { BASE_URL } from "../environment";
import { useAuth } from "../context/auth";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CustomModal from '../components/CustomModal'
import CustomButton from '../components/CustomButton'


const Home = () => {
    const {authTokens} = useAuth(); 
    const [data, setdata] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [refresh, setRefresh] = useState(false)

    useEffect(()=>{
        setRefresh(false)
        Axios({
            method: "get",
            url: `${BASE_URL}/project/view`,
            headers: {
              token: authTokens,
            },
          }).then((response)=>{
              setdata([...response.data.data])
          }).catch(err=> console.log(err.response))
    },[refresh])


    const closeModal = () => {
        setIsShow(false)
    }

    const openModal = () => {
        setIsShow(true)
    }

    const addProject = (projectTitle) => {
        const data = {
            'title': projectTitle
        }
        Axios({
            method: "post",
            url: `${BASE_URL}/project/create`,
            data: data,
            headers: {
              token: authTokens,
            },
          }).then((response)=>{
              closeModal()
              setRefresh(true)
          }).catch(err=> console.log(err.response))
    }


    return(
        <>
        <h2 className='text-center py-1'>Project List</h2>
        <div className='d-flex justify-content-end'><CustomButton variant='flat' fnCalled={()=> openModal()} btnName='Create Project' size='md'/></div>
        {data.length <= 0 ? (<h1 className='align-items-center d-flex justify-content-center my-auto py-2'>No Projects are created yet</h1>) : (<Row>
            {data.map((project, index)=>{
            return (
                  <Col key={index} sm={12} md ={6} lg={4} xl={3}>
                  <ProjectCard project={project}/>
                  </Col>
            )
            })}
        </Row>)}

        <div>
            {
                isShow ?  (
                   <CustomModal setIsShow={setIsShow} addProject={addProject}/>
                ) : (null)
            }
        </div>
        </>
    )
}

export default Home