import formVisibleReducer from './form-visible-reducer';
import ItemListReducer from './ItemList-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    formVisibleOnPage: formVisibleReducer,
    mainItemList: ItemListReducer
});

export default rootReducer;