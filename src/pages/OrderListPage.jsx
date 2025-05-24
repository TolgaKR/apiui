

import React from "react";
import OrderList from "../components/OrderList"; 
import { useNavigate } from "react-router-dom";

const OrderListPage = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.header}>
   
                <button
                    onClick={() => navigate("/siparisler/yeni")}
                    style={styles.addButton}
                >
                    + Yeni Sipariş Ekle
                </button>
            </div>
    
            <OrderList />
        </div>
    );
};

const styles = {
    pageWrapper: { 
        fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        backgroundColor: '#f8f9fa', 
        minHeight: '100vh',
        width: '100%', 
        boxSizing: 'border-box',
    },
    header: {
        display: 'flex',
       
        justifyContent: 'flex-end', 
        alignItems: 'center',
        marginBottom: '25px',
        paddingBottom: '15px', 
        borderBottom: '1px solid #e0e0e0', 
        
        
        padding: '0 2rem', 
        width: '100%',
        boxSizing: 'border-box',
    },
    heading: {
        fontSize: '28px',
        color: '#343a40',
        margin: 0,
    },
    addButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff', 
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
        transition: 'background-color 0.3s ease', 
    },
};

export default OrderListPage;