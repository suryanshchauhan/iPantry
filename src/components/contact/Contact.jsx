"use client";
import React, { useState, useRef, useCallback } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useParams } from "next/navigation";
import { useContact } from "./hook/useContact";
import { useAuth } from "../../../firebase/auth";
import View from "./View";
import Webcam from "react-webcam";

const Contact = () => {
  const params = useParams();
  const { authUser } = useAuth();
  const { initialValues, schema, handleSubmit, handleDelete, allItems, setImage, handleImageUpload } = useContact();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null); 

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = allItems.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const capturePhoto = useCallback(async (setFieldValue) => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedPhoto(imageSrc);
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
    setImage(file);
    const imageURL = await handleImageUpload(file);
    setFieldValue("imageURL", imageURL);
    setIsCameraOpen(false);
  }, [webcamRef, setImage, handleImageUpload]);

  const resetForm = () => {
    setCapturedPhoto(null);
    setImage(null); 
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={schema}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions).then(() => {
            resetForm();
            actions.resetForm();
          });
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="flex justify-center items-center p-8">
              <div className="bg-blue-300 flex flex-col justify-center items-start p-10 gap-4">
                <h1>{authUser ? `Welcome ${authUser.name}` : "Welcome"}</h1>
                <div className="flex flex-col justify-center items-start gap-3">
                  <label>Item Name</label>
                  <Field
                    type="text"
                    name="itemName"
                    id="itemName"
                    className="h-10 rounded-sm p-2"
                  />
                  <ErrorMessage
                    name="itemName"
                    component="div"
                    className="text-red-600 font-semibold"
                  />
                </div>
                <div className="flex flex-col justify-center items-start gap-3">
                  <label>Quantity</label>
                  <Field
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="h-10 rounded-sm p-2"
                  />
                  <ErrorMessage
                    name="quantity"
                    component="div"
                    className="text-red-600 font-semibold"
                  />
                </div>
                <div className="flex flex-col justify-center items-start gap-3">
                  <label>Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef} 
                    onChange={async (event) => {
                      const file = event.currentTarget.files[0];
                      setImage(file);
                      const imageURL = await handleImageUpload(file);
                      setFieldValue("imageURL", imageURL);
                      setCapturedPhoto(URL.createObjectURL(file));
                    }}
                    className="h-10 rounded-sm p-2"
                  />
                  <button
                    type="button"
                    onClick={() => setIsCameraOpen(!isCameraOpen)}
                    className="h-10 rounded-sm p-2 bg-gray-500 text-white mt-2"
                  >
                    {isCameraOpen ? "Close Camera" : "Take Photo"}
                  </button>
                </div>
                {isCameraOpen && (
                  <div className="flex flex-col justify-center items-center mt-4">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      className="w-64 h-64"
                    />
                    <button
                      type="button"
                      onClick={() => capturePhoto(setFieldValue)}
                      className="bg-green-500 p-2 text-white rounded-sm mt-2"
                    >
                      Capture Photo
                    </button>
                  </div>
                )}
                {capturedPhoto && (
                  <div className="flex flex-col justify-center items-center mt-4">
                    <img src={capturedPhoto} alt="Captured" className="w-64 h-64 object-cover" />
                  </div>
                )}
                <button
                  type="submit"
                  className="bg-slate-700 p-3 text-white font-bold rounded-lg mt-4"
                >
                  {params.contact ? "Update Item" : "Add Item"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <div className="flex justify-center items-center p-8">
        <input
          type="text"
          placeholder="Search Items"
          value={searchTerm}
          onChange={handleSearchChange}
          className="h-10 rounded-sm p-2 w-full border border-gray-400"
        />
      </div>

      <View items={filteredItems} handleDelete={handleDelete} />
    </>
  );
};

export default Contact;
