import React from 'react'
import {Card} from 'react-bootstrap'
import CustomButton from './CustomButton'

const LoginCard = ({loginTriggered}) => {
    return(
        <Card className='my-3 p-3 rounded'>
        <Card.Body>
        <h3 className='text-center py-2'>Login To Your Account</h3>
        <CustomButton variant='flat' fnCalled={loginTriggered} btnName='Login with github' size='lg' display='block'/>
        </Card.Body>
        </Card>
    )
}


export default LoginCard
