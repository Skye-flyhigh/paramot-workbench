# Product Requirements Document (PRD)

**Project Name:** paraMOT
**Version**: Phase Two
**Author**: Skye.cmd & Nyx
**Date**: 2025-06-06

## Overview

paraMOT is a local-first, offline-capable technician tool built to support the servicing, inspection, and certification of paragliders. This tool is designed to augment technician judgment while maintaining strict safety protocols. It operates in a workshop environment without requiring constant internet access, allowing certified service professionals to document inspections, record defects, log repairs, and generate summary reports with a focus on safety and accountability.

This is a focused, minimal Phase One implementation designed to be extended in future iterations or connected to a cloud-based frontend later.

## Core Principles

1. **Safety First**: Every feature must implement explicit APPI validation and manufacturer safety thresholds
2. **Technician Augmentation**: Support technician decisions with APPI methodology and manufacturer specifications
3. **Explicit Validation**: Implement APPI compliance checks with clear pass/fail states
4. **Adaptive Support**: Provide context-specific guidance based on glider model and certification class
5. **Accountability**: Track all safety decisions with technician signatures and version history
6. **Continuous Improvement**: Log workshop patterns and technician feedback for validation rules
7. **Manufacturer Compliance**: Implement manufacturer-specific validation rules and thresholds
8. **Certification Standards**: Enforce EN/LTF/DHV certification requirements with explicit checks
9. **APPI Methodology**: Implement APPI inspection protocols with measurement validation
10. **Data Integrity**: Track all manufacturer data changes with version control and audit trails
11. **Custom Data Integrity**: Validate technician-added data against APPI standards
12. **Validation Transparency**: Document data sources and validation methods with confidence levels
13. **Workshop Knowledge**: Capture workshop expertise with pattern recognition and feedback loops

## Goals

- Provide a functional offline app for paraglider service operations
- Ensure safety through explicit validation and checkpoints
- Support technician judgment with adaptive decision support
- Allow efficient inspection, logging, and report generation
- Ensure data persistence and local backup safety
- Avoid premature over-engineering or entanglement with customer-facing systems
- Enable safe addition of missing manufacturer data
- Maintain data integrity with custom entries
- Preserve workshop knowledge and experience
- Support technician judgment in data validation

## Key Features (Phase One)

### A. Reference Data Architecture (Foundation)

#### 1. Manufacturer data

- **Glider Models**
  - Brand, model name, certification class (EN/LTF/DHV)
  - Link to glider manual and model webpage
  - Associated line set ID(s)
  - Riser configuration and trim measurement protocol
  - Manufacturer-specific service requirements
  - Certification history and updates
  - Known service bulletins or recalls
  - Material specifications (fabric type, line material)
  - Maximum service life recommendations
  - Storage and maintenance guidelines

- **Glider Sizes**
  - Size name (e.g. S, M, L)
  - Weight range (all-up weight)
  - Flat/projected surface area
  - Recommended pilot weight range
  - Certification class per size (if different)

- **Line Set**
  - Line types and cascade groups (e.g. A1, B3)
  - Material used (Aramid, Dyneema)
  - Lengths per size and grouping structure
  - Trim reference: from knot / riser / cloth depending on glider
  - Line diameter specifications
  - Breaking strength requirements
  - UV degradation indicators
  - Line material age limits
  - Manufacturer-specific line maintenance guidelines
  - APPI load distribution rules
  - Line strength thresholds
  - Measurement protocols
  - Validation history
  - Version control

- **Trim Rules**
  - Measurement reference point
  - Acceptable differentials (aspect-ratio-based, e.g. ±10mm for A.R. 6.44)
  - Loop type mapping (1-5 complexity scale)
  - Manufacturer-specific trim tolerances
  - Certification class trim requirements
  - Performance vs stability trim guidelines
  - Line length adjustment protocols
  - Riser adjustment specifications
  - APPI differential method (A-B, A-C per group)
  - Profile type definitions
  - Measurement validation (deviation, differential, correction loop suggestion)
  - Correction history
  - Airworthiness criteria

#### 1.1 Custom Manufacturer Data Entry
- **Technician-Added Manufacturer Data**
  - Allow technicians to add missing glider models
  - Require explicit validation and documentation
  - Maintain version control and audit trail
  - Support manual data entry with safety checks
  - Enable PDF manual upload and parsing

