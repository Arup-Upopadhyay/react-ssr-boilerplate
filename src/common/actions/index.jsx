const __selectUser = (user) => {
    return {
        type: 'USER_SELECTED',
        payload: user,
    };
};

export const selectUser = (user) => {
    return (dispatch) => {
        setTimeout(() => {
            debugger;
            dispatch(__selectUser(user));
        }, 0);
    };
};
