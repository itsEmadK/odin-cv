import '../styles/educations.css';
import { useState } from 'react';
import eyeIcon from '../assets/eye-outline.svg';
import eyeOffIcon from '../assets/eye-off-outline.svg';
import EducationForm from './EducationForm';

function EducationItem({
  university,
  isShowing,
  onVisibilityToggle,
  onClick,
}) {
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

function EducationList({
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

export default function EducationSection({
  educations,
  onEducationAdded,
  onEducationEdited,
  onEducationDeleted,
  onEducationItemVisibilityToggled,
  hiddenEducationIDs,
}) {
  const [isEducationsExpanded, setIsEducationsExpanded] = useState(true);

  const [isEditingEdu, setIsEditingEdu] = useState(false);
  const [editingEduID, setEditingEduID] = useState(null);
  const [eduFormInfo, setEduFormInfo] = useState({
    university: '',
    field: '',
    city: '',
    startDate: '',
    endDate: '',
  });

  function handleEducationsExpand() {
    setIsEducationsExpanded(!isEducationsExpanded);
  }

  function handleEducationClick(id) {
    setIsEditingEdu(true);
    setEditingEduID(id);
    setEduFormInfo({
      ...educations.find((edu) => edu.id === id),
      id: undefined,
    });
  }

  function handleEducationEdit() {
    if (editingEduID !== null) {
      onEducationEdited({ ...eduFormInfo, id: editingEduID });
    } else {
      onEducationAdded({ ...eduFormInfo });
    }

    setEditingEduID(null);
    setIsEditingEdu(false);
  }

  function handleEducationDelete() {
    onEducationDeleted(editingEduID);
    setEditingEduID(null);
    setIsEditingEdu(false);
  }

  function handleEducationCancelEdit() {
    setEditingEduID(null);
    setIsEditingEdu(false);
  }

  function handleEducationFormChange(formInfo) {
    setEduFormInfo({ ...formInfo });
  }
  return (
    <section className="educations">
      <div
        className={`educations-header ${isEducationsExpanded && 'expanded'}`}
      >
        <h2>Educations</h2>
        <button
          onClick={handleEducationsExpand}
          className={isEducationsExpanded ? 'collapse' : 'expand'}
        ></button>
      </div>

      {isEducationsExpanded && isEditingEdu && (
        <EducationForm
          formInfo={eduFormInfo}
          onCancel={handleEducationCancelEdit}
          onSubmit={handleEducationEdit}
          onDelete={handleEducationDelete}
          onChange={handleEducationFormChange}
        ></EducationForm>
      )}

      {isEducationsExpanded && !isEditingEdu && (
        <EducationList
          educations={educations
            .slice()
            .sort((a, b) => (a.startDate < b.startDate ? -1 : 1))}
          hiddenEducationIDs={hiddenEducationIDs}
          onItemVisibilityToggle={onEducationItemVisibilityToggled}
          onItemClick={handleEducationClick}
        ></EducationList>
      )}

      {!isEditingEdu && (
        <button
          onClick={() => {
            setIsEditingEdu(true);
            setEditingEduID(null);
            setEduFormInfo({
              university: '',
              field: '',
              city: '',
              startDate: '',
              endDate: '',
            });
            setIsEducationsExpanded(true);
          }}
          className="add-edu"
        >
          + Education
        </button>
      )}
    </section>
  );
}
