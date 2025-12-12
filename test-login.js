import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nbddrowjbidowlpoyetv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iZGRyb3dqYmlkb3dscG95ZXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4OTY4MDIsImV4cCI6MjA4MDQ3MjgwMn0.GjWLuRDzzwZex4mOYUJkT-PbqrIqVBhXpqPuT8cBn3w'
const supabase = createClient(supabaseUrl, supabaseKey)

async function testLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'ruan.silva.gon@gmail.com',
        password: '33642518',
    })

    if (error) {
        console.error('Login failed:', error.message)
    } else {
        console.log('Login successful!')
        console.log('User ID:', data.user.id)
        console.log('Access Token:', data.session.access_token.substring(0, 20) + '...')
    }
}

testLogin()
