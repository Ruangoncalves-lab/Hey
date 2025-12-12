import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './GoogleCampaignDetail.css';
import {
    ArrowLeft,
    Edit,
    Copy,
    PauseCircle,
    X,
    TrendingUp,
    MousePointer,
    DollarSign,
    Target,
    BarChart2,
    ThumbsUp,
    ThumbsDown,
    AlertTriangle,
    CheckCircle
} from 'lucide-react';

const GoogleCampaignDetail = () => {
    const { id } = useParams();

    // --- Mock Data ---
    const metrics = [
        { title: 'Impressões', value: '45K' },
        { title: 'Cliques', value: '2.1K' },
        { title: 'CPC Médio', value: 'R$ 0,90' },
        { title: 'Custo', value: 'R$ 1.890' },
        { title: 'Conversões', value: '150' },
        { title: 'CPA', value: 'R$ 12,50' },
        { title: 'Índice Qual.', value: '8/10' },
        { title: 'ROAS', value: '8.5' },
    ];

    const keywords = [
        { text: 'comprar tênis corrida', type: 'Exata', qs: '9/10', ctr: '12%', cpc: 'R$ 0,85', conv: 45, cpa: 'R$ 10,00', roas: '9.2' },
        { text: 'melhores tênis 2025', type: 'Frase', qs: '7/10', ctr: '8%', cpc: 'R$ 1,10', conv: 30, cpa: 'R$ 15,00', roas: '7.5' },
        { text: 'loja de calçados', type: 'Ampla', qs: '5/10', ctr: '3%', cpc: 'R$ 0,60', conv: 10, cpa: 'R$ 25,00', roas: '4.0' },
    ];

    const searchTerms = [
        { term: 'tênis nike promoção', clicks: 120, conv: 8, cost: 'R$ 90,00' },
        { term: 'sapato barato online', clicks: 80, conv: 2, cost: 'R$ 50,00' },
        { term: 'tênis para caminhada', clicks: 200, conv: 15, cost: 'R$ 150,00' },
    ];

    const ads = [
        {
            id: 1,
            headline: 'Tênis de Corrida em Oferta | Frete Grátis Brasil',
            desc: 'Encontre os melhores modelos de tênis para sua corrida. Descontos de até 50%.',
            url: 'www.loja.com.br/tenis',
            ctr: '10.5%', cpc: 'R$ 0,80', conv: 60, strength: 'Excelente'
        },
        {
            id: 2,
            headline: 'Melhores Tênis 2025 | Conforto e Performance',
            desc: 'Tecnologia de ponta para seus pés. Compre agora e receba em casa.',
            url: 'www.loja.com.br/lancamentos',
            ctr: '8.2%', cpc: 'R$ 0,95', conv: 40, strength: 'Bom'
        }
    ];

    return (
        <div className="google-campaign-detail-page">
            {/* Header */}
            <div className="gcd-header">
                <div className="gcd-title">
                    <h1>
                        <Link to="/traffic/google" className="text-slate-400 hover:text-slate-600"><ArrowLeft size={24} /></Link>
                        Pesquisa - Institucional
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full ml-2">Ativa</span>
                    </h1>
                    <p className="ml-10">Análise detalhada da campanha de Pesquisa</p>
                </div>
                <div className="gcd-actions">
                    <button className="gcd-btn"><Edit size={16} /> Editar</button>
                    <button className="gcd-btn"><Copy size={16} /> Duplicar</button>
                    <button className="gcd-btn"><PauseCircle size={16} /> Pausar</button>
                    <Link to="/traffic/google" className="gcd-btn hover:bg-red-50 hover:text-red-600 border-transparent"><X size={20} /></Link>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="gcd-metrics-grid">
                {metrics.map((m, i) => (
                    <div key={i} className="gcd-metric-card">
                        <div className="gcd-metric-title">{m.title}</div>
                        <div className="gcd-metric-value">{m.value}</div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="gcd-charts-grid">
                <div className="gcd-chart-card">
                    <h3 className="gcd-chart-title">CPC por Dia</h3>
                    <div className="h-40 bg-slate-50 dark:bg-slate-800 rounded flex items-center justify-center text-slate-400">
                        <DollarSign size={32} />
                    </div>
                </div>
                <div className="gcd-chart-card">
                    <h3 className="gcd-chart-title">Conversões por Dia</h3>
                    <div className="h-40 bg-slate-50 dark:bg-slate-800 rounded flex items-center justify-center text-slate-400">
                        <Target size={32} />
                    </div>
                </div>
                <div className="gcd-chart-card">
                    <h3 className="gcd-chart-title">Gasto por Dia</h3>
                    <div className="h-40 bg-slate-50 dark:bg-slate-800 rounded flex items-center justify-center text-slate-400">
                        <BarChart2 size={32} />
                    </div>
                </div>
            </div>

            {/* Keywords Table */}
            <div>
                <h2 className="gcd-section-title">Palavras-chave</h2>
                <div className="gcd-table-card">
                    <table className="gcd-table">
                        <thead>
                            <tr>
                                <th>Palavra-chave</th>
                                <th>Tipo</th>
                                <th>Índice Qual.</th>
                                <th>CTR</th>
                                <th>CPC</th>
                                <th>Conversões</th>
                                <th>CPA</th>
                                <th>ROAS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {keywords.map((kw, i) => (
                                <tr key={i}>
                                    <td className="font-medium">{kw.text}</td>
                                    <td><span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">{kw.type}</span></td>
                                    <td>
                                        <span className={parseInt(kw.qs) >= 7 ? 'text-green-600' : 'text-yellow-600'}>{kw.qs}</span>
                                    </td>
                                    <td>{kw.ctr}</td>
                                    <td>{kw.cpc}</td>
                                    <td>{kw.conv}</td>
                                    <td>{kw.cpa}</td>
                                    <td className="text-green-600 font-semibold">{kw.roas}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Search Terms & Ads Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Search Terms */}
                <div>
                    <h2 className="gcd-section-title">Termos de Pesquisa</h2>
                    <div className="gcd-table-card">
                        <table className="gcd-table">
                            <thead>
                                <tr>
                                    <th>Termo Buscado</th>
                                    <th>Cliques</th>
                                    <th>Conv.</th>
                                    <th>Custo</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchTerms.map((st, i) => (
                                    <tr key={i}>
                                        <td className="font-medium">{st.term}</td>
                                        <td>{st.clicks}</td>
                                        <td>{st.conv}</td>
                                        <td>{st.cost}</td>
                                        <td>
                                            <button className="text-red-500 hover:text-red-700 text-xs font-medium border border-red-200 px-2 py-1 rounded hover:bg-red-50">
                                                Negativar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Ads */}
                <div>
                    <h2 className="gcd-section-title">Anúncios</h2>
                    <div className="gcd-ads-grid">
                        {ads.map(ad => (
                            <div key={ad.id} className="gcd-ad-card">
                                <div className="gcd-ad-preview">
                                    <div className="gcd-ad-url">Anúncio &middot; {ad.url}</div>
                                    <div className="gcd-ad-headline">{ad.headline}</div>
                                    <div className="gcd-ad-desc">{ad.desc}</div>
                                </div>
                                <div className="flex items-center gap-2 text-sm mb-3">
                                    <span className="text-slate-500">Força do Anúncio:</span>
                                    <span className="font-medium text-green-600 flex items-center gap-1">
                                        <CheckCircle size={14} /> {ad.strength}
                                    </span>
                                </div>
                                <div className="gcd-ad-stats">
                                    <div className="gcd-ad-stat">
                                        <div className="gcd-ad-stat-label">CTR</div>
                                        <div className="gcd-ad-stat-val">{ad.ctr}</div>
                                    </div>
                                    <div className="gcd-ad-stat">
                                        <div className="gcd-ad-stat-label">CPC</div>
                                        <div className="gcd-ad-stat-val">{ad.cpc}</div>
                                    </div>
                                    <div className="gcd-ad-stat">
                                        <div className="gcd-ad-stat-label">Conv.</div>
                                        <div className="gcd-ad-stat-val">{ad.conv}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoogleCampaignDetail;
