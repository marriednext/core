"use client";

import Image from "next/image";
import { LisasTheme } from "component-shelf";
import { useWeddingData } from "@/contexts/WeddingDataContext";

export default function Home() {
  const weddingData = useWeddingData();

  return (
    <LisasTheme
      fieldNameA={weddingData.fieldNameA}
      fieldNameB={weddingData.fieldNameB}
      fieldLocationName={weddingData.fieldLocationName}
      fieldLocationAddress={weddingData.fieldLocationAddress}
      fieldEventDate={weddingData.fieldEventDate}
      fieldEventTime={weddingData.fieldEventTime}
      fieldMapsShareUrl={weddingData.fieldMapsShareUrl}
      ourStoryImageComponent={
        <Image
          src="https://q8a0jhjw1u.ufs.sh/f/3POoQHRcbaUOsRkrN3Yzk9tQwr7sxHynVo4JE0OBaUh8jlAZ"
          alt={`${weddingData.fieldNameA} and ${weddingData.fieldNameB}`}
          width={420}
          height={500}
          quality={100}
          className="w-full h-full object-cover brightness-80"
        />
      }
      heroImageComponent={
        <Image
          src="https://4ctc36zdopsyz0ok.public.blob.vercel-storage.com/photos/lisastheme/17%20-Courtyard%20Wedding%20Reception%20with%20Pergola%20at%20Bel%20Vino%20Winery%20%281%29.webp"
          alt={`${weddingData.fieldNameA} and ${weddingData.fieldNameB}`}
          width={420}
          height={500}
          quality={100}
          className="w-full h-full object-cover brightness-80"
        />
      }
    />
  );
}
