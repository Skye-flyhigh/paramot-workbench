import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ValidationForm } from '../validation/ValidationForm';
import { InitialDiagnosisStub } from '../diagnosis/InitialDiagnosisStub';
import { LineStrengthStub } from '../strength/LineStrengthStub';
import { TrimMeasurementsStub } from '../measurements/TrimMeasurementsStub';
import { ManufacturerDataStub } from '../manufacturer/ManufacturerDataStub';
import { GeneralInfoStub } from '../general/GeneralInfoStub';

const sectionContent: Record<string, React.ReactNode> = {
  'Service Checklist': <ValidationForm />,
  'Initial Diagnosis': <InitialDiagnosisStub />,
  'Line Strength': <LineStrengthStub />,
  'Trim Measurements': <TrimMeasurementsStub />,
  'Manufacturer Data': <ManufacturerDataStub />,
  'General Info': <GeneralInfoStub />,
};

export function MainLayout() {
  const [activeSection, setActiveSection] = useState('Service Checklist');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 p-6 overflow-auto">
          {sectionContent[activeSection]}
        </main>
      </div>
    </div>
  );
} 