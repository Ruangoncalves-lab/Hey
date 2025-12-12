import React, { useState } from 'react';
import { Facebook, ChevronDown, ChevronUp, RefreshCw, LogOut } from 'lucide-react';
import Toggle from './Toggle';

const MetaIntegrationCard = ({ isConnected, profileName, adAccounts, onConnect, onSync, onDisconnect, onToggleAccount }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!isConnected) {
        return (
            <div className="card-premium p-6 flex flex-col items-center text-center h-full">
                <div className="flex flex-col items-center w-full flex-1">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4"><Facebook size={32} /></div>
                    <h3 className="font-bold text-gray-900">Meta Ads</h3>
                    <p className="text-sm text-gray-500 mb-4">Gerencie suas campanhas</p>
                </div>
                <button onClick={onConnect} className="btn-primary w-full border-none mt-auto">Conectar Perfil</button>
            </div>
        );
    }

    return (
        <div className="card-premium border-2 border-emerald-500/20 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Facebook size={120} className="text-blue-600" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                        <Facebook size={32} />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-gray-900">Meta Ads</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="flex h-2.5 w-2.5 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-sm font-medium text-emerald-600">Conectado e Ativo</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Perfil Conectado</span>
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                            {profileName}
                        </span>
                    </div>

                    <div className="mt-4">
                        <div
                            className="flex justify-between items-center cursor-pointer hover:text-blue-600 transition-colors"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                Contas de Anúncio
                                <span className="bg-gray-200 text-gray-600 text-xs py-0.5 px-2 rounded-full">{adAccounts?.length || 0}</span>
                            </span>
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>

                        {isExpanded && (
                            <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                {adAccounts && adAccounts.length > 0 ? (
                                    adAccounts.map(acc => (
                                        <div key={acc.id} className="flex justify-between items-center p-2.5 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                                            <div className="overflow-hidden">
                                                <p className="text-sm font-medium text-gray-900 truncate">{acc.name}</p>
                                                <p className="text-xs text-gray-400 font-mono">{acc.account_id}</p>
                                            </div>
                                            <Toggle checked={acc.is_selected} onChange={() => onToggleAccount(acc)} />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-400 text-center py-2 italic">Nenhuma conta encontrada.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onSync}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full font-semibold text-sm bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all shadow-sm hover:shadow-md"
                    >
                        <RefreshCw size={16} /> Sincronizar
                    </button>
                    <button
                        onClick={onDisconnect}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full font-semibold text-sm bg-white border border-gray-200 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all shadow-sm hover:shadow-md"
                    >
                        <LogOut size={16} /> Desconectar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MetaIntegrationCard;
