import itemListReducer from './../reducers/ItemList-reducer';

describe('itemListReducer', () => {

    let action;

    const currentState = {
        1: {
            name: 'Watermelons',
            imageurl: '',
            quantity: '5',
            price: '5',
            description: 'Juicy Watermelons',
            id: 1
        }, 2: {
            item: 'Rice',
            imageurl: '',
            quantity: '5',
            price: '5',
            description: 'Bags of Rice',
            id: 2
        }

    }

    const itemData = {
        name: 'Watermelons',
        imageurl: '',
        quantity: '5',
        price: '5',
        description: 'Juicy Watermelons',
        id: 1
    };

    test('Should return default state if no action type is recognized', () => {
        expect(itemListReducer({}, { type: null })).toEqual({});
    });

    test('Should successfully add new item data to mainItemList', () => {
        const { id, imageurl, name, quantity, price, description } = itemData;
        action = {
            type: 'ADD_ITEM',
            imageurl: imageurl,
            name: name,
            quantity: quantity,
            price: price,
            description: description,
            id: id
        };
        expect(itemListReducer({}, action)).toEqual({
            [id]: {
                imageurl: imageurl,
                name: name,
                quantity: quantity,
                price: price,
                description: description,
                id: id
            }
        });
    });

    test('Should successfully delete an item', () => {
        action = {
            type: 'DELETE_ITEM',
            id: 1
        };
        expect(itemListReducer(currentState, action)).toEqual({
            2: {
                item: 'Rice',
                imageurl: '',
                quantity: '5',
                price: '5',
                description: 'Bags of Rice',
                id: 2
            }
        });
    });

});