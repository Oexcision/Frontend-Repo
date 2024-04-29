import BarChart from "../components/Dashboard/BarChart";

const Home = () => {
    return(
      <>
        <h1 className='mb-3 mt-3 text-4xl' >Home</h1>
        <h2 className='text-2xl'>Gráfico de Barras</h2>
        <BarChart/>
      </>

    );
        
  };
  
  export default Home;