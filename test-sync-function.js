import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nbddrowjbidowlpoyetv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iZGRyb3dqYmlkb3dscG95ZXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4OTY4MDIsImV4cCI6MjA4MDQ3MjgwMn0.GjWLuRDzzwZex4mOYUJkT-PbqrIqVBhXpqPuT8cBn3w'
const supabase = createClient(supabaseUrl, supabaseKey)

async function testSync() {
    console.log('Invoking meta-sync...');
    const { data, error } = await supabase.functions.invoke('meta-sync', {
        body: { user_id: 'a25b4c59-9774-4a09-b97a-1f4a569402ad' }
    })

    if (error) {
        console.error('Sync failed:', error)
    } else {
        console.log('Sync success:', data)
    }
}

testSync()
