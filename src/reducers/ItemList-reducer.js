const reducer = (state = {}, action) => {
    const { id } = action;
    switch (action.type) {
        case 'ADD_ITEM':
            return Object.assign({}, state, {
                [id]: {
                    id: action.id,
                    name: action.name,
                    quantity: action.quantity,
                    price: action.price,
                    description: action.description,
                    imageurl: action.imageurl
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