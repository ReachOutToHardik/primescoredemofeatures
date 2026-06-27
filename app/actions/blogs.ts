'use server'

import { supabaseAdmin } from '../../src/lib/supabase-admin'
import { revalidatePath } from 'next/cache'
import { verifyRole } from './auth'

export async function getBlogsServer() {
  const auth = await verifyRole(['super_admin', 'manager', 'writer'])
  if (!auth.authorized) return { success: false, error: 'Unauthorized: ' + auth.reason, blogs: [] }

  try {
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .select('*')
      .order('published_at', { ascending: false })

    if (error) throw error
    return { success: true, blogs: data || [] }
  } catch (err: any) {
    return { success: false, error: err.message, blogs: [] }
  }
}

export async function deleteBlogServer(id: string) {
  const auth = await verifyRole(['super_admin', 'manager', 'writer'])
  if (!auth.authorized) return { success: false, error: 'Unauthorized: ' + auth.reason }

  try {
    const { error } = await supabaseAdmin
      .from('blogs')
      .delete()
      .eq('id', id)

    if (error) throw error
    revalidatePath('/admin/blog-editor')
    revalidatePath('/blog')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
