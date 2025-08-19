import { createContext, useContext, useMemo, useReducer } from 'react';
import { person as sample } from '../person';

const PersonalDetailsContext = createContext();
const PersonalDetailsApiContext = createContext();

const initialState = {
  name: sample.name,
  address: sample.address,
  phone: sample.address,
  email: sample.email,
};

export const usePersonalDetails = () => useContext(PersonalDetailsContext);
export const usePersonalDetailsApi = () => useContext(PersonalDetailsApiContext);

export default function PersonalDetailsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const api = useMemo(() => {
    return {
      updateName: (name) => {
        dispatch({ type: 'updateName', name });
      },
      updatePhone: (phone) => {
        dispatch({ type: 'updatePhone', phone });
      },
      updateAddress: (address) => {
        dispatch({ type: 'updateAddress', address });
      },
      updateEmail: (email) => {
        dispatch({ type: 'updateEmail', email });
      },
      updateDetails: (details) => {
        dispatch({ type: 'updateDetails', details });
      },
    };
  }, []);
  return (
    <PersonalDetailsContext.Provider value={state}>
      <PersonalDetailsApiContext value={api}>{children}</PersonalDetailsApiContext>
    </PersonalDetailsContext.Provider>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case 'updateName': {
      return { ...state, name: action.name };
    }
    case 'updatePhone': {
      return { ...state, phone: action.phone };
    }
    case 'updateAddress': {
      return { ...state, address: action.address };
    }
    case 'updateEmail': {
      return { ...state, email: action.email };
    }
    case 'updatePersonalDetails': {
      return action.details;
    }
    default: {
      throw new Error(`${action.type} is not supported.`);
    }
  }
}
