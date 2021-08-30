import React from "react";
import Button from '../../UIshared/button/button.js';
const Fileupload = (props) => {
  return (
    <form className="bg-white w-full shadow-md rounded p-4 m-2" encType="multipart/form-data" onSubmit={props.onSubmitHandler}>
        <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                select image to upload
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                name="image"
                type="file"
                placeholder="select image "
                // value={props.file}
                onChange={props.filesetHandler}
              />
          </div>
          {props.description!==false ? <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="descreption"
              >
                descreption
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                type="text"
                placeholder="add description...."
                value={props.description}
                onChange={props.onChangeHandler}
              />
          </div> :null}
          <Button classname="uploadimg p-2 rounded-md text-white" type="submit"  text="upload"/>
    </form>
  );
};

export default Fileupload;
