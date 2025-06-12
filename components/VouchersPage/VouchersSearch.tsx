import { Wrap } from "@/lib/by/Div";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export const VouchersSearch = () => {
  return (
    <Wrap className="flex items-center bg-gray-200 rounded-none mb-4">
      <Search className="ml-3 text-gray-500" />
      <Input
        className="bg-transparent py-2 flex-1 border-none ring-0  focus-visible:ring-0 focus:ring-0 focus:ring-offset-0 focus:outline-none shadow-none"
        placeholder="Search vouchers by code or value..."
      />
    </Wrap>
  );
};
