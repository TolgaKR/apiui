
import React, { useState, useEffect } from 'react';

const ProductTable = ({ externalAdd }) => {
  const [rows, setRows] = useState([]);

  const addExternalProduct = (product) => {
    const newRow = {
      kod: product.code,
      ad: product.name,
    };
    setRows([...rows, newRow]);
  };

  useEffect(() => {
    if (externalAdd) {
      externalAdd.current = addExternalProduct;
    }
  }, [externalAdd]);

  return (
    <div>
      <h2>Fatura Tablosu</h2>
      <table border="1" cellPadding={6}>
        <thead>
          <tr>
            <th>Kod</th>
            <th>Ad</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td>{row.kod}</td>
              <td>{row.ad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
