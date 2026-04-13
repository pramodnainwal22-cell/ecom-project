import { CREATE_MAINCATEGORY_RED, GET_MAINCATEGORY_RED, UPDATE_MAINCATEGORY_RED, DELETE_MAINCATEGORY_RED } from "../Constant";
export default function MaincategoryReducer(state=[], action) {
  let index
  switch (action.type) {
    case CREATE_MAINCATEGORY_RED:
      return [...state, action.payload]

    case GET_MAINCATEGORY_RED:
      return action.payload

    case UPDATE_MAINCATEGORY_RED:
      index = state.findIndex(x => x.id === action.payload.id)
      state[index] = {...action.payload }
      return state 
      
      case DELETE_MAINCATEGORY_RED:
        return state.filter(x=> x.id !== action.payload.id)
        default:
          return state
  }
}