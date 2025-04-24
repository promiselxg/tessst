import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const RemoveButton = ({ onRemove }) => {
  return (
    <Button
      variant="ghost"
      onClick={onRemove}
      className="bg-transparent hover:bg-transparent w-fit shadow-transparent text-orange-500 flex items-center gap-1 text-sm transition-all"
    >
      <Trash2 size={16} />
      Remove
    </Button>
  );
};

export default RemoveButton;
