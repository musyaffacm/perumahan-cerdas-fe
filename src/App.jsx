import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Resident from "./pages/resident/Index";
import House from "./pages/house/Index";
import Payment from "./pages/payment/Index";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="resident">
            <Route path="" element={<Resident />} />
          </Route>
          <Route path="payment">
            <Route path="" element={<Payment />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
