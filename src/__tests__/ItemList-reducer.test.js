import itemListReducer from '../../reducers/ItemList-reducer';

describe('itemListReducer', () => {

    let action;

    const currentState = {
        1: {
            item: 'Watermelons',
            position: '1',
            id: 1
        }, 2: {
            item: 'Rice',
            position: '2',
            id: 2
        }

    }

    const itemData = {
        item: 'Watermelons',
        position: '1',
        id: 1
    };

    test('Should return default state if no action type is recognized', () => {
        expect(itemListReducer({}, { type: null })).toEqual({});
    });

    test('Should successfully add new item data to mainItemList', () => {
        const { item, position, id } = itemData;
        action = {
            type: 'ADD_ITEM',
            item: item,
            position: position,
            key: id
        };
        expect(itemListReducer({}, action)).toEqual({
            [id]: {
                item: item,
                position: position,
                key: id
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
                position: '2',
                id: 2
            }
        });
    });

});

// item: item,
// position: position,
// key: id