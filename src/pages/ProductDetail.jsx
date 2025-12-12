import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Card, Button, Input } from '../components/UI/Basic';
import { Save, ArrowLeft } from 'lucide-react';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const { products } = useStore();
    const product = products.find(p => p.id === id);

    if (!product) {
        return (
            <div className="page-container">
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <h3>Product not found</h3>
                    <Link to="/products"><Button variant="outline">Back to Products</Button></Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="product-detail-header">
                <Link to="/products" style={{ color: 'var(--text-secondary)' }}><Button variant="ghost"><ArrowLeft size={20} /></Button></Link>
                <h2 className="product-detail-title">Edit Product</h2>
            </div>

            <div className="product-detail-layout">
                <Card title="General Information">
                    <div className="product-form-column">
                        <Input label="Product Name" defaultValue={product.name} />
                        <div>
                            <label className="description-label">Description</label>
                            <textarea
                                defaultValue="Access to all premium features."
                                className="description-textarea"
                            />
                        </div>
                    </div>
                </Card>

                <div className="product-sidebar">
                    <Card title="Pricing & Inventory">
                        <div className="product-form-column" style={{ gap: '1rem' }}>
                            <Input label="Base Price" defaultValue={product.price.replace('$', '')} />
                            <Input label="Stock Quantity" defaultValue={product.stock} />
                        </div>
                    </Card>

                    <Card title="Media">
                        <div className="media-upload-area">
                            <p>Drag and drop image here</p>
                        </div>
                    </Card>

                    <Button className="save-button"><Save size={18} /> Save Changes</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
