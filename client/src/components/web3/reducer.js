export default (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_NETWORK_ID":
      return {
        ...state,
        networkId: action.payload,
      };
    case "SET_ACCOUNT":
      return {
        ...state,
        account: action.payload,
      };
    case "SET_CONTRACTS":
      return {
        ...state,
        contracts: action.payload,
      };
    case "SET_LOANS":
      return {
        ...state,
        loans: action.payload,
      };
    case "SET_ROLES":
      return {
        ...state,
        isDaoDelegator: action.payload.isDaoDelegator,
        isDaoMember: action.payload.isDaoMember,
      };
    case "CLEAR_STATE":
      return action.payload;
    default:
      return state;
  }
};
