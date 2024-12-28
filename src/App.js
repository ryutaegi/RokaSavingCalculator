import MilitarySavingsCalculator from "./content/calculate";

function App() {
  return (
    <div style={{
      display : "flex",
      margin : 0,
      alignItems : "center",
      justifyContent : "center",
      width : "100vw",
      height : "100%"
    }}>
      <div style={{
        alignItems : "center",
        justifyContent : "center",
        width : "100vw",
        maxWidth : "500px",
        height : "100%",
        borderRadius : "10px"
      }}>
    <MilitarySavingsCalculator/>
    </div>
    </div> 
  );
}

export default App;
