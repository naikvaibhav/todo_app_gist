import React from 'react'
import { Button } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'


const CustomButton = ({btnName, fnCalled, size, variant, display, className}) => {
    const renderIcon = () => {
        switch(btnName) {
          case 'Login with github': return <FontAwesomeIcon icon={faGithub} />;
          case 'Export as gist' : return <FontAwesomeIcon icon={'file-export'} />
          case 'Create Project' : return <FontAwesomeIcon icon={'folder-plus'} />;
        }
      }

      const clientId = 'caa4e9c27734b844bae0';
      const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=gist`
      const button = display ? (<Button className={className} variant={variant} size={size} block onClick={()=>fnCalled()}>{renderIcon()} {btnName}</Button>) : (<Button className={className} variant={variant} size={size} onClick={fnCalled}>{renderIcon()} {btnName}</Button>)
      return button
}


export default CustomButton