# JSON Validator & Explorer

A powerful, 100% client-side JSON tool aimed at developers who need to validate, format, and explore complex JSON data. Built with React 19 and Vite 7.

![JSON Explorer Preview](public/screenshot.png) 
*(Note: Replace with actual screenshot if available)*

## ✨ Features

- **Real-time Validation**: Instant feedback on JSON syntax errors with line highlighting.
- **Interactive Tree View**: Explore deep JSON structures with a collapsible/expandable tree visualization.
- **Formatting tools**:
  - **Prettify**: Format JSON with standard indentation.
  - **Minify**: Compress JSON to remove whitespace.
- **Flexible View Modes**:
  - **Editor Mode**: Focus on writing/pasting code.
  - **Tree Mode**: Focus on exploring the structure.
  - **Split Mode**: See both editor and tree side-by-side.
- **Privacy First**: All processing happens in your browser. No data is sent to any server.
- **Utilities**:
  - Copy to clipboard
  - Download as `.json` file
  - Clear workspace
- **Theming**: Dark and Light mode support.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) v19.2.2
- **Build Tool**: [Vite](https://vitejs.dev/) v7.3.0
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm, yarn, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HariKrishna-9885699666/json-explorer.git
   cd json-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   *Note: If you encounter peer dependency warnings, `npm install` has been configured with overrides in `package.json` to handle React 19 compatibility.*

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
