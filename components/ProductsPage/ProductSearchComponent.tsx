
import { Group, RText, Section } from "@/lib/by/Div";
import { Search } from "lucide-react";

export function ProductsSearchComponent() {
  return (
    <Section>
      <RText className="!text-3xl font-semibold text-gray-900">
        What are you looking for today?
      </RText>

      <Group className="w-full max-w-md mt-4 relative">
        <input 
            placeholder="Search cleansers, supplements, treatments..." 
            className="w-full px-6 py-2 text-lg rounded-full border-2 border-pink-300 
                     focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-100
                     bg-white shadow-md placeholder-pink-400 pr-20
                     transition-all duration-200 hover:shadow-lg" 
          />
          <button 
            className="absolute right-3 p-1 bg-pink-500 hover:bg-pink-600 
                     border-2 border-pink-500 hover:border-pink-600 rounded-full
                     transition-all duration-200 transform hover:scale-105
                     shadow-md hover:shadow-lg"
          >
            <Search className="w-5 h-5 text-white" />
          </button>
      </Group>
    </Section>
  );
}
