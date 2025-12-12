# Changelog

## [Unreleased] - 2025-12-06

### Adicionado
- **Integração Meta Ads Completa**:
    - Fluxo OAuth 2.0 com troca de token (short-lived -> long-lived).
    - Sincronização automática de Contas, Campanhas e Métricas.
    - Webhooks para atualizações em tempo real.
    - Renovação automática de tokens.
- **Banco de Dados**:
    - Novas tabelas: `meta_tokens`, `meta_ad_accounts`, `meta_campaigns`, `meta_ad_sets`, `meta_ads`, `meta_metrics`, `meta_logs`.
    - Políticas RLS para segurança dos dados.
- **Edge Functions**:
    - `meta-auth-start`: Inicia fluxo OAuth.
    - `meta-auth-callback`: Processa callback e salva tokens.
    - `meta-get-business-entities`: Busca Business Managers e Ad Accounts.
    - `meta-sync`: Sincroniza dados da API Meta para o DB.
    - `meta-refresh-token`: Renova tokens expirando.
    - `meta-webhook-handler`: Recebe notificações da Meta.
- **Frontend**:
    - Página `AuthCallback`: Processamento de retorno do login Meta.
    - Componente `ConnectMetaButton`: Botão reutilizável para conexão.
    - Página `Integrations`: Atualizada para usar novo fluxo.
    - Páginas `meta/Dashboard`, `meta/Accounts`, `meta/Campaigns`: Visualização de dados.
- **Documentação**:
    - `META_INTEGRATION_GUIDE.md`: Guia completo de configuração e deploy.

### Alterado
- `src/pages/Integrations.jsx`: Refatorado para usar `ConnectMetaButton` e fluxo via Edge Functions.
- `src/App.jsx`: Adicionadas rotas `/meta/*` e `/auth/callback`.
