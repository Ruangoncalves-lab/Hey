import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import SmartCampaignsTable from '../components/campaigns/SmartCampaignsTable';
import CampaignWizard from '../components/campaigns/CampaignWizard';

const Campaigns = () => {
    const [showWizard, setShowWizard] = useState(false);

    return (
        <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Campanhas</h1>
                    <p className="text-gray-500">Gerenciamento centralizado com filtros inteligentes.</p>
                </div>
                <button
                    onClick={() => setShowWizard(true)}
                    className="btn-primary"
                >
                    <Plus size={20} /> Nova Campanha
                </button>
            </div>

            <SmartCampaignsTable />

            {showWizard && <CampaignWizard onClose={() => setShowWizard(false)} />}
        </div>
    );
};

export default Campaigns;
