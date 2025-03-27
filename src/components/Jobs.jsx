import '../styles/jobs.css';
import eyeIcon from '../assets/eye-outline.svg';
import eyeOffIcon from '../assets/eye-off-outline.svg';

function JobItem({ company, isShowing, onVisibilityToggle, onClick }) {
  return (
    <li onClick={onClick} className="job-item">
      <h3>{company}</h3>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onVisibilityToggle();
        }}
        className="show"
      >
        <img src={isShowing ? eyeIcon : eyeOffIcon} />
      </button>
    </li>
  );
}

export default function JobsList({ jobs, hiddenJobIDs, onItemVisibilityToggle, onItemClick }) {
  return (
    <ul className="educations">
      {jobs.map((job) => (
        <JobItem
          key={job.id}
          company={job.company}
          isShowing={!hiddenJobIDs.includes(job.id)}
          onVisibilityToggle={() => onItemVisibilityToggle(job.id)}
          onClick={() => onItemClick(job.id)}
        ></JobItem>
      ))}
    </ul>
  );
}
