import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import Products from "./ProductsPage/Products";
import Snackbar from "./util/Snackbar";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/products" element={<Products />} />
            {/* <Route path="/contact" element={<Contact />} />
            <Route path="/my-component" element={<MyComponent />} /> */}
          </Routes>
        </div>
      </Router>
      <Snackbar />
    </div>
  );
}

export default App;
