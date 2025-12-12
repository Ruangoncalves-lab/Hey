import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
    console.error('❌ Error: DATABASE_URL is missing in .env');
    console.log('Please get the Connection String (URI) from Supabase Settings > Database > Connection string > Node.js');
    console.log('Example: postgresql://postgres:[33642518]@db.xxxx.supabase.co:5432/postgres');
    process.exit(1);
}

const client = new pg.Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
});

async function migrate() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL...');

        const sqlPath = path.join(__dirname, 'supabase_schema.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Running migration...');
        await client.query(sql);

        console.log('✅ Migration successful! Tables created.');
    } catch (err) {
        console.error('❌ Migration failed:', err);
    } finally {Objetivo: Corrigir o erro crítico "500 Internal Server Error" (Resposta Vazia) que ocorre ao tentar listar as contas do Meta Ads. O servidor está a crashar silenciosamente quando o token é inválido ou quando o SDK falha, impedindo o frontend de receber uma mensagem de erro JSON válida.

Por favor, atualiza o ficheiro server/controllers/connectionController.js. Substitui a função listMetaAccounts pela implementação robusta abaixo, que inclui melhor tratamento de erros e validação de resposta:

JavaScript

// No ficheiro server/controllers/connectionController.js

export const listMetaAccounts = async (req, res) => {
    try {
        const { access_token } = req.body;
        console.log('listMetaAccounts chamada. A validar token...');

        if (!access_token) {
            return res.status(400).json({ message: 'Token de acesso é obrigatório' });
        }

        // Tenta buscar contas usando o serviço
        const accounts = await fetchMetaAdAccounts(access_token);
        
        // Validação defensiva: se o SDK retornar null/undefined sem lançar erro
        if (!accounts) {
            console.error('Meta SDK retornou dados nulos.');
            return res.status(500).json({ 
                message: 'O Facebook não retornou dados. O token pode ser inválido ou não ter permissões.' 
            });
        }

        console.log(`Sucesso: ${accounts.length} contas encontradas.`);
        res.json(accounts);

    } catch (error) {
        console.error('ERRO CRÍTICO NO META CONTROLLER:', error);
        
        // Tenta extrair a mensagem de erro específica do Facebook, se existir
        const fbErrorMessage = error.response?.data?.error?.message;
        const finalMessage = fbErrorMessage || error.message || 'Erro desconhecido ao conectar com o Facebook';

        // Garante que a resposta é SEMPRE um JSON com status code apropriado
        res.status(500).json({ 
            message: `Erro na integração: ${finalMessage}`,
            details: error.toString()
        });
    }
};
        await client.end();
    }
}

migrate();
