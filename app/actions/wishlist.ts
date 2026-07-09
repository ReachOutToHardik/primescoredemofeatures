'use server'

import { supabaseAdmin } from '../../src/lib/supabase-admin'
import { revalidatePath } from 'next/cache'
import { verifyRole } from './auth'

export async function getWishlistServer() {
  const auth = await verifyRole(['super_admin', 'manager', 'sales'])
  if (!auth.authorized) return { success: false, error: 'Unauthorized: ' + auth.reason, wishlist: [] }

  try {
    const { data, error } = await supabaseAdmin
      .from('dashboard_wishlist')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, wishlist: data || [] }
  } catch (err: any) {
    return { success: false, error: err.message, wishlist: [] }
  }
}

export async function updateWishlistStatusServer(id: string, status: string) {
  const auth = await verifyRole(['super_admin', 'manager', 'sales'])
  if (!auth.authorized) return { success: false, error: 'Unauthorized: ' + auth.reason }

  try {
    const { error } = await supabaseAdmin
      .from('dashboard_wishlist')
      .update({ status })
      .eq('id', id)

    if (error) throw error
    revalidatePath('/admin/dashboard-wishlist')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function deleteWishlistServer(id: string) {
  const auth = await verifyRole(['super_admin', 'manager', 'sales'])
  if (!auth.authorized) return { success: false, error: 'Unauthorized: ' + auth.reason }

  try {
    const { error } = await supabaseAdmin
      .from('dashboard_wishlist')
      .delete()
      .eq('id', id)

    if (error) throw error
    revalidatePath('/admin/dashboard-wishlist')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
