"use client"
import React, { useEffect } from 'react'
import { AbsoluteFill, Img, Sequence, useCurrentFrame, useVideoConfig, interpolate, Audio } from 'remotion';

function RemotionComposition({videoData}) {  // ✅ REMOVED setDurationInFrame prop
    const caption = videoData?.captionJson;
    const {fps} = useVideoConfig();
    const imageList = videoData?.images;
    const frame = useCurrentFrame();
    
    // Calculate duration once and memoize it
    const getDurationFrame = () => {
        if(!caption || caption.length === 0) return 0;
        const totalDuration = caption[caption?.length - 1]?.end * fps;
        return totalDuration;
    }
    
    const duration = getDurationFrame();
    
    // ✅ REMOVED THIS ENTIRE useEffect BLOCK
    // useEffect(() => {
    //     if(videoData && duration > 0) {
    //         setDurationInFrame(duration);
    //     }
    // }, [videoData, duration])

    const getCurrentCaption = () => {
        // Add null check here
        if (!caption || caption.length === 0) return '';
        
        const currentTime = frame / fps; // Use fps instead of hardcoded 30
        const currentCaption = caption.find((item) => 
            currentTime >= item?.start && currentTime <= item?.end
        );
        return currentCaption ? currentCaption?.word : '';
    }
    
    return (
        <AbsoluteFill>
            {imageList?.map((item, index) => {
                const startTime = (index * duration) / imageList?.length;
                const sequenceDuration = duration / imageList?.length;

                const scale = (idx) => interpolate(
                    frame,
                    [startTime, startTime + sequenceDuration/2, startTime + sequenceDuration],
                    idx % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
                    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
                )

                return (
                    <Sequence 
                        key={index} 
                        from={Math.floor(startTime)} 
                        durationInFrames={Math.floor(sequenceDuration)}
                    >
                        <AbsoluteFill>
                            <Img
                                src={item}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transform: `scale(${scale(index)})`
                                }}
                            />
                        </AbsoluteFill>
                    </Sequence>
                )
            })}
            
            <AbsoluteFill style={{
                color: 'white',
                justifyContent: 'flex-end',
                alignItems: 'center',
                display: 'flex',
                paddingBottom: 50,
                textAlign: 'center',
            }}>
                <h2 style={{
                    fontSize: '40px',
                    fontWeight: 'bold',
                    margin: 0,
                    padding: '15px 30px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: '10px',
                }}>
                    {getCurrentCaption()}
                </h2>
            </AbsoluteFill>
            
            {videoData?.audioUrl && <Audio src={videoData?.audioUrl}/>}
        </AbsoluteFill>
    )
}

export default RemotionComposition
