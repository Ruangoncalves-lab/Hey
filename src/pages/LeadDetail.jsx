import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Card, Button, Badge, Input } from '../components/UI/Basic';
import { MessageCircle, Phone, Mail, User, ArrowLeft } from 'lucide-react';
import './LeadDetail.css';

const LeadDetail = () => {
    const { id } = useParams();
    const { leads } = useStore();
    const lead = leads.find(l => l.id === id);

    if (!lead) {
        return (
            <div className="page-container">
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <h3>Lead not found</h3>
                    <Link to="/crm"><Button variant="outline">Back to CRM</Button></Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container lead-detail-container">
            {/* Left Column: Lead Info */}
            <div className="lead-info-column">
                <div style={{ marginBottom: '1rem' }}>
                    <Link to="/crm" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ArrowLeft size={20} /> Back to CRM
                    </Link>
                </div>
                <Card>
                    <div className="lead-profile-header">
                        <div className="lead-avatar">
                            <User size={40} />
                        </div>
                        <h3>{lead.name}</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Potential Customer</p>
                        <div className="lead-actions">
                            <Button size="small" variant="outline"><Phone size={16} /></Button>
                            <Button size="small" variant="outline"><Mail size={16} /></Button>
                        </div>
                    </div>
                    <div className="lead-details">
                        <div className="detail-item">
                            <label className="detail-label">Email</label>
                            <p>{lead.email}</p>
                        </div>
                        <div className="detail-item">
                            <label className="detail-label">Phone</label>
                            <p>{lead.phone}</p>
                        </div>
                        <div className="detail-item">
                            <label className="detail-label">Value</label>
                            <p>{lead.value}</p>
                        </div>
                        <div>
                            <label className="detail-label">Status</label>
                            <div><Badge variant="warning">{lead.status}</Badge></div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Right Column: Chat */}
            <Card title="WhatsApp Conversation" className="chat-column">
                <div className="chat-messages">
                    <div className="message-bubble received">
                        <p>Hello! I'm interested in your services.</p>
                        <span className="message-time">10:00 AM</span>
                    </div>
                    <div className="message-bubble sent">
                        <p>Hi there! Thanks for reaching out. How can I help you today?</p>
                        <span className="message-time">10:05 AM</span>
                    </div>
                </div>
                <div className="chat-input-area">
                    <Input placeholder="Type a message..." className="chat-input" />
                    <Button><MessageCircle size={18} /></Button>
                </div>
            </Card>
        </div>
    );
};

export default LeadDetail;
