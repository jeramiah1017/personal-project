import champions from "../champions.json";

const initialState = champions.data
  
  const INIT_CHAMPS = "INIT_CHAMPS";
  
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case INIT_CHAMPS:
        return { ...state, ...action.champs };
      default:
        return state;
    }
  }
  