# TrafficPro Backend

Backend completo para o SaaS TrafficPro.

## Arquitetura

- **Runtime**: Node.js
- **Framework**: Express (estruturado para Serverless/Actions)
- **Database**: MongoDB (Mongoose) - "Antigravity Internal DB"
- **Auth**: JWT + RBAC
- **Jobs**: node-cron

## Estrutura

- `/controllers`: Lógica das Actions (Endpoints)
- `/models`: Schemas do Banco de Dados (Collections)
- `/routes`: Definição das rotas da API
- `/jobs`: Agendamento de tarefas (Cron)
- `/middleware`: Autenticação e Segurança (RLS)

## Como Rodar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure o `.env` (já criado com defaults).

3. Inicie o servidor:
   ```bash
   npm run dev
   ```

## Endpoints Principais

- `POST /api/auth/login`
- `GET /api/tenants/:tid/overview`
- `GET /api/tenants/:tid/campaigns`
- `POST /api/tenants/:tid/creatives/upload` (IA Analysis incluída)

## Jobs

- `metricsAggregatorJob`: Sincroniza métricas de hora em hora.
- `insightsEngineJob`: Analisa anomalias a cada 15 min.
