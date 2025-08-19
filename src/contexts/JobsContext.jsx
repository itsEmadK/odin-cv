import { createContext, useContext, useMemo, useReducer } from 'react';
import { person as sample } from '../person';

const JobsContext = createContext();
const JobsApiContext = createContext();

const initialJobs = sample.jobs;

export const useJobs = () => useContext(JobsContext);
export const useJobsApi = () => useContext(JobsApiContext);

export default function JobsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialJobs);
  const api = useMemo(() => {
    return {
      addJob: (job) => {
        dispatch({ type: 'addJob', job });
      },
      removeJob: (id) => {
        dispatch({ type: 'removeJob', id });
      },
      updateJob: (job) => {
        dispatch({ type: 'updateJob', job });
      },
      setJobs: (jobs) => {
        dispatch({ type: 'setJobs', jobs });
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
    <JobsContext.Provider value={state}>
      <JobsApiContext.Provider value={api}>{children}</JobsApiContext.Provider>
    </JobsContext.Provider>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case 'addJob': {
      const newId = state.jobs.length > 0 ? state.jobs.at(-1).id + 1 : 0;
      return { ...state, jobs: [...state.jobs, { ...action.job, id: newId }] };
    }
    case 'removeJob': {
      return { ...state, jobs: state.jobs.filter((j) => j.id !== action.id) };
    }
    case 'setJobs': {
      return { ...state, jobs: action.jobs };
    }
    case 'updateJob': {
      return {
        ...state,
        jobs: [...state.jobs.filter((j) => j.id !== action.job.id), action.job],
      };
    }
    case 'clear': {
      return {
        ...state,
        jobs: [],
      };
    }
    case 'loadDefaults': {
      return { ...state, jobs: initialJobs };
    }

    default: {
      throw new Error(`${action.type} is not supported.`);
    }
  }
}
