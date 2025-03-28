import './App.css';
import Resume from './components/Resume';
import { person as personData } from './person.js';
import { useState } from 'react';
import PersonalDetailsForm from './components/PersonalDetailsForm.jsx';
import EducationList from './components/Educations.jsx';
import JobsList from './components/Jobs.jsx';
import EducationForm from './components/EducationForm.jsx';
import JobForm from './components/JobForm.jsx';
import EducationSection from './components/Educations.jsx';

function App() {
  const [person, setPerson] = useState(personData);
  const educations = person.educations;
  const [hiddenEducationIDs, setHiddenEducationIDs] = useState([]);

  const jobs = person.jobs;
  const [hiddenJobIDs, setHiddenJobIDs] = useState([]);
  const [isJobsExpanded, setIsJobsExpanded] = useState(true);

  const [isEditingJob, setIsEditingJob] = useState(false);
  const [editingJobID, setEditingJobID] = useState(null);
  const [jobFormInfo, setJobFormInfo] = useState({
    company: '',
    role: '',
    location: '',
    description: '',
    startDate: '',
    endDate: '',
  });

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

  function handleEducationEdit(educationInfo) {
    let newEducations = educations;
    const oldEducation = educations.find(
      (edu) => edu.id === educationInfo.id
    );
    newEducations = newEducations.filter(
      (edu) => edu.id !== oldEducation.id
    );
    newEducations = [
      ...newEducations,
      { id: oldEducation.id, ...educationInfo },
    ];
    setPerson({ ...person, educations: newEducations });
  }

  function handleEducationAdd(educationInfo) {
    let newEducations = educations;
    const newID =
      educations.slice().sort((a, b) => (a.id < b.id ? -1 : 1))[
        educations.length - 1
      ].id + 1;
    newEducations = [...newEducations, { id: newID, ...educationInfo }];
    setPerson({ ...person, educations: newEducations });
  }

  function handleEducationDelete(id) {
    setPerson({
      ...person,
      educations: person.educations.filter((edu) => edu.id !== id),
    });
  }

  function handleJobsExpand() {
    setIsJobsExpanded(!isJobsExpanded);
  }

  function handleJobClick(id) {
    setIsEditingJob(true);
    setEditingJobID(id);
    setJobFormInfo({
      ...jobs.find((job) => job.id === id),
      id: undefined,
    });
  }

  function handleJobEdit() {
    let newJobs = jobs;
    if (editingJobID !== null) {
      const oldJob = jobs.find((job) => job.id === editingJobID);
      newJobs = newJobs.filter((job) => job.id !== oldJob.id);
      newJobs = [...newJobs, { id: oldJob.id, ...jobFormInfo }];
    } else {
      const newID =
        jobs.slice().sort((a, b) => (a.id < b.id ? -1 : 1))[
          jobs.length - 1
        ].id + 1;

      newJobs = [...newJobs, { id: newID, ...jobFormInfo }];
    }

    setPerson({ ...person, jobs: newJobs });
    setEditingJobID(null);
    setIsEditingJob(false);
  }

  function handleJobDelete() {
    setPerson({
      ...person,
      jobs: person.jobs.filter((job) => job.id !== editingJobID),
    });
    setEditingJobID(null);
    setIsEditingJob(false);
  }

  function handleJobCancelEdit() {
    setEditingJobID(null);
    setIsEditingJob(false);
  }

  function handleJobFormChange(formInfo) {
    setJobFormInfo({ ...formInfo });
  }

  return (
    <main>
      <aside>
        <PersonalDetailsForm
          person={person}
          onChange={handlePersonInfoChange}
        ></PersonalDetailsForm>
        <EducationSection
          educations={educations}
          onEducationAdded={handleEducationAdd}
          onEducationDeleted={handleEducationDelete}
          onEducationItemVisibilityToggled={
            handleEducationVisibilityToggle
          }
          onEducationEdited={handleEducationEdit}
          hiddenEducationIDs={hiddenEducationIDs}
        ></EducationSection>

        <section className="experience">
          <div className={`jobs-header ${isJobsExpanded && 'expanded'}`}>
            <h2>Experience</h2>
            <button
              onClick={handleJobsExpand}
              className={isJobsExpanded ? 'collapse' : 'expand'}
            ></button>
          </div>

          {isJobsExpanded && isEditingJob && (
            <JobForm
              formInfo={jobFormInfo}
              onCancel={handleJobCancelEdit}
              onSubmit={handleJobEdit}
              onDelete={handleJobDelete}
              onChange={handleJobFormChange}
            ></JobForm>
          )}

          {isJobsExpanded && !isEditingJob && (
            <JobsList
              jobs={jobs
                .slice()
                .sort((a, b) => (a.startDate < b.startDate ? -1 : 1))}
              hiddenJobIDs={hiddenJobIDs}
              onItemVisibilityToggle={handleJobVisibilityToggle}
              onItemClick={handleJobClick}
            ></JobsList>
          )}

          {!isEditingJob && (
            <button
              onClick={() => {
                setIsEditingJob(true);
                setEditingJobID(null);
                setIsJobsExpanded(true);
                setJobFormInfo({
                  company: '',
                  role: '',
                  location: '',
                  description: '',
                  startDate: '',
                  endDate: '',
                });
              }}
              className="add-job"
            >
              + Experience
            </button>
          )}
        </section>
      </aside>

      <Resume
        person={{
          ...person,
          educations: person.educations
            .filter(
              (education) => !hiddenEducationIDs.includes(education.id)
            )
            .slice()
            .sort((a, b) => (a.startDate < b.startDate ? -1 : 1)),
          jobs: person.jobs
            .filter((job) => !hiddenJobIDs.includes(job.id))
            .slice()
            .sort((a, b) => (a.startDate < b.startDate ? -1 : 1)),
        }}
      ></Resume>
    </main>
  );
}

export default App;
