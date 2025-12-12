import React from 'react';
import SectionCard from '../components/SectionCard';
import StatusPill from '../components/StatusPill';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';

const Products = () => {
    const products = [
        {
            id: 1,
            name: 'Apple Watch Series 7',
            category: 'Eletrônicos',
            price: 'R$ 2.699',
            stock: 45,
            status: 'Ativo',
            image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=150&q=80'
        },
        {
            id: 2,
            name: 'MacBook Pro M1',
            category: 'Eletrônicos',
            price: 'R$ 12.999',
            stock: 12,
            status: 'Ativo',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=150&q=80'
        },
        {
            id: 3,
            name: 'Tênis Nike Air Max',
            category: 'Esportes',
            price: 'R$ 899',
            stock: 0,
            status: 'Inativo',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&q=80'
        },
        {
            id: 4,
            name: 'Fone Sony WH-1000XM4',
            category: 'Eletrônicos',
            price: 'R$ 1.799',
            stock: 28,
            status: 'Ativo',
            image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=150&q=80'
        },
        {
            id: 5,
            name: 'iPad Air',
            category: 'Eletrônicos',
            price: 'R$ 5.499',
            stock: 18,
            status: 'Ativo',
            image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=150&q=80'
        },
        {
            id: 6,
            name: 'Câmera Canon EOS R6',
            category: 'Fotografia',
            price: 'R$ 18.999',
            stock: 5,
            status: 'Ativo',
            image: 'https://images.unsplash.com/photo-1606980707146-b3a0c1a0d7f9?w=150&q=80'
        },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Produtos</h1>
                    <p className="text-sm text-gray-500 mt-1">{products.length} produtos cadastrados</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <Plus size={18} />
                    Adicionar Produto
                </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <SectionCard key={product.id} className="hover:shadow-md transition-shadow">
                        <div className="space-y-4">
                            {/* Product Image */}
                            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Product Info */}
                            <div>
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                                        <p className="text-xs text-gray-500">{product.category}</p>
                                    </div>
                                    <StatusPill
                                        status={product.status}
                                        variant={product.status === 'Ativo' ? 'success' : 'default'}
                                    />
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-lg font-semibold text-gray-900">{product.price}</span>
                                    <span className="text-sm text-gray-500">
                                        Estoque: <span className={product.stock === 0 ? 'text-red-600 font-medium' : 'font-medium'}>{product.stock}</span>
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <button className="flex-1 btn-secondary text-xs py-2 flex items-center justify-center gap-1">
                                        <Eye size={14} />
                                        Ver
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                        <Edit size={16} className="text-gray-600" />
                                    </button>
                                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 size={16} className="text-red-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SectionCard>
                ))}

                {/* Add New Product Card */}
                <SectionCard className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
                    <div className="aspect-square flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                            <Plus size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">Adicionar Produto</h3>
                        <p className="text-xs text-gray-500">Cadastre um novo produto</p>
                    </div>
                </SectionCard>
            </div>
        </div>
    );
};

export default Products;
