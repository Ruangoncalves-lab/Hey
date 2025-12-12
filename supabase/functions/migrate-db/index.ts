import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import * as postgres from "https://deno.land/x/postgres@v0.17.0/mod.ts"

serve(async (req) => {
    try {
        const databaseUrl = Deno.env.get('SUPABASE_DB_URL')
        if (!databaseUrl) throw new Error('SUPABASE_DB_URL not set')

        const pool = new postgres.Pool(databaseUrl, 3, true)
        const connection = await pool.connect()

        try {
            await connection.queryObject`
        ALTER TABLE public.meta_tokens 
        ADD COLUMN IF NOT EXISTS meta_user_name text,
        ADD COLUMN IF NOT EXISTS meta_user_id text;
      `
            console.log('Migration executed successfully')
        } finally {
            connection.release()
        }

        return new Response("Migration done", { status: 200 })
    } catch (err) {
        console.error(err)
        return new Response(err.message, { status: 500 })
    }
})
