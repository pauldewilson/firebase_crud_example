/* eslint-disable jsx-a11y/anchor-is-valid */
// system imports
import fireDb from "../firebase";
import React, { useState, useEffect, useContext } from "react";
// project imports
import ContextComponent from "./Context";

const FormInput = () => {
  // formState for capturing requisite variables on editing an object
  const { formState, setformState } = useContext(ContextComponent);
  // standard form state
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [loc, setLoc] = useState("");
  // use effect to change formstate details on update
  useEffect(() => {
    setName(formState.name);
    setAge(formState.age);
    setLoc(formState.loc);
  }, [formState]);
  const onSubmitFunc = (e) => {
    // submit function
    e.preventDefault();
    // if formState has an item value then it's an update and not a push/new
    if (formState.item.length > 1) {
      fireDb.child(`items/${formState.item}`).set({ name, age, loc });
      // clear state else form is stuck in edit-only
      setformState({ type: "CLEAR" });
    } else {
      // if no id present then it must be a new addition
      fireDb.child("items").push({ name, age, loc });
    }
    // clear form fields
    setName("");
    setAge("");
    setLoc("");
    // focus back on name field
    e.target.elements.name.focus();
  };
  return (
    // render form
    <form onSubmit={onSubmitFunc}>
      <input
        autoFocus
        value={name}
        type="text"
        placeholder="name"
        id="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        value={age}
        type="text"
        placeholder="age"
        id="age"
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        value={loc}
        type="text"
        placeholder="loc"
        id="loc"
        onChange={(e) => setLoc(e.target.value)}
      />
      <button
        type="reset"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setformState({ type: "CLEAR" });
          setName("");
          setAge("");
          setLoc("");
          e.target.parentNode.elements.name.focus();
        }}
      >
        Reset
      </button>
      <br></br>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormInput;
