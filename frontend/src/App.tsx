import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import VerifyAuth from "./components/auth/VerifyAuth"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={ <VerifyAuth><Home /></VerifyAuth> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App