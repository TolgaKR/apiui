

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8080/api/products", {
                code,
                name,
                unitPrice: parseFloat(unitPrice)
            });

            alert("Ürün başarıyla eklendi!");
            navigate('/');
        } catch (err) {
            console.error("Ekleme hatası:", err);
            alert("Ürün eklenirken bir hata oluştu.");
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Yeni Ürün Ekle</h2>

                <label style={styles.label}>Ad</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                    required
                />

                <button type="submit" style={styles.button}>Kaydet</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4'
    },
    form: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        marginBottom: '20px',
        textAlign: 'center',
        color: '#333',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        marginBottom: '15px',
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '14px',
    },
    button: {
        padding: '12px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    }
};

export default AddProductPage;
