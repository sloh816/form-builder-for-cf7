# Form Builder for Contact Form 7

A modern, intuitive visual form builder for **Contact Form 7** that eliminates the need for manual code editing. Create, customize, and manage contact forms with a drag-and-drop interface, real-time preview, and instant code generation.

## Features

### 🎨 Visual Form Builder

-   **Drag-and-drop** interface for adding and organizing form fields
-   **Real-time preview** showing exactly how your form will appear
-   **Live styling** with immediate visual feedback
-   **No coding required** — perfect for users of all technical levels

### 📧 Email Preview

-   Switch between form and email preview modes
-   Design confirmation emails alongside your form
-   See how emails render before sending

### 🎯 Field Management

-   Add, duplicate, delete, and reorder fields with ease
-   Support for multiple field types (text, email, textarea, checkboxes, radio buttons, etc.)
-   Customize field properties (labels, placeholders, validation, required status)
-   Unique field ID generation for conflict-free forms

### 🎨 Advanced Styling

-   Customize form appearance through the Styles panel
-   Modify CSS properties visually without touching code
-   Style persistence across sessions

### 💾 Auto-Save & Local Storage

-   Automatic form saving to browser localStorage
-   Save shortcut: **Ctrl+S** (or **Cmd+S** on Mac)
-   Never lose work with persistent storage
-   Visual indicator showing saved/unsaved status

### 📋 Form Organization

-   Manage multiple forms in one workspace
-   Duplicate forms to create variations quickly
-   Delete forms with confirmation
-   Easy form switching and navigation

### 📝 Code Generation

-   Export clean, production-ready Contact Form 7 shortcodes
-   One-click code copying
-   Ready to paste into WordPress posts/pages

### 🔗 Shareable Forms

-   URL-based form access using query parameters
-   Direct links to specific forms
-   Session-based preview preferences

## Getting Started

### Prerequisites

-   Node.js 16+ and npm/yarn
-   Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/sloh816/form-builder-for-cf7.git

# Navigate to the project directory
cd form-builder-for-cf7

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### Creating a Form

1. **Add Fields** — Click "Add Field" to select from available field types
2. **Customize** — Edit field labels, placeholders, and validation rules
3. **Organize** — Drag to reorder or use up/down arrows
4. **Style** — Modify appearance in the Styles panel
5. **Preview** — Check the Form Preview tab to see your changes in real-time
6. **Save** — Press Ctrl+S or click Save

### Designing Email Confirmations

1. Switch to the **Email Preview** tab
2. Fill in email settings (recipient, subject, body)
3. See live email rendering as you type
4. Save your changes

### Exporting Your Form

1. Click the **"Generate Code"** button
2. Copy the Contact Form 7 shortcode
3. Paste into your WordPress page/post
4. Done! Your form is ready to use

## Project Structure

```
src/
├── components/          # Vue components (Header, FormPreview, etc.)
├── data/               # TypeScript types and default styles
├── App.vue             # Main application component
├── main.ts             # Application entry point
└── style.css           # Global styles (Tailwind CSS)
```

## Technology Stack

-   **Vue 3** — Progressive JavaScript framework with Composition API
-   **TypeScript** — Type-safe JavaScript
-   **Tailwind CSS** — Utility-first CSS framework
-   **Vite** — Lightning-fast build tool and dev server

## Technical Highlights

### Advanced State Management

-   **Dependency Injection** via Vue's `provide/inject` for clean component communication
-   **Real-time reactivity** tracking saved/unsaved form state
-   **Immutable-style updates** for data integrity

### Code Quality

-   **Type-safe development** with comprehensive TypeScript definitions
-   **Deep object cloning** for proper data isolation during duplication
-   **Efficient data structures** with normalized form schema
-   **Event-driven architecture** with keyboard shortcuts and URL parameter handling

### Performance

-   **Local storage persistence** for instant app restoration
-   **Lazy component loading** for faster initial render
-   **Optimized reactivity** with Vue 3's Composition API
-   **Minimal dependencies** for a lean bundle size

## Browser Support

-   Chrome/Edge 90+
-   Firefox 88+
-   Safari 14+

## Data Storage

All forms are stored in your browser's **localStorage** under the key `indigaForms`. This is local to your machine and browser — for production use, consider integrating with a backend database.

## Known Limitations

-   Data is stored locally (not synced across devices)
-   Limited to browser storage capacity (~5-10MB depending on browser)
-   Requires Contact Form 7 plugin installed on WordPress site

## Future Enhancements

-   [ ] Backend sync for multi-device access
-   [ ] Team collaboration features
-   [ ] Form analytics and submission tracking
-   [ ] Advanced conditional logic
-   [ ] API integration support
-   [ ] Form templates library

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project however you'd like.

## Support

For issues, feature requests, or questions, please open an issue on [GitHub](https://github.com/sloh816/form-builder-for-cf7/issues).

---

**Made with 💜 by [Shannon L.](https://github.com/sloh816)**

[View on GitHub](https://github.com/sloh816/form-builder-for-cf7)
