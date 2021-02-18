/* eslint-disable jsx-a11y/anchor-is-valid */
// system imports
import fireDb from "../firebase";
import React, { useState, useEffect, useContext } from "react";
// project imports
import ContextComponent from "./Context";
// ui imports
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
    document.getElementById("name").focus();
  };
  const handleClickAway = () => {
    // if user clicks outside of form AFTER having clicked edit
    // then editMode will be 1 and if editMode is set to 1 then
    // form will clear
    if(formState.editMode){
      setformState({type:"CLEAR"})
    } else if(formState.item.length > 0) {
      setformState({type:"EDITMODE"})
    }
  };
  return (
    // render form
    <ClickAwayListener onClickAway={handleClickAway}>
      <form onSubmit={onSubmitFunc}>
        <TextField
          autoFocus
          value={name}
          type="text"
          placeholder="name"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          value={age}
          type="text"
          placeholder="age"
          id="age"
          onChange={(e) => setAge(e.target.value)}
        />
        <TextField
          value={loc}
          type="text"
          placeholder="loc"
          id="loc"
          onChange={(e) => setLoc(e.target.value)}
        />
        <br></br>
        <br></br>
        <Button type="submit" variant="contained" color="primary">
          {formState.item.length > 1 ? "Edit" : "Submit"}
        </Button>
        <Button
          type="reset"
          variant="contained"
          color="secondary"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setformState({ type: "CLEAR" });
            setName("");
            setAge("");
            setLoc("");
            document.getElementById("name").focus();
          }}
        >
          Reset
        </Button>
      </form>
    </ClickAwayListener>
  );
};

export default FormInput;
