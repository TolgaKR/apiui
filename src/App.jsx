
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import ProductsPage from './pages/ProductsPage';
import OrderListPage from './pages/OrderListPage';
import CreateOrder from './pages/CreateOrder';
import OrderUpdatePage from './pages/OrderUpdatePage';
import AddProductPage from './pages/AddProductPage'; 

function App() {
    return (
        <Router>
            <div style={styles.appContainer}>
                {}
                <nav style={styles.navbar}>
                    <div style={styles.navTitle}>InvoiceApp</div> {}
                    <div style={styles.navLinks}>
                        <Link to="/" style={styles.navLink}>Ürünler</Link>
                        <Link to="/siparisler" style={styles.navLink}>Siparişler</Link>
                        {}
                        <Link to="/products/new" style={styles.navLink}>Ürün Ekle</Link>
                    </div>
                </nav>

                {}
                <main style={styles.mainContent}>
                    <Routes>
                        <Route path="/" element={<ProductsPage />} />
                        <Route path="/siparisler" element={<OrderListPage />} />
                        <Route path="/siparisler/yeni" element={<CreateOrder />} />
                        <Route path="/siparisler/guncelle/:id" element={<OrderUpdatePage />} />
                        <Route path="/products/new" element={<AddProductPage />} /> {}
                        {}
                    </Routes>
                </main>

                
               
            </div>
        </Router>
    );
}


const styles = {
    appContainer: {
        minHeight: '100vh',
        backgroundColor: '#f4f7f6', // Açık gri arka plan
        display: 'flex',
        flexDirection: 'column',
    },
    navbar: {
        backgroundColor: '#2c3e50', // Koyu lacivert/gri tonu
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        color: 'white',
    },
    navTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#ecf0f1', // Açık gri başlık
    },
    navLinks: {
        display: 'flex',
        gap: '25px', // Linkler arasında boşluk
    },
    navLink: {
        color: '#ecf0f1', // Link rengi
        textDecoration: 'none',
        fontSize: '17px',
        fontWeight: '500',
        transition: 'color 0.3s ease, transform 0.2s ease',
    },
 
    mainContent: {
        flexGrow: 1,
        padding: '20px',
        
    },
    footer: {
        backgroundColor: '#2c3e50',
        color: 'white',
        textAlign: 'center',
        padding: '15px 0',
        marginTop: 'auto', 
    }
};

export default App;