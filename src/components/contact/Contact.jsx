"use client";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useParams } from "next/navigation";
import { useContact } from "./hook/useContact";
import { useAuth } from "../../../firebase/auth";
import View from "./View";

const Contact = () => {
  const params = useParams();
  const { authUser } = useAuth();
  const { initialValues, schema, handleSubmit, handleDelete, allItems } = useContact();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = allItems.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
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
              <button
                type="submit"
                className="bg-slate-700 p-3 text-white font-bold rounded-lg"
              >
                {params.contact ? "Update Item" : "Add Item"}
              </button>
            </div>
          </div>
        </Form>
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
