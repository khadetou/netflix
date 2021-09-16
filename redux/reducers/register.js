const initialState = {
  register: null,
  error: null,
  loading: null,
};

export const register = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    default:
      return {
        ...state,
      };
  }
};
