import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { createClient } from '@supabase/supabase-js'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
)

export async function POST(req: NextRequest) {

  const formData = await req.formData()
  const file = formData.get('file') as File
  const slug = formData.get('slug') as string

  if (!file || !slug) {
    return NextResponse.json({ error: 'Missing file or slug' }, { status: 400 })
  }

  // Convert file to buffer
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Upload to Cloudinary
  const uploadResult = await new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: `romandy-cto/events/${slug}`, resource_type: 'image' },
          (error, result) => {
            if (error || !result) reject(error)
            else resolve(result as { secure_url: string; public_id: string })
          }
        )
        .end(buffer)
    }
  )

  // Save to Supabase
  const { data, error } = await supabase
    .from('event_photos')
    .insert({
      event_slug: slug,
      cloudinary_url: uploadResult.secure_url,
      cloudinary_public_id: uploadResult.public_id,
    })
    .select('id, cloudinary_url, caption')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
