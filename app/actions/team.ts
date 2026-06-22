'use server'

import { supabaseAdmin } from '../../src/lib/supabase-admin'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

// Helper to check if caller is super_admin
async function isSuperAdmin() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll() { return cookieStore.getAll() }, setAll() {} } }
    )
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (!session) return { authorized: false, reason: `No session. Auth error: ${sessionError?.message}` }
    
    if (!supabaseAdmin) return { authorized: false, reason: 'supabaseAdmin is null' }
    
    const { data, error: dbError } = await supabaseAdmin.from('user_roles').select('role').eq('id', session.user.id).single()
    if (data?.role !== 'super_admin') return { authorized: false, reason: `Role is ${data?.role || 'none'}. DB Error: ${dbError?.message}` }
    
    return { authorized: true }
  } catch (err: any) {
    return { authorized: false, reason: `Exception: ${err.message}` }
  }
}

// Bootstrap Action: Allow promoting logged-in user to super_admin
export async function bootstrapSuperAdmin() {
  if (!supabaseAdmin) return { error: 'Supabase admin client not initialized' }
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll() { return cookieStore.getAll() }, setAll() {} } }
    )
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return { error: 'No active session. Please log in first.' }

    // Insert/upsert the current user as super_admin
    const { error: insertError } = await supabaseAdmin
      .from('user_roles')
      .upsert({ id: session.user.id, role: 'super_admin' })

    if (insertError) throw insertError

    revalidatePath('/admin')
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Failed to bootstrap.' }
  }
}

// Get if bootstrap is allowed (no super_admin exists yet)
export async function isBootstrapAllowed() {
  if (!supabaseAdmin) return { allowed: false }
  try {
    const { data, error } = await supabaseAdmin
      .from('user_roles')
      .select('id')
      .eq('role', 'super_admin')
      .limit(1)

    if (error) {
      // If table doesn't exist or roles empty, allow bootstrap
      return { allowed: true }
    }
    return { allowed: !data || data.length === 0 }
  } catch {
    return { allowed: true }
  }
}

export async function createTeamMember(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as string
  
  if (!supabaseAdmin) {
    return { error: 'Server config error: Supabase admin client not initialized.' }
  }

  const adminCheck = await isSuperAdmin();
  if (!adminCheck.authorized) {
    return { error: `Unauthorized: ${adminCheck.reason}` }
  }

  try {
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (authError) throw authError

    const userId = authData.user.id

    const { error: dbError } = await supabaseAdmin
      .from('user_roles')
      .insert([{ id: userId, role }])

    if (dbError) {
      await supabaseAdmin.auth.admin.deleteUser(userId)
      throw dbError
    }

    revalidatePath('/admin/team')
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Failed to create user.' }
  }
}

export async function deleteTeamMember(userId: string) {
  if (!supabaseAdmin) {
    return { error: 'Server config error: Supabase admin client not initialized.' }
  }
  const adminCheck = await isSuperAdmin();
  if (!adminCheck.authorized) {
    return { error: `Unauthorized: ${adminCheck.reason}` }
  }
  try {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)
    if (error) throw error
    revalidatePath('/admin/team')
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Failed to delete user.' }
  }
}

export async function getTeamMembers() {
  if (!supabaseAdmin) {
    return { error: 'Server config error: Supabase admin client not initialized.', users: [] }
  }
  const adminCheck = await isSuperAdmin();
  if (!adminCheck.authorized) return { error: `Unauthorized: ${adminCheck.reason}`, users: [] }
  try {
    const { data: roles } = await supabaseAdmin.from('user_roles').select('*')
    const { data: authData } = await supabaseAdmin.auth.admin.listUsers()
    
    const users = (roles || []).map(r => {
      const authUser = authData.users.find(u => u.id === r.id)
      return {
        id: r.id,
        email: authUser?.email || 'Unknown',
        role: r.role,
        created_at: authUser?.created_at || new Date().toISOString()
      }
    })
    
    return { success: true, users }
  } catch (err: any) {
    return { error: err.message || 'Failed to fetch users.', users: [] }
  }
}

