import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const formData = await req.json();
        
        // Log to debug
        console.log('Received formData:', formData);
        
        // Validate required fields
        if (!formData.videoStyle || !formData.caption) {
            return NextResponse.json(
                { error: 'Missing required fields: videoStyle and caption' },
                { status: 400 }
            );
        }
        
        // Validate recordId exists
        if (!formData.recordId) {
            return NextResponse.json(
                { error: 'Missing recordId' },
                { status: 400 }
            );
        }
        
        const result = await inngest.send({
            name: 'generate-video-data',
            data: {
                ...formData,
                recordId: formData.recordId  // Fixed: use formData.recordId instead of undefined recordId
            }
        });
        
        console.log('Inngest result:', result);
        
        return NextResponse.json({ result: result });
        
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
