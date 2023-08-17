const initialState = {
  email: "",
  name: "",
  phone: "",
  _id: "",
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Add":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default UserReducer;
