import { combineReducers } from 'redux'
import categories from './categories'
import cartHash from './cart'

const rootReducer = () => combineReducers({
  categoriesList: categories,
  cartHash,
})

export default rootReducer