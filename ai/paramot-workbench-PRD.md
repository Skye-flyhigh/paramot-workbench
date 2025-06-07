# Product Requirements Document (PRD)

**Project Name:** paraMOT
**Version**: Phase One
**Author**: Skye.cmd & Nyx
**Date**: 2025-06-06

## Overview

paraMOT is a local-first, offline-capable technician tool built to support the servicing, inspection, and certification of paragliders. This tool is intended to operate in a workshop environment without requiring constant internet access. It will allow certified service professionals to document inspections, record defects, log repairs, and generate summary reports.

This is a focused, minimal Phase One implementation designed to be extended in future iterations or connected to a cloud-based frontend later.

## Goals

- Provide a functional offline app for paraglider service operations
- Allow efficient inspection, logging, and report generation
- Ensure data persistence and local backup safety
- Avoid premature over-engineering or entanglement with customer-facing systems

## Key Features (Phase One)

### A. Reference Data Architecture (Foundation)

#### 1. Manufacturer data

- **Glider Models**
  - Brand, model name, certification class
  - Link to glider manual and model webpage
  - Associated line set ID(s)
  - Riser configuration and trim measurement protocol
- **Glider Sizes**
  - Size name (e.g. S, M, L)
  - Weight range
  - Flat/projected surface area
- **Line Set**
  - Line types and cascade groups (e.g. A1, B3)
  - Material used (Aramid, Dyneema)
  - Lengths per size and grouping structure
  - Trim reference: from knot / riser / cloth depending on glider
- **Trim Rules**
  - Measurement reference point
  - Acceptable differentials
  - Loop type mapping (loop vs lark’s foot, further more complicated loops and upper cascading looping)

#### 2. Workshop Data

- **Customer Database**
  - Customer name, contact info, address
  - Equipment dropped off (glider, harness, reserve)
  - Requested services (inspection, repack, repair, etc.)
  - Timestamp of drop-off and expected deadline
  - Delivery vs in-person pickup flag
  - Invoices and report history

- **Glider Service Records**
  - All gliders serviced and tied inspection sessions
  - Initial diagnosis (fabric, stitching, risers, lines)
    - Fabric: porosity, visual, tear resistance (Bettsometer)
    - Line: visual, strength (destructive / non-destructive testing)
    - Logic to calculate applied test weight and thresholds (based on APPI tables)

- **Workshop Tools Database**
  - Tool description, type (laser, rail, measuring devices)
  - Calibration history and timestamps
  - Dispersion tracking (especially for laser measurement variability)

> Additional modules for reserve systems, connectors, and harness inspection will be planned in later PRD phases.

### B. Inspection Session Workflow

- Create a new inspection session per paraglider
- Assign unique inspection ID (auto-generated)
- Select glider model + size from dropdown or custom input (manufacturer data)
- Record:
  - Date
  - Technician name
  - Serial number / customer reference
  - current glider inspection information

### C. Condition Logging - Initial Diagnosis

- Checklist-based inspection with the ability to mark:
  - Lines: visual, strength assessment (destructive or non destructive), Passed / Replace / Comment
  - Fabric: Porosity values + visual condition + strength (Bettsometer)
  - Stitching: OK / Warning / Critical
  - Risers: OK / Warning / Critical
  - Initial trim: measured by hand laser / rail / differential tool
- Optional image attachments (local file only)
  
### D. Repair Log

- For each session:
  - Add multiple repair entries with:
    - Type of repair (dropdown or free text)
      - Cloth: patch with ripstop, partial panel change, complete panel change
      - Line: change
    - Parts used
    - Technician initials

### E. Report Generation

- Generate a local PDF summary for each glider
  - Includes inspection results, repairs, technician notes
  - Option to include images
  - Saved to local storage, printable

### F. Data Management

- All data saved to a local SQLite database
- Basic CRUD operations (Create, Read, Update, Delete) for inspection sessions
- Auto-save on field change
- Export database backup manually (JSON or full DB file)

## Tech Stack (Suggested)

- **Frontend**: Electron + React (Shadcn + Tailwind for UI)
- **Backend**: Local SQLite via Prisma (Node.js)
- **Filesystem**: Node’s FS module for image storage + PDF generation
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

- **Approach**: Vertical Slice — build end-to-end flow for one feature at a time
- **Priority Order**:
    1. Reference Data Model
    2. Inspection Session UI
    3. Condition Logger
    4. Repair Log
    5. PDF Generator
    6. File/Image Upload

## Naming & Identity

The system is called paraMOT — practical, localized, and context-aware.
This may evolve into a larger ecosystem: paraMOT.Core, paraMOT.Cloud, etc.

## Notes

- App must run on macOS and Windows without complex setup
- No login screens, no fluff
- Offline by design, robust by temperament
- Future extensibility kept in mind but not implemented prematurely

## Phase Two Preview — Specialized Analysis Modules

### **Trim Analysis & Correction Engine**

- Record measured line lengths and compute differentials A-B, A-C, A-D
- Calculate profile shape (Reflex / Accelerated / Stable / Unstable)
- Detect banana shapes, collapse-prone layouts, or reflex-confirming profiles
- Record number of loops at intake (arrival state)
- Suggest loop corrections (add/remove) based on lowest reference point
- Classify loop types: simple loop vs lark’s foot
- Visual representation of current vs target line profile
- Loop correction table suggestion
- Technician override based on intent (glide performance vs stability)
- Warn about excessive loop stacking / overlooping

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
