const reducer = (state = {}, action) => {
    switch(action.type) {
        case 'Authenticated': return {
                ...state, 
                ...action.data,
                logout : false,
            }
        case 'USER_LOGOUT':
            console.debug('LOGOUT') 
            return {
                logout : true
            };
        default: return state;
      }
}

export default reducer;