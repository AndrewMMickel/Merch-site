import rootReducer from './../reducers/index';
import { createStore } from 'redux';
import formVisibleReducer from './../reducers/form-visible-reducer';
import ItemListReducer from './../reducers/ItemList-reducer';
let store = createStore(rootReducer);

describe("rootReducer", () => {

    test('Should return default state if no action type is recognized', () => {
        expect(rootReducer({}, { type: null })).toEqual({
            mainItemList: {},
            formVisibleOnPage: false
        });
    });

    test('Check that initial state of ItemListReducer matches root reducer', () => {
        expect(store.getState().mainItemList).toEqual(ItemListReducer(undefined, { type: null }));
    });

    test('Check that initial state of formVisibleReducer matches root reducer', () => {
        expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, { type: null }));
    });

    test('Check that ADD_Item action works for ItemListReducer and root reducer', () => {
        const action = {
            type: 'ADD_ITEM',
            name: 'Watermelons',
            imageurl: "",
            quantity: '5',
            price: '5',
            description: 'Juicy Watermelons',
            id: 1
        }
        store.dispatch(action);
        expect(store.getState().mainItemList).toEqual(ItemListReducer(undefined, action));
    });

    test('Check that TOGGLE_FORM action works for formVisibleReducer and root reducer', () => {
        const action = {
            type: 'TOGGLE_FORM'
        }
        store.dispatch(action);
        expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, action));
    });
});