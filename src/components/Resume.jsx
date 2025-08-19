import { useEducations } from '../contexts/EducationsContext';
import { useJobs } from '../contexts/JobsContext';
import { usePersonalDetails } from '../contexts/PersonalDetailsContext';
import '../styles/resume.css';

function ResumeHeader({ name, email, phone, address }) {
  return (
    <div className="header">
      <h1 className="name">{name}</h1>
      <div className="details">
        <p className="email">{email}</p>
        <p className="phone">{phone}</p>
        <p className="address">{address}</p>
      </div>
    </div>
  );
}

function ResumeBody({ educations, jobs }) {
  return (
    <div className="resume-body">
      <div className="educations-container">
        <h2>Education</h2>
        <ul>
          {educations.map((education) => {
            const formattedStartDate = `${education.startDate.getMonth()}/${education.startDate.getFullYear()}`;
            let formattedEndDate = '';
            if (education.endDate) {
              formattedEndDate = `${education.endDate.getMonth()}/${education.endDate.getFullYear()}`;
            } else {
              formattedEndDate = 'present day';
            }
            return (
              <li
                key={
                  education.university +
                  education.startDate +
                  education.endDate +
                  education.city +
                  education.field
                }
                className="education-item"
              >
                <p className="date">
                  {`${formattedStartDate}`} - {formattedEndDate}
                </p>
                <p className="university">{education.university}</p>
                <p className="city">{education.city}</p>
                <p className="field">{education.field}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="jobs-container">
        <h2>Professional Experience</h2>
        <ul>
          {jobs.map((job) => {
            const formattedStartDate = `${job.startDate.getMonth()}/${job.startDate.getFullYear()}`;
            let formattedEndDate = '';
            if (job.endDate) {
              formattedEndDate = `${job.endDate.getMonth()}/${job.endDate.getFullYear()}`;
            } else {
              formattedEndDate = 'present day';
            }

            return (
              <li key={job.company + job.startDate + job.endDate + job.role} className="job-item">
                <p className="date">
                  {formattedStartDate} - {formattedEndDate}
                </p>
                <p className="company">{job.company}</p>
                <p className="location">{job.location}</p>
                <p className="role">{job.role}</p>
                <p className="description">{job.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function Resume({ headerPosition }) {
  let headerPosClassName = '';
  const personalDetails = usePersonalDetails();
  const educations = useEducations();
  const jobs = useJobs();
  if (headerPosition === 'top') {
    headerPosClassName = 'header-on-top';
  } else if (headerPosition === 'left') {
    headerPosClassName = 'header-on-left';
  } else {
    headerPosClassName = 'header-on-right';
  }

  return (
    <div className={'resume ' + headerPosClassName}>
      <ResumeHeader
        name={personalDetails.name}
        email={personalDetails.email}
        phone={personalDetails.phone}
        address={personalDetails.address}
      ></ResumeHeader>
      <ResumeBody educations={educations} jobs={jobs}></ResumeBody>
    </div>
  );
}
