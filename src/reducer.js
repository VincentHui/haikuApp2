import { combineReducers } from 'redux'
import { homeTiles, SelectedTile } from '../src/homeTiles/reducers'

export default combineReducers({
    homeTiles,
    SelectedTile
  })