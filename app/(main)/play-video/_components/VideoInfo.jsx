import { Button } from '@/components/ui/button'
import { ArrowLeft, DownloadIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function VideoInfo({videoData}) {
  return (
    <div className='p-5 border rounded-xl'>
      <Link href={'/dashboard'} className='inline-flex gap-2 items-center text-lg font-semibold hover:underline mb-4'>
        <ArrowLeft size={20} />
        <span>Back to Dashboard</span>
      </Link>
      
      <div className='flex flex-col gap-3'>
        <h2 className='mt-5 font-semibold'>Project Name: {videoData?.title}</h2>
        <p className='text-gray-500'>Script: {videoData?.script}</p>
        <h2 className='font-semibold'>Video Style: {videoData?.videoStyle}</h2>

        <Button className='flex gap-2 items-center w-fit'>
          <DownloadIcon size={18} />
          Export & Download
        </Button>
      </div>
    </div>
  )
}

export default VideoInfo
