import "./App.css";
import RevenueMember from "./Component/Revenue/RevenueMember"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
function App() {
  return (
    <div className="App">
      <RevenueMember/>
    </div>
  );
}
export default App;
