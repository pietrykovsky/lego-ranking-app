import './App.css';
import LegoSetsListPage from './pages/LegoSetsListPage'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="container-fluid main">
      <Header />
      <LegoSetsListPage />
      <Footer />
    </div>
  );
}

export default App;
