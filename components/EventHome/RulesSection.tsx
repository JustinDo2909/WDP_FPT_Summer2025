import React from "react";

export default function RulesSection({extraRule}:{extraRule?: string}) {
  return (
    <ul className="list-disc pl-5 space-y-2 text-gray-700">
      <li>{extraRule}</li>
      <li>Play the game to earn points and climb the leaderboard.</li>
      <li>Top ranks win the best vouchers at the end of the event.</li>
      <li>Check your inventory for earned vouchers.</li>
      <li>Each player can win one voucher per day when reached milestone.</li>
      <li>Have fun and good luck!</li>
    </ul>
  );
}
