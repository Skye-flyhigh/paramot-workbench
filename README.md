# 🪂 ParaMOT Workbench

🪂 paraMOT | Offline Paraglider Inspection Assistant  
💡 Safety-first | 🧠 Technician Support | 🗃️ Local-first | ✅ APPI Methodology

A specialized, safety-first Electron app for paraglider servicing that empowers technicians with APPI methodology, manufacturer specifications, and workshop-validated inspection protocols. Built with **React**, **Prisma**, and **SQLite**, this tool ensures rigorous safety validation while maintaining workshop flexibility.

## ✨ Core Features

### Safety & Validation
- **APPI Methodology Integration**: Airworthiness criteria, load distribution, and trim validation
- **Safety Narrative Tracking**: Documented validation chain with technician feedback
- **Manufacturer Compliance**: Version-controlled specifications with custom data support
- **Measurement Validation**: APPI-aligned protocols with workshop calibration tracking

### Workshop Integration
- **Technician Support**: Adaptive decision support with experience-based guidance
- **Workshop Knowledge**: Pattern recognition and safety insights from technician feedback
- **Custom Data Management**: Safe addition of manufacturer data with validation
- **Repair & Maintenance**: Comprehensive logging with safety documentation

### Technical Capabilities
- **Glider Reference Database**: Manufacturer models, line sets, and cascade logic
- **Trim Analysis Engine**: APPI differential method with loop complexity tracking
- **Line Strength Assessment**: Material-specific protocols with safety thresholds
- **Measurement System**: Laser and differential methods with validation
- **Tool Calibration**: Dispersion tracking and calibration management
- **Client & Equipment**: Service tracking with safety documentation

## 🧠 Technical Architecture

### Core Stack
- **Frontend**: React + Vite + Tailwind + ShadCN UI
- **Backend**: Electron + Prisma ORM
- **Database**: SQLite (local, embedded)
- **Safety Layer**: Validation state management with APPI compliance
- **Workshop Integration**: Technician feedback and pattern recognition

### AI-Assisted Development
- **Cursor Rules**: `.cursor/rules/*.mdc` files guide AI assistants
- **Safety Validation**: Explicit rules for APPI methodology
- **Workshop Knowledge**: Technician feedback integration
- **Custom Data**: Validation and safety documentation

## 🗂 Project Structure

```
paramot-workbench/
├── public/
├── src/
│   ├── components/         # UI components with safety validation
│   ├── views/              # Feature-specific interfaces
│   ├── db/                 # Prisma schemas and migrations
│   ├── logic/              # Domain logic (APPI, trim, etc)
│   └── safety/             # Validation and safety narrative
├── .cursor/rules/          # AI guidance and domain knowledge
├── ai/                     # PRD, implementation, and prompts
│── workshop/               # Technician knowledge and patterns
└── README.md
```

## 📚 Documentation
- [Product Requirements Document (PRD)](./ai/paramot-workbench-PRD.md)
- [Implementation Plan](./ai/implementation-plan.md)
- [Safety Validation Rules](./.cursor/rules/4-glider-logic.mdc)
- [Workshop Integration](./.cursor/rules/3-frontend.mdc)

## 🛠 Development

### Prerequisites
- Node.js 18+ (LTS)
- Rust toolchain (for SQLite optimizations)
- Platform-specific build tools

### Local Development
```bash
# Install dependencies
pnpm install

# Generate Prisma client
npx prisma generate

# Start development server
pnpm dev

# Verify safety validation
pnpm test:safety
```

### Safety-First Development
- All features require safety validation
- APPI methodology compliance is mandatory
- Technician feedback drives improvements
- Workshop patterns inform development
- Custom data requires explicit validation

## 📖 Project Philosophy

ParaMOT Workbench combines rigorous safety protocols with practical workshop needs:

### Safety First
- APPI methodology integration
- Explicit validation checkpoints
- Safety narrative documentation
- Technician judgment augmentation
- Workshop-validated protocols

### Technician Support
- Adaptive decision support
- Experience-based guidance
- Workshop pattern recognition
- Safety narrative generation
- Custom data management

### Local-First Design
- Offline functionality
- Data persistence
- Workshop-specific storage
- Safety validation
- Version control

### APPI Methodology
- Airworthiness criteria
- Load distribution
- Trim validation
- Measurement protocols
- Safety thresholds

## 📄 Project Status

🚧 Active Development — Core features are being implemented with safety-first validation:

### Current Focus
- Safety validation layer
- APPI methodology integration
- Workshop knowledge capture
- Custom data management
- Technician feedback system

### Upcoming
- Enhanced pattern recognition
- Advanced safety analytics
- Workshop insights
- Technician collaboration
- Safety narrative improvements

## 🤝 Contributing

This open-source project supports the global gliding community with a focus on safety and workshop needs.

### How to Contribute
- Implement safety validation features
- Add APPI methodology improvements
- Enhance workshop integration
- Document technician knowledge
- Improve custom data management
- Add manufacturer specifications
- Refine trim logic
- Expand safety documentation

### Development Guidelines
1. Safety-first approach
2. APPI methodology compliance
3. Workshop validation
4. Technician feedback
5. Clear documentation
6. Explicit validation
7. Version control

To contribute, please:
1. Review the PRD and implementation plan
2. Follow safety validation guidelines
3. Include workshop context
4. Document safety implications
5. Submit pull requests with validation

## 📝 License

MPL v1.0 License — See [LICENSE](./LICENSE.md) for details.