- **Data Entry Requirements**
  - Mandatory fields:
    - Brand and model name
    - Certification class (EN/LTF/DHV)
    - Line set configuration
    - Trim measurement protocol
    - Material specifications
    - Safety thresholds
  - Optional fields:
    - Manual URL
    - Service bulletins
    - Known issues
    - Special requirements

- **Validation Process**
  - Technician must provide:
    - Source of information (manual, manufacturer contact, etc.)
    - Confidence level in data accuracy
    - Verification method used
    - Any assumptions made
  - System must:
    - Flag custom entries in UI
    - Require explicit technician confirmation
    - Document data source and validation
    - Track modification history
    - Allow future updates

- **Safety Considerations**
  - Custom data must pass APPI validation
  - Critical measurements require verification
  - Safety thresholds must be explicit
  - Technician must acknowledge responsibility
  - System must track data confidence level

- **Workshop Integration**
  - Allow workshop-specific custom data
  - Support data sharing between technicians
  - Enable manual updates and corrections
  - Track usage and validation history
  - Maintain safety narrative

#### 1.2 Custom Data Management
- **Data Entry Interface**
  - Structured form for manufacturer data
  - Validation rules based on APPI methodology
  - Safety threshold configuration
  - Manual upload support
  - Source documentation

- **Validation System**
  - APPI compliance checks
  - Safety threshold validation
  - Measurement protocol verification
  - Cross-reference with known data
  - Confidence scoring

- **Workshop Integration**
  - Workshop-specific custom data
  - Technician validation tracking
  - Usage history and feedback
  - Update management
  - Safety narrative integration

- **Safety Documentation**
  - Data source verification
  - Validation method documentation
  - Technician confidence level
  - Safety implications
  - Update history

### B. Inspection Session Workflow

- Create a new inspection session per paraglider
- Assign unique inspection ID (auto-generated)
- Select glider model + size from dropdown or custom input (manufacturer data)
- Record:
  - Date (ISO 8601 format)
  - Technician name (with signature validation)
  - Serial number / customer reference
  - Current glider inspection information
  - **Aspect ratio (A.R.) and group structure for trim validation**
  - **Input both manufacturer spec and measured values for each group**
- Implement safety checkpoints:
  - Pre-inspection validation against APPI standards
  - Critical measurement verification with pass/fail states
  - Risk assessment matrix with explicit thresholds
  - Technician confidence scoring (1-5 scale)
  - **APPI checklist integration (see real-world example)**
- Adaptive support features:
  - Context-specific decision trees based on glider model
  - Experience-level appropriate guidance with APPI methodology
  - Workshop pattern recognition with validation history
  - Collaborative decision support with technician signatures
  - **Correction loop suggestion and tracking**

### C. Condition Logging - Initial Diagnosis

- Enhanced checklist-based inspection with:
  - Decision trees implementing APPI methodology
  - Safety validation with pass/fail states
  - Technician confidence scoring (1-5 scale)
  - Risk assessment matrix with explicit thresholds
  - Cross-validation against manufacturer specifications
  - Certification class specific requirements with validation rules
  - APPI methodology validation with measurement protocols
  - Manufacturer-specific rules with safety thresholds
  - Measurement protocol compliance with APPI standards
  - Safety validation history with version tracking
  - **Trim validation: aspect-ratio-based, group differentials, correction loop suggestion**
- Measurement system:
  - APPI measurement protocols with validation rules
  - Real-time validation against manufacturer specs
  - Anomaly detection with threshold alerts
  - Historical comparison with version history
  - Calibration verification with technician signature
  - Manufacturer-specific tolerances with pass/fail states
  - Certification class requirements with validation rules
  - APPI load distribution with percentage thresholds
  - Line strength thresholds with safety factors
  - Measurement method validation with APPI standards
  - Profile type detection with explicit classification
- Trim assessment:
  - Line length differentials with APPI methodology
  - Profile shape analysis with explicit classification
  - Loop complexity classification (1-5 scale)
  - Performance vs stability evaluation with thresholds
  - Manufacturer trim guidelines with validation rules
  - Certification class requirements with pass/fail states
- Optional image attachments (local file only, max 5MB per image)
- Technician feedback integration:
  - Decision rationale with signature validation
  - Experience-based insights with confidence scoring
  - Workshop-specific patterns with validation history
  - Safety narrative generation with APPI methodology
  - Certification compliance documentation with version tracking
  
