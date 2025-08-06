"use client";

import { SceneScreen } from "@/components/Internshift/SceneScreen"
import { useSearchParams } from "next/navigation";

export default function GamePlay(){
    const searchParams = useSearchParams();
    const event_id = searchParams.get("event_id");
    return (
    <div className="flex justify-center items-center h-screen bg-gray-950">
        <SceneScreen eventId={event_id ?? ""}/>
    </div>
  );
}
