import { combineReducers } from "redux";
import { register } from "./register";
import { Users } from "./users";
import { Movies } from "./movies";
import { Lists } from "./list";
export default combineReducers({
  register,
  Users,
  Movies,
  Lists,
});
