import './App.css';
import Resume from './components/Resume';
import { person as personData } from './person.js';
import { useState } from 'react';
import PersonalDetailsForm from './components/PersonalDetailsForm.jsx';
import EducationList from './components/Educations.jsx';
import JobsList from './components/Jobs.jsx';
import EducationForm from './components/EducationForm.jsx';

function App() {
  const [person, setPerson] = useState(personData);
  const educations = person.educations;
  const [hiddenEducationIDs, setHiddenEducationIDs] = useState([]);
  const [isEducationsExpanded, setIsEducationsExpanded] = useState(true);

  const jobs = person.jobs;
  const [hiddenJobIDs, setHiddenJobIDs] = useState([]);
  const [isJobsExpanded, setIsJobsExpanded] = useState(true);

  const [isEditingEdu, setIsEditingEdu] = useState(false);
  const [editingEduID, setEditingEduID] = useState(null);

  function handlePersonInfoChange(newPerson) {
    setPerson(newPerson);
  }

  function handleEducationVisibilityToggle(id) {
    if (hiddenEducationIDs.includes(id)) {
      setHiddenEducationIDs(
        hiddenEducationIDs.filter((educationID) => educationID !== id)
      );
    } else {
      setHiddenEducationIDs([...hiddenEducationIDs, id]);
    }
  }

  function handleJobVisibilityToggle(id) {
    if (hiddenJobIDs.includes(id)) {
      console.log(hiddenJobIDs.filter((jobID) => jobID !== id));
      setHiddenJobIDs(hiddenJobIDs.filter((jobID) => jobID !== id));
    } else {
      console.log([...hiddenJobIDs, id]);
      setHiddenJobIDs([...hiddenJobIDs, id]);
    }
  }

  function handleEducationsExpand() {
    setIsEducationsExpanded(!isEducationsExpanded);
  }

  function handleEducationClick(id) {
    setIsEditingEdu(true);
    setEditingEduID(id);
  }

  function handleEducationEdit(newEducationInfo) {
    let newEducations = educations;
    if (editingEduID !== null) {
      const oldEducation = educations.find(
        (edu) => edu.id === editingEduID
      );
      newEducations = newEducations.filter(
        (edu) => edu.id !== oldEducation.id
      );
      newEducations = [
        ...newEducations,
        { id: oldEducation.id, ...newEducationInfo },
      ];
    } else {
      const newID =
        educations.slice().sort((a, b) => (a.id < b.id ? -1 : 1))[
          educations.length - 1
        ].id + 1;

      newEducations = [
        ...newEducations,
        { id: newID, ...newEducationInfo },
      ];
    }

    console.log(newEducations);

    setPerson({ ...person, educations: newEducations });
    setEditingEduID(null);
    setIsEditingEdu(false);
  }

  function handleEducationDelete() {
    setPerson({
      ...person,
      educations: person.educations.filter(
        (edu) => edu.id !== editingEduID
      ),
    });
    setEditingEduID(null);
    setIsEditingEdu(false);
  }

  function handleEducationCancelEdit() {
    setEditingEduID(null);
    setIsEditingEdu(false);
  }

  function handleJobsExpand() {
    setIsJobsExpanded(!isJobsExpanded);
  }

  return (
    <main>
      <aside>
        <PersonalDetailsForm
          person={person}
          onChange={handlePersonInfoChange}
        ></PersonalDetailsForm>
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
              education={
                editingEduID !== null
                  ? educations.find((edu) => edu.id === editingEduID)
                  : null
              }
              onCancel={handleEducationCancelEdit}
              onSubmit={handleEducationEdit}
              onDelete={handleEducationDelete}
            ></EducationForm>
          )}

          {isEducationsExpanded && !isEditingEdu && (
            <EducationList
              educations={educations}
              hiddenEducationIDs={hiddenEducationIDs}
              onItemVisibilityToggle={handleEducationVisibilityToggle}
              onItemClick={handleEducationClick}
            ></EducationList>
          )}

          {!isEditingEdu && (
            <button
              onClick={() => {
                setIsEditingEdu(true);
                setEditingEduID(null);
              }}
              className="add-edu"
            >
              + Education
            </button>
          )}
        </section>

        <section className="experience">
          <div className={`jobs-header ${isJobsExpanded && 'expanded'}`}>
            <h2>Experience</h2>
            <button
              onClick={handleJobsExpand}
              className={isJobsExpanded ? 'collapse' : 'expand'}
            ></button>
          </div>
          {isJobsExpanded && (
            <JobsList
              jobs={jobs}
              hiddenJobIDs={hiddenJobIDs}
              onItemVisibilityToggle={handleJobVisibilityToggle}
              onItemClick={(id) => {
                console.log(id);
              }}
            ></JobsList>
          )}
        </section>
      </aside>

      <Resume
        person={{
          ...person,
          educations: person.educations.filter(
            (education) => !hiddenEducationIDs.includes(education.id)
          ),
          jobs: person.jobs.filter(
            (job) => !hiddenJobIDs.includes(job.id)
          ),
        }}
      ></Resume>
    </main>
  );
}

export default App;
