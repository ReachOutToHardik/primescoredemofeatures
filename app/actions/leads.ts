'use server'

import { supabaseAdmin } from '../../src/lib/supabase-admin'
import { revalidatePath } from 'next/cache'
import { verifyRole } from './auth'

export async function getLeadsServer() {
  const auth = await verifyRole(['super_admin', 'manager', 'sales'])
  if (!auth.authorized) return { success: false, error: 'Unauthorized: ' + auth.reason, leads: [] }

  try {
    const { data, error } = await supabaseAdmin
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, leads: data || [] }
  } catch (err: any) {
    return { success: false, error: err.message, leads: [] }
  }
}

export async function updateLeadStatusServer(id: string, status: string) {
  const auth = await verifyRole(['super_admin', 'manager', 'sales'])
  if (!auth.authorized) return { success: false, error: 'Unauthorized: ' + auth.reason }

  try {
    const { error } = await supabaseAdmin
      .from('leads')
      .update({ status })
      .eq('id', id)

    if (error) throw error
    revalidatePath('/admin/leads')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function deleteLeadServer(id: string) {
  const auth = await verifyRole(['super_admin', 'manager', 'sales'])
  if (!auth.authorized) return { success: false, error: 'Unauthorized: ' + auth.reason }

  try {
    const { error } = await supabaseAdmin
      .from('leads')
      .delete()
      .eq('id', id)

    if (error) throw error
    revalidatePath('/admin/leads')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
