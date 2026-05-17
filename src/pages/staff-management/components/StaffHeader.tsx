import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";

type StaffHeaderProps = {
  onSearch: (query: string) => void;
  onAddStaff: () => void;
};

export const StaffHeader: React.FC<StaffHeaderProps> = ({
  onSearch,
  onAddStaff,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div className="flex-1 relative max-w-sm">
        <AiOutlineSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search staff..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Button
        title="Add Staff"
        variant="dark"
        size="md"
        onClick={onAddStaff}
        iconLeft={<AiOutlinePlus size={18} />}
      />
    </div>
  );
};
