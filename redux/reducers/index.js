import { combineReducers } from "redux";
import { register } from "./register";
import { Users } from "./users";
export default combineReducers({
  register,
  Users,
});
