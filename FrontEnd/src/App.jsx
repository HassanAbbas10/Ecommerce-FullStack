import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Sidebar } from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import AddProduct from "./pages/AddProduct"
import UpdateProduct from "./pages/UpdateProduct"
import Orders from "./pages/Orders"
import Customers from "./pages/Customers"
import Analytics from "./pages/Analytics"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-white">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/update-product/:id" element={<UpdateProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
