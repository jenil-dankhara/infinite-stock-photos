import { Container } from "@mui/system";
import "./App.css";
import Header from "./components/Header";
import SearchImg from "./pages/SearchImg";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Routes>
          <Route path="/" exact element={<SearchImg />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
