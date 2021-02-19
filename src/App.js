// system  imports
import React, { useReducer } from "react";
// project imports
import FormInput from "./components/FormInput";
import ListItems from "./components/ListItems";
import ContextComponent from "./components/Context";
import { itemsReducer, formStateReducer } from "./components/reducers";
// ui imports
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

export const App = () => {
  // useReducer to enable use of components across the app via context.Provider
  const [itemState, dispatch] = useReducer(itemsReducer, {});
  const [formState, setformState] = useReducer(formStateReducer, {
    item: "",
    name: "",
    age: "",
    loc: "",
  });
  return (
    // render app and pass components across platform
    <ContextComponent.Provider
      value={{ itemState, dispatch, formState, setformState }}
    >
      <Container align="center" className="App" maxWidth="md">
        <Typography variant="h2">Firebase Example</Typography>
        <Typography variant="subtitle1">
          Simple CRUD demonstration using a Firebase live-database
        </Typography>
        <hr></hr>
        <FormInput />
        <br></br>
        <ListItems />
      </Container>
    </ContextComponent.Provider>
  );
};
