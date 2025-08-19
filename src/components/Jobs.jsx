import '../styles/jobs.css';
import eyeIcon from '../assets/eye-outline.svg';
import eyeOffIcon from '../assets/eye-off-outline.svg';
import JobForm from './JobForm';
import { useState } from 'react';
import { useHiddenJobIds, useJobs, useJobsApi } from '../contexts/JobsContext';

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

function JobsList({ jobs, hiddenJobIDs, onItemVisibilityToggle, onItemClick }) {
  return (
    <ul className="jobs">
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

export default function JobSection() {
  const jobs = useJobs();
  const hiddenJobIds = useHiddenJobIds();
  const jobsApi = useJobsApi();

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
    if (editingJobID !== null) {
      jobsApi.updateJob({ ...jobFormInfo, id: editingJobID });
    } else {
      jobsApi.addJob({ ...jobFormInfo });
    }

    setEditingJobID(null);
    setIsEditingJob(false);
  }

  function handleJobDelete() {
    jobsApi.removeJob(editingJobID);
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

  function handleJobVisibilityToggle(id) {
    jobsApi.toggleJobVisibility(id);
  }

  return (
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
          jobs={jobs.slice().sort((a, b) => (a.startDate < b.startDate ? -1 : 1))}
          hiddenJobIDs={hiddenJobIds}
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
  );
}
