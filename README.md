# 🪂 Paramot Workbench

A specialized, local-first Electron app for managing paragliding and paramotor equipment servicing. Built with **React**, **Vite**, **Prisma**, and **SQLite**, this tool empowers technicians to log inspections, calculate trim adjustments, access glider specifications, and manage workshop data with precision and safety.

## ✨ Key Features

- **Glider Reference Database**: Manufacturer models, line sets, materials, and cascade logic
- **Technician Workflows**: Trim calculations, repair logs, visual inspection notes
- **Line Strength & Trim Logic**: Includes APPI airworthiness criteria and strength tables
- **Tool Calibration Logs**: Track measurement tool dispersion and calibration schedules
- **Client + Equipment Tracking**: Store contacts, gear left in workshop, service deadlines
- **Offline-first Architecture**: Local-only SQLite database via Prisma

## 🧠 Tech Stack

- **Frontend**: React + Vite + Tailwind + ShadCN UI
- **Backend**: Electron + Prisma ORM
- **Database**: SQLite (local, embedded)
- **AI Rulesets**: `.cursor/rules/*.mdc` files power AI-assistants via natural language context

## 🗂 Folder Structure

```
paramot-workbench/
├── public/
├── src/
│   ├── components/
│   ├── views/
│   ├── db/                  # Prisma schemas
│   └── logic/               # Domain logic (glider, inspection, etc)
├── .cursor/rules/           # AI rule files (markdown-based logic for workshop tasks)
|   ai/                      # PRD, plan, prompts, etc.
└── README.md
```

## 🛠 Development

### Run the app

```bash
pnpm install
pnpm dev
```

### Build for production

## 📖 Context & Philosophy

Paramot Workbench aims to augment technician safety and standardize glider servicing. The app includes embedded domain knowledge, such as:
• Differential measurement logic (handheld vs. rail laser)
• Line grouping rules
• Stitching methods
• APPI airworthiness thresholds
• Glider model recognition and PDF/manual lookup

AI assistants embedded in Cursor are guided via Markdown rules to reduce guesswork and increase traceable logic.

## 📄 Status

🚧 Active development — core schemas and logic are evolving alongside user feedback and flight safety considerations.

## 🤝 Contributing

This is an open-source project intended to support the global gliding community.
Whether you're a pilot, technician, developer, or curious contributor, you're welcome to join.

Ways to contribute:

- Improve the interface or UX
- Add glider models, line specs, or stitching guides
- Refine trim logic or airworthiness calculations
- Document procedures or embed technician knowledge

To get started, open an issue or submit a pull request.
