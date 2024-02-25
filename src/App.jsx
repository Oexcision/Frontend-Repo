import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import UserIndex from "./pages/UserIndex";
import UserCreate from "./pages/UserCreate";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import UserDetails from "./pages/UserDetails";
import UserEdit from "./pages/UserEdit";
import UserDelete from "./pages/UserDelete";



function App() {


  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              
                <Route index element={<Home />} />

                <Route path='users'>
                  <Route path="list" element={<UserIndex />} />
                  <Route path="create" element={<UserCreate />} />
                  <Route path="view/:id" element={<UserDetails />} />
                  <Route path="edit/:id" element={<UserEdit />} />
                  <Route path="delete/:id" element={<UserDelete/>} />
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