/* eslint-disable jsx-a11y/anchor-is-valid */
// system imports
import fireDb from "../firebase";
import React, { useEffect, useContext } from "react";
// project imports
import ContextComponent from "./Context";
// ui imports
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { withStyles } from "@material-ui/core/styles";

// styling elements for the table
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

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
    document.getElementById("name").focus();
  };
  const editItem = (itemID) => {
    // edits form state only after clicking edit-button
    // actual firebase editing is handled within submitFunc in FormInput
    setformState({
      type: "EDIT",
      itemObject: { ...itemID },
    });
    document.getElementById("name").focus();
  };
  return (
    // render table
    // iterate over objects to generate row data
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>name</StyledTableCell>
            <StyledTableCell>age</StyledTableCell>
            <StyledTableCell>loc</StyledTableCell>
            <StyledTableCell padding="none"></StyledTableCell>
            <StyledTableCell padding="none"></StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {Object.keys(itemState).map((item) => (
            <StyledTableRow key={item}>
              <StyledTableCell>{itemState[item].name}</StyledTableCell>
              <StyledTableCell>{itemState[item].age}</StyledTableCell>
              <StyledTableCell>{itemState[item].loc}</StyledTableCell>
              <StyledTableCell padding="none">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    editItem({ item, ...itemState[item] });
                  }}
                  href="#"
                >
                  <EditIcon color="primary" />
                </a>
              </StyledTableCell>
              <StyledTableCell padding="none">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    deleteItem(item);
                  }}
                  href="#"
                >
                  <DeleteForeverIcon color="secondary" />
                </a>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListItems;
