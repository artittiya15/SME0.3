import "./App.css";
// import RevenueMember from "./Component/Revenue/RevenueMember"
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Navbar from "./Component/Share/Navbar";
import AllRevenue from "./Component/Revenue/AllRevenue";
import RevenueMember from "./Component/Revenue/RevenueMember";
import RevenueWalkIn from "./Component/Revenue/RevenueWalkIn";
import Transection from "./Component/Revenue/Transection";
import Void from "./Component/Revenue/Void";
import TopPaymentMethods from "./Component/Ranking/TopPaymentMethods";
import TopProduct from "./Component/Ranking/TopProducts";
import TopProductCategory from "./Component/Ranking/TopProductCategory";
import TopBigSpender from "./Component/Ranking/TopBigSpender";
import TopFrequentMembers from "./Component/Ranking/TopFrequentMembers";
import BigSpender from "./Component/Customer/BigSpender";
import Frequency from "./Component/Customer/Frequency";
import Member from "./Component/Customer/Member";
import WalkIn from "./Component/Customer/Walk-In";
import MemberAndWalkIn from "./Component/Customer/MemberAndWalk-In";
import Products from "./Component/ProductAndCategory/Products";
import Category from "./Component/ProductAndCategory/Categories";
import TotalPoints from "./Component/Loyalty/TotalPoints";
import EarnPoints from "./Component/Loyalty/EarnPoints";
import RedeemPoints from "./Component/Loyalty/RedeemPoints";
import Tiers from "./Component/Loyalty/Tiers";
import RemainingPoints from "./Component/Loyalty/RemainingPoints"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/all-revenue">
            <AllRevenue />
          </Route>
          <Route path="/revenue-member">
            <RevenueMember />
          </Route>
          <Route path="/revenue-walk-in">
            <RevenueWalkIn />
          </Route>
          <Route path="/transection">
            <Transection />
          </Route>
          <Route path="/void">
            <Void />
          </Route>
          <Route path="/TopPaymentMethods">
            <TopPaymentMethods />
          </Route>
          <Route path="/TopProduct">
            <TopProduct />
          </Route>
          <Route path="/TopProductCategory">
            <TopProductCategory />
          </Route>
          <Route path="/TopBigSpender">
            <TopBigSpender />
          </Route>
          <Route path="/TopFrequentMembers">
            <TopFrequentMembers />
          </Route>
          <Route path="/BigSpender">
            <BigSpender />
          </Route>
          <Route path="/Frequency">
            <Frequency />
          </Route>
          <Route path="/Member">
            <Member />
          </Route>
          <Route path="/WalkIn">
            <WalkIn />
          </Route>
          <Route path="/MemberAndWalkIn">
            <MemberAndWalkIn />
          </Route>
          <Route path="/Products">
            <Products />
          </Route>
          <Route path="/Categories">
            <Category />
          </Route>
          <Route path="/TotalPoints">
            <TotalPoints />
          </Route>
          <Route path="/EarnPoints">
            <EarnPoints />
          </Route>
          <Route path="/RedeemPoints">
            <RedeemPoints />
          </Route>
          <Route path="/RemainingPoints">
            <RemainingPoints/>
          </Route>
          <Route path="/Tiers">
            <Tiers />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
