'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TestDB() {
  const [status, setStatus] = useState('🔄 Testing connection...')
  const [details, setDetails] = useState<string[]>([])
  
  useEffect(() => {
    async function testConnection() {
      const supabase = createClient()
      const results: string[] = []
      
      try {
        // Test 1: Check if we can connect
        results.push('✅ Supabase client created')
        
        // Test 2: Try to query templates table
        const { data, error, count } = await supabase
          .from('templates')
          .select('*', { count: 'exact' })
        
        if (error) {
          results.push(`❌ Database query failed: ${error.message}`)
          setStatus('❌ Connection failed - Check if you ran the SQL migration!')
        } else {
          results.push(`✅ Templates table exists`)
          results.push(`✅ Found ${count || 0} templates`)
          
          // Show template details if any exist
          if (data && data.length > 0) {
            results.push(`\n📋 Templates:`)
            data.forEach((template: any) => {
              results.push(`   • ${template.name} (${template.price_tier}) - ₹${template.price}`)
            })
          } else {
            results.push(`⚠️ No templates yet - Run the seed migration!`)
          }
          
          setStatus('✅ Database connected successfully!')
        }
        
        // Test 3: Check auth
        const { data: { session } } = await supabase.auth.getSession()
        results.push(`\n${session ? '✅ User logged in' : '⚪ No user logged in (OK)'}`)
        
      } catch (err) {
        results.push(`❌ Error: ${err}`)
        setStatus('❌ Connection failed')
      }
      
      setDetails(results)
    }
    
    testConnection()
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          🗄️ Database Connection Test
        </h1>
        
        <div className="mb-6 p-4 rounded-lg bg-gray-100">
          <p className="text-2xl font-bold">{status}</p>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-bold mb-2">Details:</h2>
          {details.map((detail, i) => (
            <div key={i} className="p-2 bg-gray-50 rounded">
              {detail}
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-bold mb-2">📋 Next Steps:</h3>
          <ol className="list-decimal ml-5 space-y-1 text-sm">
            <li>If you see ✅ Database connected, you're ready!</li>
            <li>If templates = 0, run <code className="bg-blue-100 px-1 rounded">002_seed_templates.sql</code></li>
            <li>Once seeded, you'll see 6 templates listed above</li>
            <li>Then you can build the Template Browser page!</li>
          </ol>
        </div>
        
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-bold mb-2 text-green-800">🎯 Seeding Templates:</h3>
          <ol className="list-decimal ml-5 space-y-1 text-sm text-green-900">
            <li>Open Supabase Dashboard → SQL Editor</li>
            <li>Copy <code className="bg-green-100 px-1 rounded">/supabase/migrations/002_seed_templates.sql</code></li>
            <li>Paste and Run in SQL Editor</li>
            <li>Refresh this page - should show 6 templates!</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
