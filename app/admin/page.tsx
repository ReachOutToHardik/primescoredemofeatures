'use client'

export const dynamic = 'force-dynamic'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAdminContext } from './AdminContext'
import { 
  Contact, 
  BookOpen, 
  BarChart3, 
  Users, 
  ArrowRight,
  TrendingUp,
  UserCheck,
  FileText,
  Database,
  Terminal,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Lock
} from 'lucide-react'

export default function AdminDashboardPage() {
  const [showSqlHelper, setShowSqlHelper] = useState(false)
  const [copied, setCopied] = useState(false)
  const { role } = useAdminContext()

  const sqlScript = `-- 1. USER ROLES TABLE (Access Control)
create table if not exists public.user_roles (
  id uuid references auth.users on delete cascade primary key,
  role text not null check (role in ('super_admin', 'manager', 'sales', 'writer', 'analyst'))
);

-- Enable RLS
alter table public.user_roles enable row level security;

-- Drop recursive policy if it exists
drop policy if exists "Allow super_admins full write" on public.user_roles;
drop policy if exists "Allow public read for roles checking" on public.user_roles;

-- Configure simple select policy (Write operations bypass RLS via server-side service key)
create policy "Allow read for all users" on public.user_roles
  for select using (true);

-- 2. BLOGS TABLE
create table if not exists public.blogs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  category text not null,
  read_time text not null,
  image text not null,
  author_name text not null default 'Primescore Team',
  published_at timestamp with time zone not null default timezone('utc'::text, now()),
  views integer not null default 0
);

-- Enable RLS
alter table public.blogs enable row level security;

-- Policies for blogs
create policy "Allow public read for blogs" on public.blogs
  for select using (true);

create policy "Allow authorized writers to modify blogs" on public.blogs
  for all using (
    exists (
      select 1 from public.user_roles
      where id = auth.uid() and role in ('super_admin', 'manager', 'writer')
    )
  );

-- 3. LEADS TABLE
create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  source_page text,
  name text not null,
  email text not null,
  phone text not null,
  issue_type text,
  preferred_date text,
  preferred_time text,
  message text,
  marketing_opt_in boolean default false,
  status text not null default 'New',
  created_at timestamp with time zone not null default timezone('utc'::text, now())
);

-- Enable RLS
alter table public.leads enable row level security;

-- Policies for leads
create policy "Allow public inserts for leads consultation" on public.leads
  for insert with check (true);

create policy "Allow authorized team to manage leads" on public.leads
  for all using (
    exists (
      select 1 from public.user_roles
      where id = auth.uid() and role in ('super_admin', 'manager', 'sales')
    )
  );
`

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlScript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const cards = [
    {
      title: 'Leads CRM',
      desc: 'Access consultation requests, user details, status metrics, and export data in PDF, Excel or CSV.',
      href: '/admin/leads',
      icon: Contact,
      color: 'bg-blue-50/50 border-blue-100 text-blue-600',
      actionText: 'Open CRM',
      roles: ['super_admin', 'manager', 'sales']
    },
    {
      title: 'Blog Editor',
      desc: 'Write, update, and manage financial and credit health articles for the Knowledge Hub.',
      href: '/admin/blog-editor',
      icon: BookOpen,
      color: 'bg-emerald-50/50 border-emerald-100 text-emerald-600',
      actionText: 'Write Blog',
      roles: ['super_admin', 'manager', 'writer']
    },
    {
      title: 'Live Analytics',
      desc: 'Track live visitors, geographic regions, top content views, and traffic trends in real-time.',
      href: '/admin/analytics',
      icon: BarChart3,
      color: 'bg-purple-50/50 border-purple-100 text-purple-600',
      actionText: 'View Metrics',
      roles: ['super_admin', 'manager', 'analyst']
    },
    {
      title: 'Access Control',
      desc: 'Add team members, edit roles, configure permissions, and manage platform staff access.',
      href: '/admin/team',
      icon: Users,
      color: 'bg-amber-50/50 border-amber-100 text-amber-600',
      actionText: 'Manage Staff',
      roles: ['super_admin']
    }
  ]

  return (
    <div className="py-2 flex flex-col gap-8 text-slate-800">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Conversion Performance', value: 'High', icon: TrendingUp, detail: 'Leads converting successfully' },
          { label: 'Publishing Engine', value: 'Active', icon: FileText, detail: 'Connected to blogs database' },
          { label: 'Security Policy', value: 'Enforced', icon: UserCheck, detail: 'Session encryption enabled' }
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{stat.detail}</p>
              </div>
              <div className="p-3 bg-emerald-50 text-[#10b981] border border-emerald-100 rounded-xl">
                <Icon size={20} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Services Grid */}
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">System Directories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon
            const hasAccess = card.roles.includes(role || '')
            
            return (
              <Link 
                key={idx} 
                href={card.href} 
                className={`group flex flex-col justify-between p-8 rounded-3xl bg-white border border-slate-200 hover:border-slate-350 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 h-full relative overflow-hidden ${!hasAccess ? 'opacity-85' : ''}`}
              >
                {!hasAccess && (
                  <div className="absolute top-4 right-4 p-1.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-500 flex items-center gap-1.5 text-xs font-semibold">
                    <Lock size={12} />
                    Locked
                  </div>
                )}
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border ${card.color}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight flex items-center gap-2">
                    {card.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">{card.desc}</p>
                </div>
                <div className={`inline-flex items-center gap-2 font-bold text-sm transition-all ${!hasAccess ? 'text-rose-500' : 'text-[#10b981] group-hover:gap-3'}`}>
                  {hasAccess ? (
                    <>
                      {card.actionText} <ArrowRight size={16} />
                    </>
                  ) : (
                    <>
                      Restricted Access <Lock size={14} />
                    </>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
