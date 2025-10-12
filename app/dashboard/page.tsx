import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/lib/auth/actions'
import Link from 'next/link'
import { DeleteButton } from '@/components/dashboard/DeleteButton'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/auth/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get user's invitations count and data (exclude deleted)
  const { data: invitations, count: invitationCount } = await supabase
    .from('invitations')
    .select('*, templates(name, category)', { count: 'exact' })
    .eq('user_id', user.id)
    .neq('status', 'deleted')
    .order('created_at', { ascending: false })

  // Cast to proper types
  const typedProfile = profile as any
  const typedInvitations = invitations as any[]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🪔</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">WebKankotri</h1>
                <p className="text-sm text-gray-600">Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">
                  {typedProfile?.full_name || 'User'}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              
              <form action={signOut}>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {typedProfile?.full_name || 'there'}! 👋
          </h2>
          <p className="text-purple-100">
            Ready to create beautiful wedding invitations?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Invitations */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Invitations</p>
                <p className="text-3xl font-bold text-gray-800">{invitationCount || 0}</p>
              </div>
              <div className="bg-purple-100 rounded-full p-4">
                <span className="text-3xl">📨</span>
              </div>
            </div>
          </div>

          {/* Published */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Published</p>
                <p className="text-3xl font-bold text-gray-800">0</p>
              </div>
              <div className="bg-green-100 rounded-full p-4">
                <span className="text-3xl">✅</span>
              </div>
            </div>
          </div>

          {/* Total Views */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Views</p>
                <p className="text-3xl font-bold text-gray-800">0</p>
              </div>
              <div className="bg-blue-100 rounded-full p-4">
                <span className="text-3xl">👀</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/templates" className="p-6 border-2 border-dashed border-purple-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-600 rounded-full p-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">➕</span>
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-800 mb-1">Create New Invitation</h4>
                  <p className="text-sm text-gray-600">Start designing your wedding card</p>
                </div>
              </div>
            </Link>

            <Link href="/templates" className="p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all group">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-600 rounded-full p-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🎨</span>
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-800 mb-1">Browse Templates</h4>
                  <p className="text-sm text-gray-600">Explore beautiful designs</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Invitations */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Your Invitations</h3>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
              View All →
            </button>
          </div>
          
          {invitationCount === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                No invitations yet
              </h4>
              <p className="text-gray-600 mb-6">
                Create your first invitation to get started!
              </p>
              <Link href="/templates" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                Create Your First Invitation
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {invitations?.map((invitation: any) => (
                <div key={invitation.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-bold text-gray-800">{invitation.title}</h4>
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          invitation.status === 'published' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {invitation.status === 'published' ? '✅ Published' : '📝 Draft'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>🎨 {invitation.templates?.name || 'Unknown Template'}</span>
                        <span>📅 {invitation.wedding_date ? new Date(invitation.wedding_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No date'}</span>
                        <span>📊 {invitation.data?.sections?.length || 0} sections</span>
                        <span>👀 {invitation.view_count || 0} views</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Link
                        href={`/create?edit=${invitation.id}`}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                      >
                        ✏️ Edit
                      </Link>
                      
                      {invitation.status === 'published' && (
                        <Link
                          href={`/invite/${invitation.slug}`}
                          target="_blank"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          👁️ View
                        </Link>
                      )}

                      <DeleteButton 
                        invitationId={invitation.id}
                        invitationTitle={invitation.title}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
