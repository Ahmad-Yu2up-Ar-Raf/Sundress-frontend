"use client"
import React, { useEffect, useRef, useState } from 'react'

import Image from 'next/image';

import { DataFile } from '@/types';
import { cn } from '@/lib/utils';



const MediaItem = ({ item, className, onClick, style }: { 
    item: DataFile, 
    className?: string, 
    onClick?: () => void,
    style?: React.CSSProperties 
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);
   
    // Intersection Observer untuk video
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsInView(entry.isIntersecting);
            });
        }, options);

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    // Handle video play/pause
    useEffect(() => {
        let mounted = true;

        const handleVideoPlay = async () => {
            if (!videoRef.current || !isInView || !mounted) return;

            try {
                if (videoRef.current.readyState >= 3) {
                    setIsBuffering(false);
                    await videoRef.current.play();
                } else {
                    setIsBuffering(true);
                    await new Promise((resolve) => {
                        if (videoRef.current) {
                            videoRef.current.oncanplay = resolve;
                        }
                    });
                    if (mounted) {
                        setIsBuffering(false);
                        await videoRef.current.play();
                    }
                }
            } catch (error) {
                console.warn("Video playback failed:", error);
            }
        };

        if (isInView) {
            handleVideoPlay();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }

        return () => {
            mounted = false;
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
        };
    }, [isInView]);

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        
 
        setImageLoaded(true);
    };

    if (item.mediaType === 'video') {
        return (
            <div className={`${className}   w-full    relative overflow-hidden`} style={style}>
                <video
                    ref={videoRef}
                    className={cn(
                      "h-full   relative   object-cover  object-top inset-0  w-full ",
                      // Disable hover effects on iOS
                    
                    )}
                    onClick={onClick}
                    playsInline
                    muted
                    loop
                    preload="auto"
                    style={{
                        opacity: isBuffering ? 0.8 : 1,
                        transition: 'opacity 0.2s',
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                    }}
                >
                    <source src={item.webViewLink} type="video/mp4"  />
                </video>
                {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={`${className}  relative overflow-hidden`} style={style}>
            <Image
                src={item.webViewLink}
                alt={item.webViewLink}
                fill
                quality={100}
                className="h-full   relative   object-cover  object-top inset-0  w-full"
                onClick={onClick}
                loading="lazy"
                onLoad={handleImageLoad}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                    <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                </div>
            )}
        </div>
    );
};



export default MediaItem