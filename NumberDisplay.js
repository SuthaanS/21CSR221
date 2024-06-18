import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NumberDisplay = ({ numberId }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9876/numbers/${numberId}`);
        setData(response.data);
      } catch (error) {
        setError('Error fetching data');
        console.error(error);
      }
    };

    fetchData();
  }, [numberId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Number ID: {numberId}</h3>
      <p>Previous State: {JSON.stringify(data.windowPrevState)}</p>
      <p>Current State: {JSON.stringify(data.windowCurrState)}</p>
      <p>Fetched Numbers: {JSON.stringify(data.numbers)}</p>
      <p>Average: {data.avg}</p>
    </div>
  );
};

export default NumberDisplay;
