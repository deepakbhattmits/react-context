import { useState, useRef } from 'react'
import { Button } from 'antd'
import 'antd/dist/antd.css'

const FileUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [active, setActive] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<any[]>([])

  const onClick = () => {
    if (fileInputRef?.current) {
      fileInputRef?.current?.click()
    }
  }
  const handleChange = () => {
    if (fileInputRef?.current?.files) {
      setSelectedFile([fileInputRef?.current?.files[0]])
    }
  }
  const handleDragEnd = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    // console.log('drag end')
    setActive(false)
  }

  const handleDragOver = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    // console.log('drag over')
    setActive(true)
  }
  const handleDragLeave = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    // console.log('drag leave')
    setActive(false)
  }

  const handleDrop = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    setSelectedFile([e?.dataTransfer?.files[0]])
    // console.log('drag drop')
  }
  const handleRemove = () => {
    setSelectedFile([])
  }

  const handleSubmit = async () => {
    fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
      method: 'POST',
      body: JSON.stringify(selectedFile),
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log('Success:', result)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
  return (
    <div>
      {selectedFile?.length ? (
        selectedFile?.map((el: any, i: number) => (
          <div key={i} className={`dropzone d-flex ${active ? 'active' : ''}`}>
            <span>{el.name}</span>
            <i className="trash alternate icon" onClick={handleRemove} />
          </div>
        ))
      ) : (
        <div
          className={`dropzone ${active ? 'active' : ''}`}
          draggable="true"
          onClick={onClick}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <p className="sub-header">Drag and Drop file </p>
          <p>or</p>
          <p className="link">Browse files</p>
          <div className="draggable-container">
            <input
              ref={fileInputRef}
              type="file"
              className="file-browser-input"
              name="file-browser-input"
              onChange={handleChange}
              hidden
              accept=".text,.md"
            />
          </div>
        </div>
      )}
      <hr />
      <Button onClick={handleSubmit}>SAVE</Button>
      <br />
    </div>
  )
}
export default FileUploader
