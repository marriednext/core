"use client";

import Image from "next/image";
import { LisasTheme } from "component-shelf";
import RsvpFormContainer from "@/components/RsvpFormContainer";
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
      heroImageComponent={
        <Image
          src="https://q8a0jhjw1u.ufs.sh/f/3POoQHRcbaUOsRkrN3Yzk9tQwr7sxHynVo4JE0OBaUh8jlAZ"
          alt={`${weddingData.fieldNameA} and ${weddingData.fieldNameB}`}
          width={420}
          height={500}
          quality={100}
          className="w-full h-full object-cover"
        />
      }
      rsvpFormComponent={<RsvpFormContainer variant="tenant" />}
    />
  );
}
