

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderList = () => {
    const [siparisler, setSiparisler] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchSiparisler = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/siparisler');
            setSiparisler(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Siparişler çekilirken bir hata oluştu:", err);
            setError("Siparişler yüklenirken bir hata oluştu.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSiparisler();
    }, []);

   const handleGuncelle = (id) => {
  navigate(`/siparisler/guncelle/${id}`);
};

    const handleSil = async (id) => {
        const confirm = window.confirm("Bu siparişi silmek istediğinize emin misiniz?");
        if (!confirm) return;

        try {
            await axios.delete(`http://localhost:8080/api/siparisler/${id}`);
            alert("Sipariş başarıyla silindi.");
            fetchSiparisler();
        } catch (err) {
            console.error("Silme hatası:", err);
            alert("Sipariş silinirken hata oluştu.");
        }
    };

    if (loading) return <div style={styles.loadingContainer}><p>Siparişler yükleniyor...</p></div>;
    if (error) return <div style={styles.errorContainer}><p>Hata: {error}</p></div>;

    return (
        <div style={styles.listContainer}>
            <h2 style={styles.listHeading}>Sipariş Detayları</h2>

            {siparisler.length > 0 ? (
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead style={styles.tableHeader}>
                            <tr>
                               
                                <th style={{ ...styles.th, width: '5%' }}>ID</th> 
                                <th style={{ ...styles.th, width: '30%' }}>Ürün İsmi</th> 
                                <th style={{ ...styles.th, width: '10%' }}>Miktar</th>
                                <th style={{ ...styles.th, width: '15%' }}>Birim Fiyat</th>
                                <th style={{ ...styles.th, width: '15%' }}>Toplam Fiyat</th>
                                <th style={{ ...styles.th, width: '25%' }}>İşlemler</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {siparisler.map((siparis) => (
                                <tr key={siparis.id} style={styles.tableRow}>
                                    <td style={{ ...styles.td, width: '5%' }}>{siparis.id}</td>
                                    <td style={{ ...styles.td, width: '30%' }}>{siparis.product?.name ?? "Ürün Bilgisi Yok"}</td>
                                    <td style={{ ...styles.td, width: '10%' }}>{siparis.quantity ?? "-"}</td>
                                    <td style={{ ...styles.td, width: '15%' }}>{siparis.unitprice ? `${siparis.unitprice} TL` : '-'}</td>
                                    <td style={{ ...styles.td, width: '15%' }}>{siparis.totalprice ? `${siparis.totalprice} TL` : '-'}</td>
                                    <td style={{ ...styles.tdActions, width: '25%' }}>
                                        <button
                                            onClick={() => handleGuncelle(siparis.id)}
                                            style={{ ...styles.actionButton, ...styles.editButton }}
                                        >
                                            Güncelle
                                        </button>
                                        <button
                                            onClick={() => handleSil(siparis.id)}
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
                <p style={styles.noItems}>Henüz hiç sipariş bulunmuyor.</p>
            )}
        </div>
    );
};

const styles = {
    listContainer: {
        width: '100%',
        boxSizing: 'border-box',
      
    },
    listHeading: {
        fontSize: '24px',
        color: '#343a40',
        marginBottom: '20px',
        marginTop: '0',
    },
    tableContainer: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        overflowX: 'auto', 
        border: '1px solid #e9ecef',
        width: '100%', 
        boxSizing: 'border-box',
        padding: '20px', 
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        
        tableLayout: 'fixed', 
    },
    tableHeader: {
        backgroundColor: '#e9ecef',
    },
    th: {
        padding: '15px 10px', 
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
        padding: '12px 10px', 
        borderBottom: '1px solid #e9ecef',
        color: '#343a40',
        fontSize: '14px',
        overflow: 'hidden', 
        textOverflow: 'ellipsis', 
        whiteSpace: 'nowrap', 
    },
    tdActions: {
        padding: '12px 10px', 
        borderBottom: '1px solid #e9ecef',
        textAlign: 'right', 
        
        display: 'flex', 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        gap: '8px',
    },
    actionButton: {
        padding: '8px 12px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '500',
        transition: 'background-color 0.2s ease, transform 0.1s ease',
     
    },
    editButton: {
        backgroundColor: '#ffc107',
        color: '#343a40',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        color: 'white',
    },
    noItems: {
        textAlign: 'center',
        color: '#6c757d',
        fontSize: '16px',
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        border: '1px solid #e9ecef',
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        fontSize: '18px',
        color: '#6c757d',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    errorContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        fontSize: '18px',
        color: '#dc3545',
        fontWeight: 'bold',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    }
};

export default OrderList;