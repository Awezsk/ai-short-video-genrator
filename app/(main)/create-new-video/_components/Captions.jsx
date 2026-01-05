import React, { useState } from 'react'

const options = [
    {
        name: 'Youtuber',
        styles:'text-yellow-400 text-3xl font-extrabold uppercase tracking-wide drop-shadow-md px-3 py-1 rounded-lg'
    },
    {
        name: 'Supreme',
        styles: 'text-red-600 text-4xl font-black uppercase tracking-wider border-4 border-white bg-red-600 text-white px-4 py-2 italic transform -skew-x-6'
    },
    {
        name: 'Neon',
        styles: 'text-pink-500 text-3xl font-bold uppercase tracking-widest px-4 py-2 rounded-lg shadow-[0_0_10px_#ec4899,0_0_20px_#ec4899,0_0_30px_#ec4899] animate-pulse'
    },
    {
        name: 'Glitch',
        styles: 'text-cyan-400 text-3xl font-extrabold uppercase tracking-wide px-3 py-1 [text-shadow:2px_2px_#ff00ff,-2px_-2px_#00ffff] animate-[glitch_1s_infinite]'
    },
    {
        name: 'Fire',
        styles: 'text-orange-500 text-3xl font-black uppercase tracking-wide px-3 py-1 [text-shadow:0_0_10px_#ff4500,0_0_20px_#ff6347,0_0_30px_#ff0000] animate-pulse'
    },
    {
        name: 'futuristic',
        styles: 'text-cyan-300 text-3xl font-light uppercase tracking-[0.3em] px-4 py-2 border border-cyan-400 rounded bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.5)]'
    }
]

function Captions({onHandleInputChange}) {
  const [selectedCaptionStyle,setSelectedCaptionStyle]=useState();
  return (
    <div className='mt-5'>
      <h2>Caption Style</h2>
      <p className='text-sm text-gray-400'>Select Caption Style</p>

      <div className='flex flex-wrap gap-4'>
        {options.map((option, index)=>(
            <div key={index} 
            onClick={()=>{
                setSelectedCaptionStyle(option.name)
                onHandleInputChange('caption',option)
            }}
            className={`p-2 hover:border bg-slate-900
             border-gray-300 cursor-pointer rounded-lg
             ${selectedCaptionStyle==option.name&&'border'}`}>
                <h2 className={option.styles}>{option.name}</h2>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Captions
