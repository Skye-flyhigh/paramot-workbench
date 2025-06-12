# paraMOT Glider Servicing App – UI/UX Workflow Specification

## Top Bar / Header
- **Glider Info (top right):**
  - Manufacturer (dropdown, from DB)
  - Model (dropdown, from DB)
  - Size (dropdown, from DB)
  - Serial Number (manual input)
  - Date of the start of the service (auto timestamp at the creation of a new service file)
  - Client info (name, contacts)


## Sidebar (Vertical Menu)
- Service Checklist
- Initial Diagnosis
- Line Strength
- Trim Measurements
- Glider Manufacturer Data
- General Information / Read Me

## Main Content Area

### Service Checklist
- Dynamic checklist, auto-ticking as data is filled in other tabs.
- Dropdown menu to change checklist type.
- Checklist ticks automatically as technician fills in data in other sections.

### Initial Diagnosis
- Two tabs:
  - **Raw Data:** Technician enters measurements, observations, and assessments.
  - **Diagnosis Summary:** Review all entered information.

### Line Strength
- Two tabs:
  - **Data:** Technician is shown required test weights and inputs measured data.
  - **Results:** Summary of line strength, number of groups, mid/upper cascade lines, line types, etc.

### Trim Measurements
- Dropdown to select measurement method (hand-held laser, rail laser, differential).
- Two tabs:
  - **Data:** Technician enters measurements according to selected method.
  - **Results:** Analysis, correction suggestions, and profile classification.

### Glider Manufacturer Data
- Read-only section with all technical info for the glider being serviced:
  - Surface area, projected area, weight range, certification, number of risers
  - Picture of risers
  - Measurement reference points (cloth, tab, knot)
  - Line set and line map (with images if available)
  - Line material, line codes, line diameters, line lengths for each line
  - Replacement information

## Workflow Principles
- Each inspection is a separate, immutable record (versioned if edited/copied).
- Technician can review previous inspections for a glider, but new inspections always start blank or with explicit copy.
- All changes are tracked; nothing is overwritten.
- UI is modular, with each main section as a React component/page.
- Sidebar navigation for quick access to all sections.
- Header always shows the glider being serviced. 