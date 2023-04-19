import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import Products from "./components/Products";
import Product from "./components/Product";
import Regsiter from "./components/Regsiter";
import Login from "./components/Login";
import Dashboard from "./components/Dashoboard";
import Password from "./components/profile/password";
import otherinfo from "./components/profile/otherinfo";
import Cart from "./components/Cart";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/contact" component={Contact}/>
        <Route exact path="/products" component={Products}/>
        <Route exact path="/products/:id" component={Product}/>
        <Route exact path="/register" component={Regsiter}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/passwordchange" component={Password}/>
        <Route exact path="/infochange" component={otherinfo}/>
        <Route exact path="/cart" component={Cart}/>
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
