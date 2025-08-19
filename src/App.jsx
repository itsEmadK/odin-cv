import './App.css';
import Resume from './components/Resume';
import { useState } from 'react';
import PersonalDetailsForm from './components/PersonalDetailsForm.jsx';
import EducationSection from './components/Educations.jsx';
import JobSection from './components/Jobs.jsx';
import SideMenu from './components/SideMenu.jsx';
import ResumeProvider from './contexts/ResumeContext.jsx';

function App() {
  const [headerPos, setHeaderPos] = useState('top');

  function handleHeaderPosChange(pos) {
    setHeaderPos(pos);
  }

  return (
    <ResumeProvider>
      <main>
        <aside>
          <SideMenu
            preferredHeaderPosition={headerPos}
            onPreferredHeaderPosChanged={handleHeaderPosChange}
          ></SideMenu>
          <PersonalDetailsForm />
          <EducationSection />

          <JobSection />
        </aside>

        <Resume headerPosition={headerPos}></Resume>
      </main>
    </ResumeProvider>
  );
}

export default App;
