# paraMOT Implementation Plan (Refactored)

## Overview
This plan follows a Safety-First Vertical Slice approach, optimized for real-world workshop constraints and robust Electron architecture. Each slice delivers a complete, safety-validated feature while maximizing efficiency and data integrity.

## Development Environment Setup

### 1. Workshop-Efficient Tooling
- [x] React + Electron setup
- [x] TypeScript configuration
- [x] Tailwind CSS integration
- [x] Shadcn/ui component library
- [x] Path aliases for code organization
- [x] Development server configuration
- [x] Prisma ORM with SQLite
- [x] Prisma schema for glider, lineset, size, line lengths, group mappings
- [x] Seed script for Ozone Lyght (XS, S, MS, ML, L)

### 2. Safe Data Access Architecture (Electron + Prisma)
- [x] Move all Prisma usage to Electron main process (Node.js context)
- [x] Implement repositories and service layer in main process
- [x] Expose data via IPC handlers (Electron ipcMain)
- [x] Use a preload script to expose safe APIs to the renderer (window.electron)
- [x] Refactor React UI to use IPC APIs for all data access (never import Prisma or repositories directly)
- [ ] Add API endpoints for measurement save, validation, etc.

### 3. UI/UX Integration
- [x] Refactor ValidationForm to use real glider data via IPC
- [ ] Integrate validation logic (APPI, safety, etc.) with new data structure
- [ ] Add auto-save and crash recovery for technician safety
- [ ] Continue with next vertical slice (Initial Diagnosis, Line Strength, etc.)

## Implementation Slices

### Slice 0: UI/UX Shell & Navigation
- [x] Header with glider info (manufacturer, model, size, serial number, date, client info)
- [x] Sidebar navigation (Service Checklist, Initial Diagnosis, Line Strength, Trim Measurements, Manufacturer Data, General Info)
- [x] Modular main content area (renders selected section)

### Slice 1: Safety Core & Data Foundation
- [x] Flexible group/line data model (supports 2, 3, or 4 risers/line groups)
- [x] Dynamic UI for group/line input (renders based on glider config)
- [x] Measurement presets from APPI methodology (including group differentials)
- [x] Workshop-specific templates for common glider models
- [x] Validation logic for variable riser/line configs
- [ ] Validation shortcuts for known-good measurements
- [ ] Auto-save with validation state tracking
- [ ] Form completion based on glider model history
- [ ] Data entry patterns from workshop feedback
- [ ] Context-aware defaults based on glider type

### Slice 2: Sidebar Sections (Vertical Slices)
- [x] Service Checklist page/component (with real data)
- [ ] Initial Diagnosis page/component (with Raw Data and Diagnosis Summary tabs)
- [ ] Line Strength page/component (with Data and Results tabs)
- [ ] Trim Measurements page/component (with method dropdown, Data and Results tabs)
- [ ] Glider Manufacturer Data page/component (read-only, all technical info)
- [ ] General Information / Read Me page/component

### Slice 3: Inspection & Measurement
- [ ] Session Management, Measurement System, Trim Analysis, etc. (see original plan)

### Slice 4: Workshop Integration
- [ ] Technician Support, Repair & Maintenance, etc. (see original plan)

### Slice 5: Reporting & Documentation
- [ ] PDF Generation, Workshop Analytics, etc. (see original plan)

## IPC & Data Flow Architecture
- All database access (Prisma) is handled in the Electron main process.
- The main process exposes safe APIs via IPC handlers (ipcMain).
- The preload script exposes these APIs to the renderer (window.electron).
- The React UI uses these APIs for all data access and mutation.
- No Prisma or repository code is ever imported in the renderer.

## Next Steps
1. [x] Set up and migrate database
2. [x] Seed with real glider data
3. [x] Implement Prisma client, repositories, and service layer in main process
4. [x] Add IPC handlers for glider data
5. [x] Expose safe APIs in preload script
6. [x] Refactor React UI to use IPC APIs
7. [ ] Integrate validation logic with new data structure
8. [ ] Add auto-save and crash recovery
9. [ ] Continue with next vertical slice (Initial Diagnosis, etc.)

---

This plan ensures safety, maintainability, and a robust technician workflow for paraMOT Workbench. 