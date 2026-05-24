"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryItem as GalleryItemType } from "@/lib/types";

interface GalleryItemProps {
  item: GalleryItemType;
  index: number;
  onClick?: () => void;
}

const heights = ["h-[220px]", "h-[300px]", "h-[260px]", "h-[340px]"];

export default function GalleryItem({ item, index, onClick }: GalleryItemProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(item.image_url) && !failed;

  return (
    <figure className={`group relative mb-3 break-inside-avoid overflow-hidden rounded-2xl ${heights[index % heights.length]}`}>
      <button type="button" onClick={onClick} className="relative block h-full w-full text-left" aria-label={`Open image: ${item.caption}`}>
        {showImage ? (
          <Image
            src={item.image_url}
            alt={item.caption}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-[900ms] group-hover:scale-[1.06] group-hover:translate-x-[1%] group-hover:translate-y-[1%]"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="h-full w-full bg-[linear-gradient(140deg,var(--navy-deeper),var(--navy),var(--gold-dark))]" />
        )}

        <div className="absolute inset-0 translate-y-full bg-gradient-to-t from-[rgba(9,29,71,0.88)] via-[rgba(9,29,71,0.4)] to-transparent p-4 transition duration-300 group-hover:translate-y-0">
          <figcaption className="mt-auto text-sm font-semibold text-white">{item.caption}</figcaption>
        </div>

        <span className="absolute bottom-3 right-3 rounded-full bg-white/85 px-2 py-1 text-[10px] font-semibold text-[var(--navy-dark)]">
          #{index + 1}
        </span>
      </button>
    </figure>
  );
}
