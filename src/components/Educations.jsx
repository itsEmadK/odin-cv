import '../styles/educations.css';
import eyeIcon from '../assets/eye-outline.svg';
import eyeOffIcon from '../assets/eye-off-outline.svg';

function EducationItem({ university, isShowing, onVisibilityToggle, onClick }) {
  return (
    <li onClick={onClick} className="education-item">
      <h3>{university}</h3>
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

export default function EducationList({
  educations,
  hiddenEducationIDs,
  onItemVisibilityToggle,
  onItemClick,
}) {
  return (
    <ul className="educations">
      {educations.map((education) => (
        <EducationItem
          key={education.id}
          university={education.university}
          isShowing={!hiddenEducationIDs.includes(education.id)}
          onVisibilityToggle={() => onItemVisibilityToggle(education.id)}
          onClick={() => onItemClick(education.id)}
        ></EducationItem>
      ))}
    </ul>
  );
}
