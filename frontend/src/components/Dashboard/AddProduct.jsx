import React from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";

const AddProduct = () => {
  return (
    <form>
        <div>
            <p className=''> Upload Product Image </p>
            <div className=''>
                <label htmlFor='image1'>
                    <FaCloudUploadAlt />
                    <input type='file' id='image1' hidden />
                </label>
            </div>
        </div>
    </form>

  )
}

export default AddProduct