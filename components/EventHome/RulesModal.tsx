import React from "react";
import RulesSection from "./RulesSection";

export default function RulesModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Game Rules</h3>
          <button className="" onClick={onClose}>Close</button>
        </div>
        <RulesSection />
      </div>
    </div>
  );
}
