import './App.css';
import LegoSetsListPage from './pages/LegoSetsListPage'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <LegoSetsListPage />
      <Footer />
    </div>
  );
}

export default App;
