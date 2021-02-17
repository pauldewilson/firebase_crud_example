/* eslint-disable jsx-a11y/anchor-is-valid */
// system imports
import fireDb from "../firebase";
import React, { useEffect, useContext } from "react";
// project imports
import ContextComponent from "./Context";

const ListItems = () => {
  const { itemState, dispatch, setformState } = useContext(ContextComponent);
  // listen for updates from firebase
  useEffect(() => {
    fireDb.child("items").on("value", (item) => {
      let itemData = item.val();
      // clear present state so any value changes on firestore are returned
      dispatch({ type: "CLEAR" });
      if (itemData !== null) {
        dispatch({ type: "ADD", item: itemData });
      }
    });
  }, []);
  const deleteItem = (itemID) => {
    // delete from firebase and clear from state
    fireDb.child(`items/${itemID}`).remove();
    dispatch({
      type: "DEL",
      item: itemID,
    });
  };
  const editItem = (itemID) => {
    // edits form state only after clicking edit-button
    // actual firebase editing is handled within submitFunc in FormInput
    setformState({
      type: "EDIT",
      itemObject: { ...itemID },
    });
  };
  return (
    // render table
    // iterate over objects to generate row data
    <table>
      <tbody>
        <tr>
          <th>name</th>
          <th>age</th>
          <th>loc</th>
          <th>edit</th>
          <th>del</th>
        </tr>
        {Object.keys(itemState).map((item) => (
          <tr key={item}>
            <td>{itemState[item].name}</td>
            <td>{itemState[item].age}</td>
            <td>{itemState[item].loc}</td>
            <td>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  editItem({ item, ...itemState[item] });
                }}
                href="#"
              >
                E
              </a>
            </td>
            <td>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  deleteItem(item);
                }}
                href="#"
              >
                X
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListItems;
