import React, { useState } from "react";
import Button from "./Button";
import axios from "../axios";
import CustomNav from "./CustomNav";
const Form = () => {
  // DECLARATION OF VARIABLES
  //=========================
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [file, setFile] = useState();

  //   A FUNCTION THAT CREATES OUR POST OBJECT
  //==========================================
  async function createPostObject({ fName, lName, image }) {
    console.log("Creating post object via formData instance. ");

    // ALTERNATIVE A : FANCY WAY OF CREATING OUR NORMAL OBJECT
    //=========================================================
    const formData = new FormData();
    formData.append("fName", fName);
    formData.append("lName", lName);
    formData.append("photos", image); //Jackpot. Defines our fieldname which is crawled by multer to pick out this file for upload.

    // ALTERNATIVE B : OUR GOOD OLD METHOD CAN ALSO WORK BUT WE USE WHAT IS RECOMMENDED.
    //==================================================================================
    // const formData = { fName, lName, video: file };

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const { data } = await axios.post("/upload", formData, config);
    console.log(data);
    return data;
  }

  //   TAKES THE FILE SELECTED(OBJECT) FROM FILE INSTANCE.
  //=======================================================
  const fileSelected = (e) => {
    // console.log(e.target); //Will just display the attribute that causes the event to occur.
    // console.log(e.target.files); // Returns a file list which is an object
    const file = e.target.files[0];
    setFile(file);
    console.log(file);
  };

  const fileUploadHandler = async (e) => {
    e.preventDefault();

    // Create our post object.
    const result = await createPostObject({ fName, lName, image: file });

    console.log(result); //Returns to as the response from backend manifested under the data object.
  };

  //   const mpesaExpress = async (e) => {
  //     try {
  //       e.preventDefault();

  //       const customerInfo = {
  //         fName,
  //         lName,
  //         // File received
  //       };
  //       console.log(customerInfo);

  //       //   Submitting form data to backend
  //       //===================================
  //       const { data, status } = await axios.post("/express", customerInfo);

  //       if (status == 202) {
  //         setStatusTracker(true);
  //         setFName("");
  //         setLName("");
  //         // What about the input file
  //       }
  //     } catch (error) {
  //       // Destructuring the axios error which comes in 3 diff flavours
  //       const { message, status, code, config } = error;
  //       const { method, url, data } = config;
  //       console.log(message, method, url, data);
  //       console.log(status, code);
  //       // Status is present but one cannot reach out to it.
  //     }
  //   };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col phone:w-full phone:px-2 phone:mt-1 w-4/5 items-center justify-center phone:border-none border-2 border-primary phone mt-5 rounded-lg shadow-md shadow-primary">
        <CustomNav />
        {/* PROPOSED HEADER. */}
        {/* We are doing it the react style. How then do we handle the multipart.form data from our form to our server? */}
        <form
          encType="multipart/form-data"
          className="flex-col items-center justify-center px-5 w-full phone:border-2  phone:rounded-b-md"
        >
          <div className="flex phone:flex-col justify-around items-center my-10">
            <label for="contact" className="w-1/5 phone:w-full">
              Names
            </label>
            <input
              className="phone:w-full phone:my-1 px-4 mr-4 w-2/5 bg-white-200 appearance-none py-2 border-2 border-primary rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 placeholder:text-sm"
              id="fName"
              type="Text"
              placeholder="First Name"
              value={fName}
              onChange={(e) => {
                setFName(e.target.value);
              }}
              required
            ></input>

            <input
              className="phone:w-full phone:my-1 px-4 mr-4 w-2/5 bg-white-200 appearance-none py-2 border-2 border-primary rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 placeholder:text-sm"
              id="lName"
              type="Text"
              placeholder="Last Name"
              value={lName}
              onChange={(e) => {
                setLName(e.target.value);
              }}
              required
            ></input>
          </div>

          <div className="flex phone:flex-col justify-around items-center my-10">
            <input
              type="file"
              name="avatar"
              onChange={fileSelected}
              className="phone:w-full phone:my-1 px-4 mr-4 w-2/5 bg-white-200 appearance-none py-2 border-2 border-primary rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 placeholder:text-sm"
            />
          </div>

          <div className="flex flex-col justify-center items-center w-full mt-8 ">
            <Button
              type="button"
              text="Complete Transaction"
              onClick={fileUploadHandler}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
