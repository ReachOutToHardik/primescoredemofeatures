'use server'

import { supabaseAdmin } from '../../src/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

export async function createTeamMember(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as string
  
  if (!supabaseAdmin) {
    return { error: 'Server configuration error: Missing Service Role Key.' }
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
  if (!supabaseAdmin) return { error: 'Server configuration error.' }
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
  if (!supabaseAdmin) return { error: 'Server configuration error.', users: [] }
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