### D. Repair Log

- For each session:
  - Add multiple repair entries with:
    - Type of repair (dropdown or free text)
      - Cloth: patch with ripstop, partial panel change, complete panel change
      - Line: change
    - Parts used
    - Technician initials
    - Safety validation steps
    - Risk assessment
    - Decision rationale
    - Workshop-specific insights

### E. Report Generation

- Generate a local PDF summary for each glider
  - Includes inspection results with APPI validation
  - Repairs with technician signatures
  - Safety clearance documentation with version history
  - Risk assessment summary with explicit thresholds
  - Critical point highlighting with pass/fail states
  - Technician certification verification with signature
  - Decision rationale with APPI methodology
  - Workshop-specific insights with confidence scoring
  - Safety narrative with validation history
  - Optional images (max 5MB each)
  - Saved to local storage with checksum verification
  - Printable with APPI-compliant layout

### F. Data Management

- All data saved to a local SQLite database
- Basic CRUD operations (Create, Read, Update, Delete) for inspection sessions
- Auto-save on field change
- Export database backup manually (JSON or full DB file)

## Tech Stack (Suggested)

- **Frontend**: Electron + React (Shadcn + Tailwind for UI)
- **Backend**: Local SQLite via Prisma (Node.js)
- **Filesystem**: Node's FS module for image storage + PDF generation
- **State**: React + Zustand (optional)
- **PDF**: jsPDF or similar

## Out of Scope (for Phase One)

- Authentication or user accounts
- Cloud sync or multi-device support
- Customer frontend portal
- Email/report sending
- Mobile responsiveness
These may be addressed in a future PRD for paraMOT.Cloud.

## Development Strategy

- **Approach**: Vertical Slice — implement end-to-end APPI validation for one feature at a time
- **Priority Order**:
    1. Safety Validation Layer with APPI methodology
    2. APPI Methodology Implementation with measurement protocols
    3. Manufacturer Data Versioning with audit trails
    4. Reference Data Model with validation rules
    5. Inspection Session UI with APPI checkpoints
    6. Decision Support System with manufacturer specs
    7. Condition Logger with APPI validation
    8. Repair Log with safety documentation
    9. PDF Generator with APPI-compliant layout
    10. File/Image Upload with size limits
    11. Technician Feedback Integration with signatures
    12. Workshop Pattern Recognition with validation history

## Safety Implementation Strategy

1. **Phase 1: Explicit Safety**
   - Implement APPI validation rules
   - Add explicit checkpoints with pass/fail states
   - Establish APPI measurement protocols
   - Create decision trees with manufacturer specs
   - Implement APPI methodology with validation
   - Set up manufacturer rule engine with thresholds

2. **Phase 2: Adaptive Support**
   - Add context-specific decision support
   - Implement technician feedback with signatures
   - Develop workshop pattern recognition
   - Create safety narratives with APPI methodology
   - Add measurement validation with thresholds
   - Implement profile detection with classification

3. **Phase 3: Integration**
   - Combine APPI and manufacturer validation
   - Refine based on workshop feedback
   - Enhance safety protocols with thresholds
   - Expand decision support with signatures
   - Validate APPI compliance with version history
   - Verify manufacturer rules with audit trails

## Naming & Identity

The system is called paraMOT — practical, localized, and context-aware.
This may evolve into a larger ecosystem: paraMOT.Core, paraMOT.Cloud, etc.

## Notes

- App must run on macOS and Windows without complex setup
- No login screens, no fluff
- Offline by design, robust by temperament
- Safety-first approach in all features
- Technician judgment augmentation as core principle
- Explicit validation with adaptive support
- Future extensibility kept in mind but not implemented prematurely

## Phase Two Preview — Specialized Analysis Modules

### **Trim Analysis & Correction Engine**

- Record measured line lengths and compute differentials A-B, A-C, A-D
- Calculate profile shape (Reflex / Accelerated / Stable / Unstable)
- Detect banana shapes, collapse-prone layouts, or reflex-confirming profiles
- Record number of loops at intake (arrival state)
- Suggest loop corrections (add/remove) based on lowest reference point
- Classify loop types: 1-5 complexity scale
  - Level 1: Simple loop
  - Level 2: Double loop
  - Level 3: Lark's foot
  - Level 4: Lark's foot and a loop
  - Level 5: Multi staged loop in the cascade
