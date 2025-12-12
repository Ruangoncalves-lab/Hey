# Guia de Integração Meta Ads

Este guia descreve como configurar e implantar a integração completa com Meta Ads (Facebook/Instagram) no TrafficMaster AI.

## Visão Geral

A integração utiliza o fluxo OAuth 2.0 da Meta para autenticar usuários, obter tokens de acesso (long-lived), e sincronizar automaticamente contas de anúncio, campanhas e métricas.

### Arquitetura

*   **Backend:** Supabase Edge Functions (Deno)
*   **Database:** Supabase PostgreSQL (Tabelas `meta_*`)
*   **Frontend:** React + Vite
*   **Auth:** Supabase Auth + Meta OAuth

## Configuração de Variáveis de Ambiente

No painel do Supabase (Project Settings -> Edge Functions), adicione as seguintes variáveis:

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `META_APP_ID` | ID do App Meta | `1234567890` |
| `META_APP_SECRET` | Secret do App Meta | `a1b2c3d4...` |
| `META_REDIRECT_URI` | URL de Callback | `https://<project>.supabase.co/functions/v1/meta-auth-callback` |
| `META_GRAPH_VERSION` | Versão da API | `v21.0` |
| `META_WEBHOOK_VERIFY_TOKEN` | Token para Webhooks | `meu_token_secreto` |
| `SUPABASE_URL` | URL do Projeto | `https://<project>.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave Service Role | `eyJ...` |
| `SUPABASE_ANON_KEY` | Chave Anon | `eyJ...` |

> **Nota:** Nunca exponha `SUPABASE_SERVICE_ROLE_KEY` ou `META_APP_SECRET` no frontend.

## Deploy das Edge Functions

Certifique-se de ter o Supabase CLI instalado e logado.

```bash
# Login
supabase login

# Deploy de todas as funções
supabase functions deploy meta-auth-start
supabase functions deploy meta-auth-callback
supabase functions deploy meta-get-business-entities
supabase functions deploy meta-sync
supabase functions deploy meta-refresh-token
supabase functions deploy meta-webhook-handler
```

## Banco de Dados (Migrations)

As tabelas necessárias estão definidas em `supabase/migrations/20251206_create_meta_tables.sql`.

Para aplicar:
```bash
supabase db push
# OU copie e cole o SQL no SQL Editor do Dashboard Supabase
```

## Configuração no Meta for Developers

1.  Crie um App no [Meta for Developers](https://developers.facebook.com/).
2.  Adicione o produto **"Marketing API"**.
3.  Em **Settings -> Basic**, configure o `App ID` e `App Secret`.
4.  Em **Facebook Login -> Settings**, adicione a `META_REDIRECT_URI` em "Valid OAuth Redirect URIs".
5.  Em **Webhooks**, selecione o objeto `Ad Account` e configure a URL para `https://<project>.supabase.co/functions/v1/meta-webhook-handler` e o Verify Token.

## Scheduler (Cron Jobs)

Para manter os dados atualizados, configure um cron job no Supabase (via pg_cron ou Edge Function Scheduler) para rodar `meta-sync` a cada hora e `meta-refresh-token` diariamente.

Exemplo SQL para pg_cron:
```sql
select cron.schedule(
  'meta-sync-hourly',
  '0 * * * *', -- A cada hora
  $$
  select
    net.http_post(
        url:='https://<project>.supabase.co/functions/v1/meta-sync',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer <SERVICE_ROLE_KEY>"}'::jsonb,
        body:='{}'::jsonb
    ) as request_id;
  $$
);
```

## Testes

### Endpoints de Teste

Você pode testar as funções via cURL ou Postman:

**Iniciar Auth:**
```bash
curl -X POST https://<project>.supabase.co/functions/v1/meta-auth-start \
  -H "Authorization: Bearer <USER_TOKEN>"
```

**Forçar Sync:**
```bash
curl -X POST https://<project>.supabase.co/functions/v1/meta-sync \
  -H "Authorization: Bearer <USER_TOKEN>"
```

## Logs e Debugging

Verifique a tabela `meta_logs` para erros e eventos de webhook.
No Dashboard Supabase, verifique os logs das Edge Functions em "Functions -> Logs".

## Checklist Pós-Deploy

- [ ] Variáveis de ambiente configuradas.
- [ ] Tabelas criadas.
- [ ] Functions deployadas.
- [ ] Redirect URI configurada no Meta.
- [ ] Teste de fluxo de login (Connect Meta Ads).
- [ ] Teste de sincronização de dados.
