import { useEducationsApi } from '../contexts/EducationsContext';
import { useJobsApi } from '../contexts/JobsContext';
import { usePersonalDetailsApi } from '../contexts/PersonalDetailsContext';
import '../styles/side-menu.css';

export default function SideMenu({ preferredHeaderPosition = 'top', onPreferredHeaderPosChanged }) {
  const personalDetailsApi = usePersonalDetailsApi();
  const educationsApi = useEducationsApi();
  const jobsApi = useJobsApi();

  const handleClearResume = () => {
    personalDetailsApi.clear();
    jobsApi.clear();
    educationsApi.clear();
  };

  const handleLoadDefaults = () => {
    personalDetailsApi.loadDefaults();
    jobsApi.loadDefaults();
    educationsApi.loadDefaults();
  };

  return (
    <div className="side-menu">
      <div className="buttons-container">
        <button onClick={handleClearResume} className="clear">
          Clear
        </button>
        <button onClick={handleLoadDefaults} className="load">
          Load Sample
        </button>
      </div>
      <div className="layouts-container">
        <button
          onClick={() => onPreferredHeaderPosChanged('top')}
          className={`header-on-top ${preferredHeaderPosition === 'top' ? 'selected' : ''}`}
        ></button>
        <button
          onClick={() => onPreferredHeaderPosChanged('left')}
          className={`header-on-left ${preferredHeaderPosition === 'left' ? 'selected' : ''}`}
        ></button>
        <button
          onClick={() => onPreferredHeaderPosChanged('right')}
          className={`header-on-right ${preferredHeaderPosition === 'right' ? 'selected' : ''}`}
        ></button>
      </div>
    </div>
  );
}
