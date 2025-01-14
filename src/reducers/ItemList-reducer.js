const reducer = (state = {}, action) => {
    const { item, position, id } = action;
    switch (action.type) {
        case 'ADD_ITEM':
            return Object.assign({}, state, {
                [id]: {
                    item: item,
                    position: position,
                    key: id
                }
            });
        case 'DELETE_ITEM':
            const newState = { ...state };
            delete newState[id];
            return newState;
        default:
            return state;
    }
};

export default reducer;