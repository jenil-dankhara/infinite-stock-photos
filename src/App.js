import { Container } from "@mui/system";
import "./App.css";
import Header from "./components/Header";
import Searchbar from "./components/Searchbar";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Searchbar />
      </Container>
    </div>
  );
}

export default App;
