// system  imports
import React, { useReducer } from "react";
// project imports
import FormInput from "./components/FormInput";
import ListItems from "./components/ListItems";
import ContextComponent from "./components/Context";
import { itemsReducer, formStateReducer } from "./components/reducers";

export const App = () => {
  // useReducer to enable use of components across the app via context.Provider
  const [itemState, dispatch] = useReducer(itemsReducer, {});
  const [formState, setformState] = useReducer(formStateReducer, {item:"",name:"",age:"",loc:""});
  return (
    // render app and pass components across platform
    <ContextComponent.Provider value={{ itemState, dispatch, formState, setformState }}>
      <div className="App">
        <h1>Firebase Example</h1>
        <FormInput />
        <ListItems />
      </div>
    </ContextComponent.Provider>
  );
};
