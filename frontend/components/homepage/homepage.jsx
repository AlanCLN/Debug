import React, { useState } from 'react'
import FileUploader from '../file_uploader/FileUploader'
import NavBar from '../NavBar'

const Homepage = (props)=>{

  

  return (
    <div id='homepage'>
      
      <NavBar/>
      <FileUploader/>

    </div>
  )
}

export default Homepage