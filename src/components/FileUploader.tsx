import React, { useState,useRef } from "react";
import { Upload, Button } from "antd";
import "antd/dist/antd.css";

const dummyRequest = ({ file, onSuccess }:{file:any, onSuccess?:any}) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const FileUploader=() =>
{
  const fileRef=useRef<HTMLInputElement>(null)
  const [selectedFile,setSelectedFile]=useState<any>(null);
   const[ selectedFileList, setSelectedFileList]=useState<any[]>([])

  const onChange=(info: any) =>
  {   
    console.log('info : ', info)
    //  const formData=new FormData();

    //   console.log('info : ',info)
    //     formData.append('File', info?.file);
    //   setSelectedFile(formData);
    //   setSelectedFileList(info?.fileList);
  };
  // const onChange=() =>
  // {
  //   if(fileRef?.current?.files){

  //     console.log('TEST : ',fileRef?.current?.files[0]);
  //     // console.log(info?.file)
  //     const formData=new FormData();
      
  //     formData.append('File', fileRef?.current?.files[0]);
  //     setSelectedFile(formData)
  //     // setSelectedFileList(info?.fileList)
  //   }
  //   };

  const handleDragEnter = (e:any) => {
    e.preventDefault();
    console.log("drag enter");
  };

  const handleDragLeave = (e:any) => {
    e.preventDefault();
    console.log("drag leave");
  };

  const handleDragOver = (e:any) => {
    e.preventDefault();
    console.log("drag over");
  };

  const handleDrop = (e:any)  => {
    e.preventDefault();
    console.log("drag drop");
  };

  const handleClick=async () =>
  {

fetch(
  'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  {
    method: 'POST',
    body: selectedFile,
  }
).then((response) => response.json())
.then((result) => {
  console.log('Success:', result);
})
.catch((error) => {
  console.error('Error:', error);
});

  }
    return (
      <div className="App">
        <Upload
          fileList={selectedFileList}
          customRequest={dummyRequest}
          onChange={onChange}
        >
          <Button>Choose File</Button>
        </Upload>
        {/* <input ref={fileRef} type='file'   onChange={onChange}/> */}

        <div
      className="dropzone"
      onDrop={e => handleDrop(e)}
      onDragOver={e => handleDragOver(e)}
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}
      onChange={onChange}
    >
      <div className="sub-header">Drag your audio file here:</div>
      <div className="draggable-container">
        <input
        ref={fileRef} 
          type="file"
          className="file-browser-input"
          name="file-browser-input"
          style={{ display: "none" }}
        />
      </div> 
    </div>

        
        <Button onClick={handleClick}>SAVE</Button>
        <br />
      </div>
  );
}
export default FileUploader
