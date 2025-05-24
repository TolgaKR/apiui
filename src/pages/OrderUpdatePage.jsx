import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderUpdatePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [siparis, setSiparis] = useState({
        quantity: '',
        unitprice: '',
        product: null,

    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    const calculatedTotalPrice = (
        parseFloat(siparis.quantity) * parseFloat(siparis.unitprice)
    ).toFixed(2);

    useEffect(() => {
        if (!id) {
            setError("Güncellenecek sipariş ID'si bulunamadı.");
            setLoading(false);
            return;
        }

        const fetchSiparis = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/api/siparisler/${id}`);
                const data = response.data;

       
                setSiparis({
                    quantity: data.quantity || '',
                    unitprice: data.unitprice || '',
                    product: data.product || null,
                   
                });
                setError(null);
            } catch (err) {
                console.error("Sipariş getirilemedi:", err);
                setError("Sipariş bilgileri alınamadı. Lütfen tekrar deneyin.");
                setSiparis({ quantity: '', unitprice: '', product: null });
            } finally {
                setLoading(false);
            }
        };

        fetchSiparis();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSiparis((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!siparis.product) {
            alert("Ürün bilgisi eksik.");
            return;
        }
        if (isNaN(siparis.quantity) || siparis.quantity <= 0) {
            alert("Miktar geçerli bir sayı olmalı ve sıfırdan büyük olmalı.");
            return;
        }
        if (isNaN(siparis.unitprice) || siparis.unitprice <= 0) {
            alert("Birim fiyat geçerli bir sayı olmalı ve sıfırdan büyük olmalı.");
            return;
        }


        try {
            const dataToSend = {
                quantity: parseFloat(siparis.quantity),
                unitprice: parseFloat(siparis.unitprice),
                totalprice: parseFloat(calculatedTotalPrice), 
                product_id: siparis.product.id, 
            };

            const response = await axios.put(`http://localhost:8080/api/siparisler/${id}`, dataToSend);

         
            console.log("Sipariş başarıyla güncellendi:", response.data);

            alert("Sipariş başarıyla güncellendi!");
            navigate("/siparisler");
        } catch (err) {
            console.error("Güncelleme hatası detayları:", err.response ? err.response.data : err.message);
            alert("Güncelleme sırasında hata oluştu. Lütfen konsolu kontrol edin.");
        }
    };

    if (loading) return <p style={styles.message}>Sipariş bilgileri yükleniyor...</p>;
    if (error) return <p style={styles.errorMessage}>Hata: {error}</p>;

    if (!siparis || !siparis.product) {
        return <p style={styles.message}>Sipariş bulunamadı veya ürün bilgisi eksik.</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Siparişi Güncelle (ID: {id})</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Ürün Adı</label>
                    <input
                        type="text"
                        value={siparis.product?.name || ""}
                        disabled
                        style={styles.inputDisabled}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Miktar</label>
                    <input
                        type="number"
                        name="quantity"
                        value={siparis.quantity}
                        onChange={handleChange}
                        required
                        min="0" 
                        step="1" 
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Birim Fiyat (₺)</label>
                    <input
                        type="number"
                        name="unitprice"
                        value={siparis.unitprice}
                        onChange={handleChange}
                        required
                        min="0" 
                        step="0.01"
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Toplam Fiyat (₺)</label>
                    <input
                        type="text" 
                        value={calculatedTotalPrice}
                        disabled 
                        style={styles.inputDisabled}
                    />
                </div>

                <div style={styles.buttonGroup}>
                    <button type="submit" style={styles.submitButton}>Güncelle</button>
                    <button type="button" onClick={() => navigate("/siparisler")} style={styles.cancelButton}>
                        İptal
                    </button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    container: {
        padding: "30px",
        backgroundColor: '#fff', 
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)', 
        maxWidth: '550px', 
        margin: '40px auto', 
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
        border: '1px solid #e0e0e0', 
    },
    title: {
        textAlign: 'center',
        marginBottom: '25px',
        color: '#34495e', 
        fontSize: '28px',
        fontWeight: '600',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '18px', 
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '8px',
        fontWeight: 'bold',
        color: '#555',
        fontSize: '15px',
    },
    input: {
        padding: '12px',
        border: '1px solid #ced4da', 
        borderRadius: '8px', 
        fontSize: '16px',
        width: 'calc(100% - 24px)',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    },
    inputDisabled: {
        padding: '12px',
        border: '1px solid #e9ecef', 
        borderRadius: '8px',
        backgroundColor: '#f8f9fa',
        color: '#6c757d', 
        fontSize: '16px',
        width: 'calc(100% - 24px)',
        boxSizing: 'border-box',
        cursor: 'not-allowed', 
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end', 
        gap: '12px', 
        marginTop: '30px',
    },
    actionButton: { 
        padding: '12px 22px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        transition: 'background-color 0.2s ease, transform 0.1s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    submitButton: {
        backgroundColor: '#28a745', 
        color: 'white',
        '&:hover': {
            backgroundColor: '#218838',
            transform: 'translateY(-1px)',
        },
    },
    cancelButton: {
        backgroundColor: '#6c757d',
        color: 'white',
        '&:hover': {
            backgroundColor: '#5a6268',
            transform: 'translateY(-1px)',
        },
    },
    message: {
        textAlign: 'center',
        padding: '25px',
        color: '#4a4a4a',
        backgroundColor: '#e9f7ef',
        borderRadius: '10px',
        margin: '30px auto',
        maxWidth: '450px',
        border: '1px solid #c3e6cb',
        fontSize: '16px',
    },
    errorMessage: {
        textAlign: 'center',
        padding: '25px',
        color: '#dc3545',
        backgroundColor: '#f8d7da',
        border: '1px solid #f5c6cb',
        borderRadius: '10px',
        margin: '30px auto',
        maxWidth: '450px',
        fontWeight: '500',
        fontSize: '16px',
    }
};

export default OrderUpdatePage;