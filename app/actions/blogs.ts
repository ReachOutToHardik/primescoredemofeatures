'use server'

import { supabaseAdmin } from '../../src/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

export async function getBlogsServer() {
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
