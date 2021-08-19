import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Restaurants from "./components/Restaurant";
import Booking from "./components/Booking";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <Router>
        <Switch>
          <Route exact path="/">
            <Restaurants />
          </Route>
          <Route exact path="/booking">
            <Booking />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
