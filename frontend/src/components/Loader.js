import React from 'react'
import { Spinner } from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image';

const Loader = (props) => {
    return (
    <Spinner animation='border' role='status' style={{width: '100px', height: '100px', margin: 'auto', display:'block'}}>
        <span className='sr-only'></span>
    </Spinner>
    )
}

export default Loader