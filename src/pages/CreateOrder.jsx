import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateOrder = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    quantity: 1,
    unitprice: 0,
    totalprice: 0,
    product_id: "",
    unit_id: ""
  });

  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await axios.get("http://localhost:8080/api/products");
        setProducts(productsRes.data);

        const unitsRes = await axios.get("http://localhost:8080/api/units");
        setUnits(unitsRes.data);
      } catch (error) {
        console.error("❌ Veri çekerken hata:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "quantity" || name === "unitprice" ? Number(value) : value;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: newValue
      };

      if (name === "quantity" || name === "unitprice") {
        updated.totalprice = updated.quantity * updated.unitprice;
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/siparisler", formData, {
        headers: { "Content-Type": "application/json" }
      });

      alert("✅ Sipariş oluşturuldu. Sipariş ID: " + response.data.id);


      navigate("/siparisler");
    } catch (error) {
      console.error("❌ Sipariş oluşturulamadı:", error);
      alert("Sipariş oluşturulurken hata oluştu.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Yeni Sipariş Oluştur</h2>

        <label style={styles.label}>Adet:</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          style={styles.input}
          required
        />

        <label style={styles.label}>Birim Fiyat:</label>
        <input
          type="number"
          name="unitprice"
          value={formData.unitprice}
          onChange={handleChange}
          step="0.01"
          style={styles.input}
          required
        />

        <label style={styles.label}>Toplam Tutar:</label>
        <input
          type="number"
          name="totalprice"
          value={formData.totalprice}
          readOnly
          style={styles.input}
        />

        <label style={styles.label}>Ürün Seç:</label>
        <select
          name="product_id"
          value={formData.product_id}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">-- Ürün seçiniz --</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <label style={styles.label}>Birim Seç:</label>
        <select
          name="unit_id"
          value={formData.unit_id}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">-- Birim seçiniz --</option>
          {units.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </select>

        <button type="submit" style={styles.button}>Siparişi Kaydet</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  form: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  label: {
    marginTop: '10px',
    marginBottom: '4px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    fontSize: '14px',
  },
  button: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default CreateOrder;
