import React, { useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { sendUnshippedOrders } from '../../action/file'
import { prepareConfirmationDownload, preparePackingSlipsDownload, preparePullsheetDownload  } from './file_scripts'

const FileUploader = (props)=>{

  const [files,addFile] = useState([])
  const [confirmationDownloadLink,addConfirmationDownloadLink] = useState(null)
  const [pullsheetDownloadLink,addPullsheetDownloadLink] = useState(null)
  const [packingSlipDownloadLink,addPackingSlipDownloadLink] = useState(null)

  useEffect(_prepareDownloads, [props.packing_slips])

  function _handleFileUpload(e){
    const files = []
    for(let i = 0; i<e.target.files.length; i++){
      files.push(e.target.files[i])
    }
    addFile(files)
  }

  function _handleSubmit(){
    const formData = new FormData()
    for(let i = 0; i<files.length; i++){
      formData.append(i.toString(), files[i])
    }
    props.submitFiles(formData)
  }

  function _prepareDownloads(){
    addConfirmationDownloadLink(prepareConfirmationDownload(props.confirmation_file))
    addPullsheetDownloadLink(preparePullsheetDownload(props.pullsheet))
    // addPackingSlipDownloadLink(preparePackingSlipsDownload(props.packing_slips))
    if(packingSlipDownloadLink) setReady(true)
  }

  const downloadConfirmationBtn = <a
    href={confirmationDownloadLink}
    download={'confirmation_file.txt'}
    className='btn download-btn'
    >Download confirmation TXT file</a>

  const downloadPullsheetBtn = <a
    className='btn download-btn'
    href={pullsheetDownloadLink}
    download={'pull_sheet.csv'}
    >Download pull sheet CSV file</a>
  
  const downloadPackingSlipsBtn = <div
    className='btn download-btn'
    onClick={() => preparePackingSlipsDownload(props.packing_slips)}
    >Download packing slip DOCX file</div>

  const errorsText = props.errors?.length === 0? null: (
    <ul className='errors'>
      {props.errors?.map(error=><li>{error}</li>)}
    </ul>
  )

  return (
    <div
    id='file-uploader'
    >
      <p className='section-title'>
        File Picker
      </p>
      {errorsText}
      <input 
      type="file" 
      multiple
      onChange={_handleFileUpload}
      />
      <p
      onClick={_handleSubmit}
      className='btn'
      >
        Submit
      </p>
      {props.confirmation_file && downloadConfirmationBtn}
      <br />
      {props.pullsheet && downloadPullsheetBtn}
      <br />
      {props.packing_slips && downloadPackingSlipsBtn}
    </div>
  )
}

const mstp = (state)=>({
  confirmation_file: state.entities.files.confirmation_file,
  pullsheet: state.entities.files.pullsheet,
  packing_slips: state.entities.files.packing_slips,
  errors: state.errors.file_errors
})

const mdtp = (dispatch)=>({
  submitFiles: file => dispatch(sendUnshippedOrders(file))
})


export default connect(mstp,mdtp)(FileUploader)