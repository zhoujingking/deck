import React from 'react';
import PropTypes from 'prop-types';
import Table from './component/table';

function App(props) {
  return (
    <div>
      <div className="row" style={{
        justifyContent: 'center'
      }}>
        <Table />
      </div>
    </div>
  );
}
App.defaultProps={};
App.propTypes={};
export default App;