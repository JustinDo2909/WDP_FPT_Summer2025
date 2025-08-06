import GameHomeLayout from "@/components/EventHome/GameHomeLayout";

export default function InternshiftGamePage() {
  return (
    <GameHomeLayout title="Intershift">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-2xl font-semibold text-white drop-shadow mb-4">Welcome to the InternShift Game!</p>
        <p className="text-lg text-white/80 max-w-xl text-center mb-8">
            Press <span className="font-bold">Play</span> to start the game. Compete for the top spot on the leaderboard and win amazing vouchers!
        </p>
        {/* You can add more game instructions, status, or a preview here if needed */}
        </div>
    </GameHomeLayout>
  );
}