- Visual representation of current vs target line profile
- Loop correction table suggestion
- Technician override based on intent (glide performance vs stability)
- Warn about excessive loop stacking / overlooping
- Manufacturer-specific trim guidelines
- Certification class requirements

### **Line strength estimation and testing Engine**

### **Cloth Analysis Engine**

- Input porosity time and Bettsometer test results
- Evaluate pass/fail thresholds based on standards
- Allow technician to add visual inspection input
- Determine cloth health score and degradation rating
- Panel-level logging: top/bottom surface, panel zone, repair flag (yes/no)
- Visual layout of cloth with condition overlay (future UI)
- Reserve Parachute Inspection & Repack Module
- Diagnostic checklist for reserve parachute condition
- Fields for age, fabric status, spring, deployment speed
- Technician notes per stage (opening, inspection, repack)
- Final checklist + signature block
- PDF repack certificate generation

### **Harness Check Module**

- Harness inspection: buckles, stitching, straps, back protection
- Damage or wear tagging per part
- Checklist per harness type (ABS, T-Lock, pod)
- Image input for flagged areas
- Service log + technician signoff

This PRD is live and modular. Updates will be versioned alongside implementation.

## Glossary

### Technical Terms
- **Loop Complexity Scale**: Classification system for line attachment methods (1-5)
  - Level 1: Simple loop
  - Level 2: Double loop
  - Level 3: Lark's foot
  - Level 4: Lark's foot with loop
  - Level 5: Multi-staged cascade loop
- **Cascade Group**: Line attachment grouping (e.g., A1, B3) that distributes load across the wing
- **Bettsometer**: Device measuring fabric air permeability (porosity)
- **Profile Shape**: Wing cross-section classification (Reflex/Accelerated/Stable/Unstable)
- **Trim System**: Riser adjustment mechanism affecting wing angle of attack
- **APPI**: Advanced Paraglider Performance Inspection methodology
- **EN/LTF/DHV**: European certification standards for paragliders

### Measurement Terms
- **Line Length Differential**: Difference between line lengths (A-B, A-C, A-D)
- **Porosity**: Air permeability measurement of fabric
- **UV Degradation**: Material breakdown from ultraviolet exposure
- **Breaking Strength**: Maximum load capacity of lines
- **All-up Weight**: Total system weight (pilot + equipment)

### Safety Terms
- **Safety Narrative**: Documented chain of safety decisions and validations
- **Critical Points**: Key safety checkpoints requiring explicit validation
- **Airworthiness**: Overall assessment of glider safety for flight
- **Service Bulletin**: Manufacturer-issued safety or maintenance notice

### New Terms
- **APPI Differential Method**: Validation method comparing A–B and A–C for each group, with aspect-ratio-based tolerance (e.g. ±10mm for A.R. 6.44). Correction loops are suggested if out of tolerance.
- **Correction Loop**: A loop added to a line to adjust its length, typically correcting by ~10mm per loop.

## Security Considerations

### Data Integrity
- Local SQLite database with transaction support
- Automatic backup on critical operations
- Version control for manufacturer data
- Audit trail for safety-critical changes
- Checksum verification for critical data

### Access Control
- Local user identification (technician initials)
- Session-based access tracking
- Read-only mode for completed inspections
- Export protection for safety-critical data
- Audit logging for all safety validations

### Anti-Tampering
- Checksum verification for manufacturer data
- Validation state protection
- Safety narrative integrity checks
- Measurement history protection
- Report generation audit trail

## Out of Scope (for Phase One)

### Explicitly Excluded
- Authentication or user accounts
- Cloud sync or multi-device support
- Customer frontend portal
- Email/report sending
- Mobile responsiveness
- User management system
- Permission hierarchies
- Multi-user concurrent access

### Future Considerations
- Local user management (technician profiles)
- Basic permission controls
- Workshop-specific access rules
- Technician certification tracking
- Multi-user collaboration features

## Future Extensibility

### Planned Modules
- Reserve Parachute Inspection System
- Harness Inspection Module
- Cloud Sync Integration
- Customer Portal
- Technician Management
- Workshop Analytics
- Manufacturer Integration
- Certification Tracking

### Integration Points
- Cloud sync architecture
- Customer communication
- Technician credentialing
- Workshop management
- Manufacturer updates
- Certification compliance
- Safety documentation
- Analytics engine
