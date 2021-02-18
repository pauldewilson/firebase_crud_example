export const itemsReducer = (state, action) => {
  // reducer for all items objects that are rendered to table
  switch (action.type) {
    case "CLEAR":
      return {};
    case "ADD":
      return { ...state, ...action.item };
    case "DEL":
      return Object.keys(state)
        .filter((i) => i !== action.item)
        .reduce((obj, key) => {
          obj[key] = state[key];
          return obj;
        }, {});
    default:
      return state;
  }
};

export const formStateReducer = (state, action) => {
  // state for use on clicking edit button
  switch (action.type) {
    case "EDIT":
      return {
        item: action.itemObject.item,
        name: action.itemObject.name,
        age: action.itemObject.age,
        loc: action.itemObject.loc,
      };
    case "CLEAR":
      return { item: "", name: "", age: "", loc: "" };
    case "EDITMODE":
      return {...state, editMode:true}
    default:
      return state;
  }
};
