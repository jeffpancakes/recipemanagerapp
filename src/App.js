import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import Navbar from './components/Navbar';
import Footer from "./components/Footer";

import Home from './pages/Home';
import Recipes from './pages/Recipes';

import RecipeListProvider from "./components/RecipeListProvider";

function App() {
  return (
    <Router>
      <Navbar />
      <div className='container main'>
        <RecipeListProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
        </Routes>
        </RecipeListProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;