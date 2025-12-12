import React, { useState } from 'react';
import {
    Image,
    Video,
    Upload,
    Wand2,
    Filter,
    Search,
    MoreVertical,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    BarChart2,
    BrainCircuit
} from 'lucide-react';

const CreativeLibrary = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

    // Mock Creatives Data
    const creatives = [
        { id: 1, name: 'Video_Promo_Verão.mp4', type: 'video', efficiency: 92, status: 'approved', ctr: '2.8%', roas: '4.5', thumbnail: 'bg-emerald-100' },
        { id: 2, name: 'Banner_Oferta_Relampago.jpg', type: 'image', efficiency: 85, status: 'approved', ctr: '1.9%', roas: '3.2', thumbnail: 'bg-blue-100' },
        { id: 3, name: 'Stories_Depoimento.mp4', type: 'video', efficiency: 78, status: 'warning', ctr: '1.2%', roas: '2.1', thumbnail: 'bg-purple-100' },
        { id: 4, name: 'Carrossel_Produtos.jpg', type: 'image', efficiency: 95, status: 'approved', ctr: '3.5%', roas: '5.8', thumbnail: 'bg-orange-100' },
        { id: 5, name: 'Reels_Bastidores.mp4', type: 'video', efficiency: 65, status: 'rejected', ctr: '-', roas: '-', thumbnail: 'bg-red-100' },
    ];

    const handleUpload = () => {
        setAnalyzing(true);
        // Simulate AI Analysis
        setTimeout(() => {
            setAnalyzing(false);
            setAnalysisResult({
                score: 88,
                ctrPotential: 'High (2.5% - 3.5%)',
                roasPotential: '4.0x+',
                visuals: 'Bom contraste, texto legível, foco no produto.',
                psychology: 'Gera urgência e desejo.',
                suggestion: 'Adicionar uma CTA mais clara no final.'
            });
        }, 2000);
    };

    return (
        <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Biblioteca de Criativos</h1>
                    <p className="text-gray-500">Gerencie e analise seus ativos com Inteligência Artificial.</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn-secondary">
                        <Wand2 size={18} /> Gerar com IA
                    </button>
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="btn-primary"
                    >
                        <Upload size={18} /> Upload de Mídia
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-[20px] shadow-sm border border-gray-100">
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
                    {['Todos', 'Vídeos', 'Imagens', 'Carrossel'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.toLowerCase() || (activeTab === 'all' && tab === 'Todos')
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar criativo..."
                            className="input-premium pl-10 py-2"
                        />
                    </div>
                    <button className="btn-secondary px-3">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Creatives Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {creatives.map((item) => (
                    <div key={item.id} className="card-premium p-0 overflow-hidden group cursor-pointer hover:ring-2 hover:ring-emerald-500/50 transition-all">
                        {/* Thumbnail */}
                        <div className={`h-48 ${item.thumbnail} relative flex items-center justify-center`}>
                            {item.type === 'video' ? <Video size={48} className="text-gray-400/50" /> : <Image size={48} className="text-gray-400/50" />}

                            {/* Overlay Stats */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 text-white p-4">
                                <div className="flex items-center gap-2">
                                    <BarChart2 size={16} />
                                    <span className="font-bold">{item.ctr} CTR</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BrainCircuit size={16} />
                                    <span className="font-bold">{item.roas} ROAS</span>
                                </div>
                                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-bold mt-2 hover:scale-105 transition-transform">
                                    Ver Análise IA
                                </button>
                            </div>

                            {/* Efficiency Badge */}
                            <div className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm ${item.efficiency >= 90 ? 'bg-emerald-500 text-white' :
                                    item.efficiency >= 70 ? 'bg-yellow-500 text-white' :
                                        'bg-red-500 text-white'
                                }`}>
                                <BrainCircuit size={12} />
                                {item.efficiency}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm truncate w-40">{item.name}</h3>
                                    <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreVertical size={16} />
                                </button>
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-2 mt-3">
                                {item.status === 'approved' && <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full"><CheckCircle2 size={12} /> Aprovado IA</div>}
                                {item.status === 'warning' && <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full"><AlertTriangle size={12} /> Atenção</div>}
                                {item.status === 'rejected' && <div className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full"><XCircle size={12} /> Rejeitado</div>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Upload & Analysis Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <BrainCircuit className="text-emerald-600" />
                                Análise Preditiva de Criativo
                            </h2>
                            <button onClick={() => { setShowUploadModal(false); setAnalysisResult(null); }} className="text-gray-400 hover:text-gray-600">
                                <XCircle size={24} />
                            </button>
                        </div>

                        <div className="p-8">
                            {!analyzing && !analysisResult && (
                                <div
                                    className="border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all cursor-pointer"
                                    onClick={handleUpload}
                                >
                                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                        <Upload size={32} />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-bold text-gray-900 text-lg">Clique para fazer upload</h3>
                                        <p className="text-gray-500 text-sm">MP4, JPG, PNG (Max 50MB)</p>
                                    </div>
                                </div>
                            )}

                            {analyzing && (
                                <div className="flex flex-col items-center justify-center py-12 gap-6">
                                    <div className="relative w-24 h-24">
                                        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
                                        <BrainCircuit className="absolute inset-0 m-auto text-emerald-600 animate-pulse" size={32} />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-bold text-gray-900 text-lg">A IA está analisando seu criativo...</h3>
                                        <p className="text-gray-500 text-sm">Verificando padrões visuais, texto e apelo psicológico.</p>
                                    </div>
                                </div>
                            )}

                            {analysisResult && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                    <div className="flex items-center gap-6">
                                        <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                                            <Image size={32} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-3xl font-bold text-emerald-600">{analysisResult.score}</span>
                                                <span className="text-sm text-gray-500 font-medium">/ 100 Pontos de Eficiência</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-emerald-50 p-3 rounded-lg">
                                                    <div className="text-xs text-emerald-800 font-bold uppercase">Potencial CTR</div>
                                                    <div className="font-bold text-emerald-700">{analysisResult.ctrPotential}</div>
                                                </div>
                                                <div className="bg-blue-50 p-3 rounded-lg">
                                                    <div className="text-xs text-blue-800 font-bold uppercase">Potencial ROAS</div>
                                                    <div className="font-bold text-blue-700">{analysisResult.roasPotential}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex gap-3 items-start">
                                            <CheckCircle2 className="text-emerald-500 mt-1 shrink-0" size={18} />
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-sm">Análise Visual</h4>
                                                <p className="text-sm text-gray-600">{analysisResult.visuals}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 items-start">
                                            <BrainCircuit className="text-purple-500 mt-1 shrink-0" size={18} />
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-sm">Psicologia</h4>
                                                <p className="text-sm text-gray-600">{analysisResult.psychology}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 items-start bg-yellow-50 p-3 rounded-xl">
                                            <Wand2 className="text-yellow-600 mt-1 shrink-0" size={18} />
                                            <div>
                                                <h4 className="font-bold text-yellow-800 text-sm">Sugestão da IA</h4>
                                                <p className="text-sm text-yellow-700">{analysisResult.suggestion}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="w-full btn-primary mt-4">
                                        Adicionar à Biblioteca
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreativeLibrary;
