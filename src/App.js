import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import UserIndex from "./pages/UserIndex";
import UserCreate from "./pages/UserCreate";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import UserDetails from "./pages/UserDetails";


function Car({name,model}) {
  return <h2>I am a { model }!</h2>;
}

function Garage() {
  const carInfo = { name: "Ford", model: "Mustang" };
  return (
    <>
      <h1>Who lives in my garage?</h1>
      <Car name={ carInfo.name } model= {carInfo.model} />
    </>
  );
}

function Football() {
  const shoot = (a, b) => {
    alert(a);
    alert(b.type);
    /*
    'b' represents the React event that triggered the function,
    in this case the 'click' event
    */
  }

  return (
    <button onClick={(event) => shoot("Goal!", event)}>Take the shot!</button>
  );
}





function MissedGoal() {
	return <h1>MISSED!</h1>;
}

function MadeGoal() {
	return <h1>GOAL!</h1>;
}

function Goal(props) {
  const isGoal = props.isGoal;
  if (isGoal) {
    return <MadeGoal/>;
  }
  return <MissedGoal/>;
}




function GarageIf(props) {
  const cars = props.cars;
  return (
    <>
      <h1>Garage</h1>
      {cars.length > 0 &&
        <h2>
          You have {cars.length} cars in your garage.
        </h2>
      }
    </>
  );
}






function App() {

const array = ['agua','roca','fuego','aire']

function calculate(a, b) {
  const add = a + b;
  const subtract = a - b;
  const multiply = a * b;
  const divide = a / b;

  return [add, subtract, multiply, divide];
}

const [add, subtract, multiply, divide] = calculate(4, 7);


const persona1 = {
  name: 'Oscar',
  lastname: 'Contreras Silva',
  gender: 'Masculino'
}

function presentation({name,lastname,gender}) {
  return "My name is "+name+ " and my lastname is " + lastname;
}

const hello = ({name,lastname,gender}) => "My name is "+name+ " and my lastname is " + lastname;


const myVehicle = {
  brand: 'Ford',
  model: 'Mustang',
  color: 'red'
}

const updateMyVehicle = {
  type: 'car',
  year: 2021, 
  color: 'yellow'
}

const myUpdatedVehicle = {...myVehicle, ...updateMyVehicle}
const x = 9;

const cars = ['Ford', 'BMW', 'Audi'];


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
      <h1>{(x) < 10 ? "Hello" : "Goodbye"}</h1>;
      {
        
        array.map(
          (item,index) => <p key={index}>{item}</p>
        )
        
      }

      {add+ ' ' + multiply}
      <p>{divide}</p>
      <p>{presentation(persona1)}</p>
      <p>{hello(persona1)}</p>

      {JSON.stringify(myUpdatedVehicle)}
      <Garage/>
      <Football />
      <Goal isGoal={true} />
      <GarageIf cars={cars} />
    </>
  );


  
}


export default App;