
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8080/api/products");
            setProducts(response.data);
            setError(null);
        } catch (err) {
            console.error("API Hatası:", err);
            setError("Ürünleri çekerken bir hata oluştu: " + (err.message || "Bilinmeyen Hata"));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleAddProduct = () => {
        navigate('/products/new');
    };

 

    const handleDeleteProduct = async (id) => {
        const confirmDelete = window.confirm("Bu ürünü silmek istediğinize emin misiniz?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8080/api/products/${id}`);
            alert("Ürün başarıyla silindi!");
            getProducts();
        } catch (err) {
            console.error("Silme hatası:", err.response ? err.response.data : err.message);
            alert("Ürün silinirken bir hata oluştu: " + (err.response?.data?.message || err.message || "Bilinmeyen Hata"));
        }
    };

    if (loading) return <div style={styles.loadingContainer}><p>Ürünler yükleniyor...</p></div>;
    if (error) return <div style={styles.errorContainer}><p>Hata: {error}</p></div>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.heading}>Ürün Listesi</h2>
                <button onClick={handleAddProduct} style={styles.addButton}>
                    Yeni Ürün Ekle
                </button>
            </div>

            {products.length > 0 ? (
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead style={styles.tableHeader}>
                            <tr>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Kod</th>
                                <th style={styles.th}>Ad</th>
                                <th style={{ ...styles.th, textAlign: 'center' }}>İşlemler</th> {}
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} style={styles.tableRow}>
                                    <td style={styles.td}>{product.id}</td>
                                    <td style={styles.td}>{product.code ? product.code.substring(0, 5) : ''}</td>
                                    <td style={styles.td}>{product.name}</td>
                                    <td style={styles.tdActions}>
                                        {}
                                        {
                                            }
                                        <button
                                            onClick={() => handleDeleteProduct(product.id)}
                                            style={{ ...styles.actionButton, ...styles.deleteButton }}
                                        >
                                            Sil
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p style={styles.noProducts}>Henüz hiç ürün bulunmuyor.</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '30px',
        fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        margin: '20px',
        border: '1px solid #e0e0e0',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        paddingBottom: '15px',
        borderBottom: '1px solid #e0e0e0',
    },
    heading: {
        fontSize: '28px',
        color: '#34495e',
        margin: 0,
        fontWeight: '600',
    },
    addButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'background-color 0.3s ease, transform 0.1s ease',
    },
    tableContainer: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        border: '1px solid #e9ecef',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#f8f9fa',
    },
    th: {
        padding: '15px 20px',
        textAlign: 'left', 
        color: '#495057',
        fontSize: '15px',
        fontWeight: '600',
        borderBottom: '2px solid #dee2e6',
    },
    tableRow: {
        transition: 'background-color 0.2s ease',
    },
    td: {
        padding: '12px 20px',
        borderBottom: '1px solid #e9ecef',
        color: '#343a40',
        fontSize: '14px',
    },
    tdActions: {
        padding: '12px 20px',
        borderBottom: '1px solid #e9ecef',
       
        display: 'flex',
        flexDirection: 'column', 
        gap: '5px',
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    actionButton: {
        padding: '8px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '500',
        transition: 'background-color 0.2s ease, transform 0.1s ease',
        width: '80px',
    },
  
    deleteButton: {
        backgroundColor: '#dc3545',
        color: 'white',
    },
    noProducts: {
        textAlign: 'center',
        color: '#6c757d',
        fontSize: '16px',
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        marginTop: '20px',
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '50px',
        fontSize: '18px',
        color: '#6c757d',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        margin: '40px auto',
        maxWidth: '600px',
    },
    errorContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '50px',
        fontSize: '18px',
        color: '#dc3545',
        fontWeight: 'bold',
        backgroundColor: '#f8d7da',
        border: '1px solid #f5c6cb',
        borderRadius: '10px',
        margin: '40px auto',
        maxWidth: '600px',
    }
};

export default ProductsPage;