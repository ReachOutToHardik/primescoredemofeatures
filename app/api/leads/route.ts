import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
    }

    // Use OpenRouter to extract the structured data from the chat history
    const extractionPrompt = `
      You are an AI data extractor. Read the following chat history between an assistant and a user.
      Extract the user's Name, WhatsApp Number, and their Credit Issue.
      Return ONLY a raw JSON object with no markdown formatting, no explanation, in this exact structure:
      {
        "name": "extracted name",
        "whatsapp_number": "extracted number",
        "issue": "extracted issue"
      }
      If any field is missing, return null for that field.
    `;

    const openRouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-8b', // Fast and cheap model for extraction
        messages: [
          { role: 'system', content: extractionPrompt },
          { role: 'user', content: JSON.stringify(messages) }
        ],
        temperature: 0,
      }),
    });

    if (!openRouterRes.ok) {
      throw new Error('Failed to extract data via OpenRouter');
    }

    const aiData = await openRouterRes.json();
    let extractedContent = aiData.choices[0].message.content.trim();
    
    // Strip markdown JSON block if present
    if (extractedContent.startsWith('\`\`\`json')) {
        extractedContent = extractedContent.replace(/^\`\`\`json/, '').replace(/\`\`\`$/, '').trim();
    } else if (extractedContent.startsWith('\`\`\`')) {
        extractedContent = extractedContent.replace(/^\`\`\`/, '').replace(/\`\`\`$/, '').trim();
    }

    const leadData = JSON.parse(extractedContent);

    // Initialize Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    
    if (!supabaseUrl || !supabaseKey) {
        console.warn('Supabase URL or Key is missing. Lead extracted but not saved to DB:', leadData);
        return NextResponse.json({ success: true, lead: leadData, warning: 'Supabase not configured' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert into Supabase
    const { data, error } = await supabase
      .from('chatbot_leads')
      .insert([
        {
          name: leadData.name,
          whatsapp_number: leadData.whatsapp_number,
          issue: leadData.issue,
          status: 'pending_review'
        }
      ]);

    if (error) {
      console.error('Supabase Insert Error:', error);
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true, lead: leadData });

  } catch (error: any) {
    console.error('Lead extraction/saving error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
