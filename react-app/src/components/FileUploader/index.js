import {useState} from 'react'
import { useDispatch } from "react-redux";

import "./FileUploader.css"

const FileUploader = ({}) => {
    const [file, setFile] = useState(null);

    const onInputChange = (e) =>{
        console(e.target.files)
        setFile(e.target.files[0])
    };
    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form method="post" action="#" id="#" onSubmit={onSubmit}>
              <div class="form-group files">
                <label>Upload Your File </label>
                <input
                 type="file"
                 onChange={onInputChange}
                class="form-control"
                multiple=""/>
              </div>

                <button>Submit</button>
          </form>
    )
}


export default FileUploader
