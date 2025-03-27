import { Fragment } from 'react';
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

export default function Resume() {
  return (
    <div className="resume">
      <ResumeHeader
        name="John Doe"
        email="john.doe@gmail.com"
        phone="09030931020"
        address="Tehran, Iran"
      ></ResumeHeader>
      {/* <ResumeBody></ResumeBody> */}
    </div>
  );
}
