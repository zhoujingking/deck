import React from 'react';
import Table from './component/Table';

function App(): JSX.Element {
  return (
    <div>
      <div className="row" style={{
        justifyContent: 'center'
      }}>
        <Table numOfSeats={6}/>
      </div>
    </div>
  );
}

export default App;