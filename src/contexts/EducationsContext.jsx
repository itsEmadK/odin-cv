import { createContext, useContext, useMemo, useReducer } from 'react';
import { person as sample } from '../person';

const EducationsContext = createContext();
const EducationsApiContext = createContext();

const initialEducations = sample.educations;

export const useEducations = () => useContext(EducationsContext);
export const useEducationsApi = () => useContext(EducationsApiContext);

export default function EducationsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialEducations);
  const api = useMemo(() => {
    return {
      addEducation: (education) => {
        dispatch({ type: 'addEducation', education });
      },
      removeEducation: (id) => {
        dispatch({ type: 'removeEducation', id });
      },
      updateEducation: (education) => {
        dispatch({ type: 'updateEducation', education });
      },
      setEducations: (educations) => {
        dispatch({ type: 'setEducations', educations });
      },
      clear: () => {
        dispatch({ type: 'clear' });
      },
      loadDefaults: () => {
        dispatch({ type: 'loadDefault' });
      },
    };
  }, []);

  return (
    <EducationsContext.Provider value={state}>
      <EducationsApiContext.Provider value={api}>{children}</EducationsApiContext.Provider>
    </EducationsContext.Provider>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case 'addEducation': {
      const newId = state.educations.length > 0 ? state.educations.at(-1).id + 1 : 0;
      return { ...state, educations: [...state.educations, { ...action.education, id: newId }] };
    }
    case 'removeEducation': {
      return { ...state, educations: state.educations.filter((e) => e.id !== action.id) };
    }
    case 'setEducations': {
      return { ...state, educations: action.educations };
    }
    case 'updateEducation': {
      return {
        ...state,
        educations: [
          ...state.educations.map((e) => (e.id === action.education.id ? action.education : e)),
          action.education,
        ],
      };
    }
    case 'clear': {
      return {
        ...state,
        educations: [],
      };
    }
    case 'loadDefaults': {
      return { ...state, educations: initialEducations };
    }

    default: {
      throw new Error(`${action.type} is not supported.`);
    }
  }
}
