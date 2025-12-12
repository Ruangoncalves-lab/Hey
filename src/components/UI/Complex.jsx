import React, { useState, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { Input, Button } from './Basic';

// Simple Table Component (Legacy)
export const Table = ({ headers, children, className = '' }) => (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className={`table-clean ${className}`}>
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    </div>
);

// Dynamic Data Table Component
export const DataTable = ({ columns, data, searchable = true, pagination = true, itemsPerPage = 5, actions }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // Filter
    const filteredData = useMemo(() => {
        if (!searchTerm) return data;
        return data.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [data, searchTerm]);

    // Sort
    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;
        return [...filteredData].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig]);

    // Paginate
    const paginatedData = useMemo(() => {
        if (!pagination) return sortedData;
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedData, currentPage, pagination, itemsPerPage]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const handleSort = (key) => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    return (
        <div>
            {searchable && (
                <div className="mb-6">
                    <Input
                        placeholder="Pesquisar..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="max-w-xs"
                    />
                </div>
            )}

            <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="table-clean">
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    onClick={() => col.sortable && handleSort(col.key)}
                                    className={col.sortable ? 'cursor-pointer hover:bg-gray-50' : ''}
                                >
                                    <div className="flex items-center gap-2">
                                        {col.label}
                                        {col.sortable && <ArrowUpDown size={14} className="text-gray-400" />}
                                    </div>
                                </th>
                            ))}
                            {actions && <th>Ações</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col) => (
                                    <td key={`${rowIndex}-${col.key}`}>
                                        {col.render ? col.render(row) : row[col.key]}
                                    </td>
                                ))}
                                {actions && (
                                    <td>{actions(row)}</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {pagination && totalPages > 1 && (
                <div className="flex justify-end items-center gap-4 mt-6">
                    <span className="text-sm text-gray-500">
                        Página {currentPage} de {totalPages}
                    </span>
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            className="!px-3 !py-2"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft size={16} />
                        </Button>
                        <Button
                            variant="secondary"
                            className="!px-3 !py-2"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Modal Component
export const Modal = ({ isOpen, onClose, title, children, footer }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="bg-white rounded-[28px] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" onClick={onClose}><X size={20} className="text-gray-500" /></button>
                </div>
                <div className="p-6">{children}</div>
                {footer && <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">{footer}</div>}
            </div>
        </div>
    );
};

// Tabs Component
export const Tabs = ({ tabs, activeTab, onTabChange }) => (
    <div className="flex gap-2 border-b border-gray-200 mb-6">
        {tabs.map(tab => (
            <button
                key={tab.id}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => onTabChange(tab.id)}
            >
                {tab.label}
            </button>
        ))}
    </div>
);
