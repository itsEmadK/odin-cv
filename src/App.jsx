import './App.css';
import Resume from './components/Resume';
import { person as samplePerson } from './person.js';
import { useState } from 'react';
import PersonalDetailsForm from './components/PersonalDetailsForm.jsx';
import EducationSection from './components/Educations.jsx';
import JobSection from './components/Jobs.jsx';
import SideMenu from './components/SideMenu.jsx';

function App() {
  const [person, setPerson] = useState(samplePerson);

  const educations = person.educations;
  const [hiddenEducationIDs, setHiddenEducationIDs] = useState([]);

  const jobs = person.jobs;
  const [hiddenJobIDs, setHiddenJobIDs] = useState([]);

  const [headerPos, setHeaderPos] = useState('top');

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

  function handleJobVisibilityToggle(id) {
    if (hiddenJobIDs.includes(id)) {
      console.log(hiddenJobIDs.filter((jobID) => jobID !== id));
      setHiddenJobIDs(hiddenJobIDs.filter((jobID) => jobID !== id));
    } else {
      console.log([...hiddenJobIDs, id]);
      setHiddenJobIDs([...hiddenJobIDs, id]);
    }
  }
  function handleJobAdd(jobInfo) {
    let newJobs = jobs;
    const newID =
      jobs.slice().sort((a, b) => (a.id < b.id ? -1 : 1))[jobs.length - 1]
        .id + 1;
    newJobs = [...newJobs, { id: newID, ...jobInfo }];
    setPerson({ ...person, jobs: newJobs });
  }
  function handleJobEdit(jobInfo) {
    let newJobs = jobs;
    const oldJob = jobs.find((job) => job.id === jobInfo.id);
    newJobs = newJobs.filter((job) => job.id !== oldJob.id);
    newJobs = [...newJobs, { id: oldJob.id, ...jobInfo }];
    setPerson({ ...person, jobs: newJobs });
  }
  function handleJobDelete(id) {
    setPerson({
      ...person,
      jobs: person.jobs.filter((job) => job.id !== id),
    });
  }

  function handleHeaderPosChange(pos) {
    setHeaderPos(pos);
  }
  function handleClearResume() {
    setPerson({
      name: '',
      address: '',
      email: '',
      phone: '',
      educations: [],
      jobs: [],
    });
  }
  function handleLoadSample() {
    setPerson({ ...samplePerson });
  }

  return (
    <main>
      <aside>
        <SideMenu
          preferredHeaderPosition={headerPos}
          onClearClicked={handleClearResume}
          onLoadSampleClicked={handleLoadSample}
          onPreferredHeaderPosChanged={handleHeaderPosChange}
        ></SideMenu>
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

        <JobSection
          jobs={jobs}
          onJobAdded={handleJobAdd}
          onJobDeleted={handleJobDelete}
          onJobEdited={handleJobEdit}
          onJobItemVisibilityToggled={handleJobVisibilityToggle}
          hiddenJobIDs={hiddenJobIDs}
        ></JobSection>
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
        headerPosition={headerPos}
      ></Resume>
    </main>
  );
}

export default App;
