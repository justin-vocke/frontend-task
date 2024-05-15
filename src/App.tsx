import { Students } from "./components/Student/Students";
import { Create } from "./components/Student/Create";
import { Home } from "./components/Home";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Update } from "./components/Student/Update";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
        {/* <Route path="/update/:id" element={<Update />} />
        <Route path="/delete/:id" element={<Delete />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
