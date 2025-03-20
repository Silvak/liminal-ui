# TechnoUI Components

Techno-UI is a futuristic UI component library for React, designed to bring modernity and innovation to interface development.

## 📌 Versions

- **v0.4.1** → Components: `Button`, `Stack`, `Text`
- **v0.0.1** → Initial version

## 🚀 Installation

To install the library, run the following command:

```sh
npm install techno-components
```

## ⚙️ Configuration

To use Techno-UI, import the styles in your main file:

```js
import "techno-components/dist/techno-ui.css";
```

## 📖 Usage Example

### 📌 Initial Setup

```js
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "techno-components/dist/techno-ui.css";

createRoot(document.getElementById("root")).render(
    <App />
);
```

### 📌 Using a Component

```js
import { Button } from "techno-components";

function App() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col gap-10">
        <Button variant="primary">
          Button
        </Button>
      </div>
    </div>
  );
}

export default App;
```

---

Enjoy building interfaces with Techno-UI! 🚀
