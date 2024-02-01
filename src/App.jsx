import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import UserIndex from "./pages/UserIndex";
import UserCreate from "./pages/UserCreate";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import UserDetails from "./pages/UserDetails";


function App() {


  return (
    <>

      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              
                <Route index element={<Home />} />

                <Route path='users'>
                  <Route path=":id" element={<UserDetails />} />
                  <Route path="list" element={<UserIndex />} />
                  <Route path="create" element={<UserCreate />} />
                </Route>

                <Route path="contact" element={<Contact />} />

                <Route path="*" element={<NoPage />} />

            </Route>
          </Routes>
            
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;