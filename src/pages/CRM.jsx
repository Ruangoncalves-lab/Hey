import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Badge, Input } from '../components/UI/Basic';
import { DataTable, Modal } from '../components/UI/Complex';
import { LayoutList, Kanban, Plus, Search, Filter } from 'lucide-react';
import { useStore } from '../store/useStore';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './CRM.css';

const CRM = () => {
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'kanban'
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { leads, addLead, updateLeadStatus } = useStore();

    const columns = ['Novo', 'Contatado', 'Qualificado', 'Fechado'];

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { draggableId, destination } = result;
        const newStatus = destination.droppableId;
        updateLeadStatus(draggableId, newStatus);
    };

    const handleAddLead = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        addLead({
            name: formData.get('name'),
            value: formData.get('value'),
            email: formData.get('email'),
            phone: formData.get('phone'),
        });
        setIsAddModalOpen(false);
    };

    const listColumns = [
        {
            key: 'name',
            label: 'Nome',
            sortable: true,
            render: (row) => (
                <Link to={`/crm/${row.id}`} style={{ fontWeight: '600', color: 'var(--text-primary)', textDecoration: 'none' }}>
                    {row.name}
                </Link>
            )
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (row) => <Badge variant="neutral">{row.status}</Badge>
        },
        { key: 'value', label: 'Valor', sortable: true },
        { key: 'email', label: 'Email' },
    ];

    return (
        <div className="page-container">
            <div className="crm-header">
                <h2 className="crm-title">CRM / Leads</h2>
                <div className="crm-controls">
                    <div className="view-toggle">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`view-toggle-btn ${viewMode === 'list' ? 'active' : 'inactive'}`}
                        >
                            <LayoutList size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('kanban')}
                            className={`view-toggle-btn ${viewMode === 'kanban' ? 'active' : 'inactive'}`}
                        >
                            <Kanban size={18} />
                        </button>
                    </div>
                    <Button onClick={() => setIsAddModalOpen(true)} style={{ borderRadius: '0.75rem', boxShadow: '0 4px 12px rgba(108, 93, 211, 0.3)' }}><Plus size={18} /> Novo Lead</Button>
                </div>
            </div>

            {viewMode === 'list' ? (
                <Card className="ui-card" style={{ padding: '0' }}>
                    <div className="crm-search-bar">
                        <div className="search-input-wrapper">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar leads..."
                                className="search-input"
                            />
                        </div>
                        <Button variant="outline" style={{ borderRadius: '0.75rem' }}><Filter size={18} /> Filtros</Button>
                    </div>
                    <DataTable
                        columns={listColumns}
                        data={leads}
                        actions={(row) => <Button variant="ghost" size="small">Editar</Button>}
                    />
                </Card>
            ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="kanban-board">
                        {columns.map(col => (
                            <Droppable key={col} droppableId={col}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="kanban-column"
                                    >
                                        <h4 className="kanban-column-header">
                                            {col}
                                            <span className="kanban-count">
                                                {leads.filter(l => l.status === col).length}
                                            </span>
                                        </h4>
                                        <div className="kanban-list">
                                            {leads.filter(l => l.status === col).map((lead, index) => (
                                                <Draggable key={lead.id} draggableId={lead.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`kanban-card ${snapshot.isDragging ? 'dragging' : ''}`}
                                                            style={{
                                                                ...provided.draggableProps.style
                                                            }}
                                                        >
                                                            <Link to={`/crm/${lead.id}`} className="kanban-card-link">
                                                                <p className="kanban-card-title">{lead.name}</p>
                                                                <div className="kanban-card-footer">
                                                                    <p className="kanban-card-value">{lead.value}</p>
                                                                    <div className="kanban-card-avatar"></div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>
            )}

            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Adicionar Novo Lead"
            >
                <form onSubmit={handleAddLead} className="add-lead-form">
                    <Input name="name" label="Nome" required />
                    <Input name="email" label="Email" type="email" required />
                    <Input name="phone" label="Telefone" />
                    <Input name="value" label="Valor Estimado" placeholder="R$ 0,00" />
                    <div className="form-actions">
                        <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancelar</Button>
                        <Button type="submit" style={{ borderRadius: '0.75rem' }}>Adicionar Lead</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default CRM;
