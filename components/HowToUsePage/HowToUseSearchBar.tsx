import { Row } from "@/lib/by/Div";
import { Search, Filter } from "lucide-react";

export default function HowToUseSearchBar() {
  return (
    <Row className="flex w-full bg-white border-2 border-gray-200 hover:border-pink-300 transition-colors rounded-xl px-3 sm:px-4 py-2 sm:py-3 items-center gap-2 sm:gap-3 shadow-sm">
      <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
      <input
        type="text"
        placeholder="Search guides..."
        className="flex-1 outline-none bg-transparent text-sm sm:text-base text-gray-700 placeholder-gray-500 min-w-0"
      />
      <Row className="flex p-1 text-gray-400 hover:text-pink-600 transition-colors rounded cursor-pointer flex-shrink-0">
        <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
      </Row>
    </Row>
  );
}