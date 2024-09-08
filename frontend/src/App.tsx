import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/sign-in" element={<h1>Login</h1>} />
        <Route path="/dashboard" element={<h1>dashboard</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
