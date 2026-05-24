"use client";

import Image from "next/image";
import { useState } from "react";
import type { VideoTestimonial } from "@/lib/types";

interface VideoCardProps {
  video: VideoTestimonial;
  index: number;
  onOpen: () => void;
}

const heights = ["h-[350px]", "h-[368px]", "h-[340px]", "h-[360px]"];

export default function VideoCard({ video, index, onOpen }: VideoCardProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(video.thumbnail_url) && !failed;

  return (
    <article className={`group relative overflow-hidden rounded-2xl border border-[var(--border-navy)] bg-[var(--navy-deeper)] ${heights[index % heights.length]}`}>
      <button type="button" onClick={onOpen} className="relative h-full w-full text-left" aria-label={`Play testimonial by ${video.student_name}`}>
        {showImage ? (
          <Image
            src={video.thumbnail_url}
            alt={`${video.student_name} testimonial thumbnail`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:brightness-110"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="h-full w-full bg-[linear-gradient(140deg,var(--navy-deeper),var(--navy),var(--gold-dark))]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(9,29,71,0.85)] via-transparent to-transparent" />

        <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--navy-deeper)] shadow-lg transition duration-300 group-hover:scale-110 group-hover:rotate-[8deg]">
          <span className="absolute inset-0 rounded-full border border-[var(--gold-light)]/60 [animation:ripple_2s_ease-out_infinite]" />
          <span className="relative text-lg">▶</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-[rgba(9,29,71,0.95)] to-transparent p-4 transition duration-300 group-hover:translate-y-0">
          <p className="text-sm font-semibold text-white">{video.student_name}</p>
          <p className="text-xs text-[var(--gold-light)]">{video.course}</p>
        </div>
      </button>
    </article>
  );
}
