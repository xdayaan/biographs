import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import Charts from './Charts';
import Chatbot from './Chatbot'; // Import the Chatbot component

const Experiment = () => {
  const [data, setData] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);
  const [searchParams] = useSearchParams();

  const experimentId = searchParams.get('id') || 0;

  useEffect(() => {
    axios.get(`http://localhost:8000/meta/${experimentId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    axios.get(`http://localhost:8000/meta/table/${experimentId}`)
      .then((response) => {
        const jsonData = JSON.parse(response.data);
        setAdditionalData(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching additional data:', error);
      });

  }, [experimentId]);

  if (!data || !additionalData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Experiment Details</h1>

      <div className="flex">
        <div className="w-1/3 p-4">
          <TableContainer component={Paper} className="shadow-lg">
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell className="font-bold">Field</TableCell>
                  <TableCell className="font-bold">Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(data).map(([key, value]) => (
                  <TableRow key={key} className="hover:bg-gray-50">
                    <TableCell className="capitalize">{key.replace('_', ' ')}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="w-2/3 p-4">
          <Charts rodentResearchData={additionalData} />
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4">Experiment Data Set</h1>
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              {Object.keys(additionalData[0]).map((key) => (
                <TableCell key={key} className="font-bold">{key.replace('_', ' ')}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {additionalData.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                {Object.values(row).map((value, idx) => (
                  <TableCell key={idx}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Include the Chatbot component here and pass the additionalData */}
      <Chatbot tableData={additionalData} />
    </div>
  );
};

export default Experiment;
