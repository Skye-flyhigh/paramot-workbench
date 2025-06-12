import { useState } from 'react';
import { cn } from '@/lib/utils';

const sections = [
  'Service Checklist',
  'Initial Diagnosis',
  'Line Strength',
  'Trim Measurements',
  'Manufacturer Data',
  'General Info',
];

export function Sidebar({ activeSection, onSectionChange }: {
  activeSection: string;
  onSectionChange: (section: string) => void;
}) {
  return (
    <nav className="flex flex-col gap-2 w-56 min-h-screen bg-muted p-4 border-r">
      {sections.map(section => (
        <button
          key={section}
          className={cn(
            'text-left px-4 py-2 rounded transition-colors',
            activeSection === section
              ? 'bg-primary text-primary-foreground font-semibold'
              : 'hover:bg-accent hover:text-accent-foreground'
          )}
          onClick={() => onSectionChange(section)}
        >
          {section}
        </button>
      ))}
    </nav>
  );
} 