import EducationsProvider from './EducationsContext';
import JobsProvider from './JobsContext';
import PersonalDetailsProvider from './PersonalDetailsContext';

export default function ResumeProvider({ children }) {
  return (
    <PersonalDetailsProvider>
      <JobsProvider>
        <EducationsProvider>{children}</EducationsProvider>
      </JobsProvider>
    </PersonalDetailsProvider>
  );
}
