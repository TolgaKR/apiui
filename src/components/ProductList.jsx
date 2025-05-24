
const ProductList = ({ products, onProductClick }) => {
  if (!products || products.length === 0) {
    return <p>Gösterilecek ürün bulunamadı.</p>;
  }

  return (
    <div>
      <h2>Ürün Listesi</h2>
      <ul>
        {products.map(product => (
          <li key={product.id} onClick={() => onProductClick(product)} style={{ cursor: "pointer" }}>
            {product.name} (Kod: {product.code})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
