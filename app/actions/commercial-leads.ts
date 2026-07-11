'use server'

import { supabaseAdmin } from '../../src/lib/supabase-admin'
import { revalidatePath } from 'next/cache'
import { verifyRole } from './auth'

export async function getCommercialLeadsServer() {
  const auth = await verifyRole(['super_admin', 'manager', 'sales'])
  if (!auth.authorized) return { success: false, error: 'Unauthorized: ' + auth.reason, leads: [] }

  try {
    const { data, error } = await supabaseAdmin
      .from('commercial_leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, leads: data || [] }
  } catch (err: any) {
    return { success: false, error: err.message, leads: [] }
  }
}

export async function updateCommercialLeadStatusServer(id: string, status: string) {
  const auth = await verifyRole(['super_admin', 'manager', 'sales'])
  if (!auth.authorized) return { success: false, error: 'Unauthorized: ' + auth.reason }

  try {
    const { error } = await supabaseAdmin
      .from('commercial_leads')
      .update({ status })
      .eq('id', id)

    if (error) throw error
    revalidatePath('/admin/commercial-leads')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function deleteCommercialLeadServer(id: string) {
  const auth = await verifyRole(['super_admin', 'manager', 'sales'])
  if (!auth.authorized) return { success: false, error: 'Unauthorized: ' + auth.reason }

  try {
    const { error } = await supabaseAdmin
      .from('commercial_leads')
      .delete()
      .eq('id', id)

    if (error) throw error
    revalidatePath('/admin/commercial-leads')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function insertCommercialLeadServer(lead: {
  company_name: string
  contact_name: string
  email: string
  phone: string
  service_type: string
  message: string
}) {
  try {
    const { error } = await supabaseAdmin
      .from('commercial_leads')
      .insert([{
        source_page: 'business_page',
        company_name: lead.company_name,
        contact_name: lead.contact_name,
        email: lead.email,
        phone: lead.phone,
        service_type: lead.service_type,
        message: lead.message,
        status: 'New'
      }])

    if (error) throw error
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
