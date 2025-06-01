import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data: videos, error } = await supabase
    .from('videos') // Assuming a 'videos' table in Supabase
    .select('*');

  if (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Construct public URLs for the videos
  const videosWithUrls = videos.map(video => {
    const publicUrl = supabase.storage
      .from('videos') // Assuming a 'videos' storage bucket in Supabase
      .getPublicUrl(video.filePath).data.publicUrl;
    return {
      ...video,
      publicUrl,
    };
  });

  return NextResponse.json(videosWithUrls);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Upload file to Supabase storage
    const filePath = `public/${Date.now()}-${file.name}`; // Define a unique file path
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('videos') // Assuming a 'videos' storage bucket
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Insert video metadata into Supabase database
    const { data: insertData, error: insertError } = await supabase
      .from('videos') // Assuming a 'videos' table
      .insert([
        { title, description, filePath: uploadData.path },
      ]);

    if (insertError) {
      console.error('Error inserting video metadata:', insertError);
      // Optionally, delete the uploaded file if metadata insertion fails
      await supabase.storage.from('videos').remove([uploadData.path]);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Video uploaded successfully', data: insertData }, { status: 201 });

  } catch (error: any) {
    console.error('Error handling video upload:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}