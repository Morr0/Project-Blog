import React from 'react';

let message: any = null;

async function awaiter(){
    let res = await fetch("http://localhost:3400", {});
    message = JSON.stringify(await res.json());
    console.log(message);
}

function App() {
awaiter();
return (
    <div className="App">
      {message}
    </div>
);
}

export default App;
