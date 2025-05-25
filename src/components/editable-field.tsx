import { CircleCheck, CircleX, SquarePen } from "lucide-react";
import { useCallback, useState } from "react";
import { Input } from "./ui/input";

type Props = {
  value: string;
  onSubmit: (name: string) => Promise<void>;
};

export const EditableField = ({ value, onSubmit }: Props) => {
  const [inputValue, setInputValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const reset = () => {
    setInputValue(value);
    setIsEditing(false);
    setIsLoading(false);
  };

  const submit = useCallback(async () => {
    setIsLoading(true);
    try {
      await onSubmit(inputValue);
      setIsEditing(false);
    } catch (error) {
      console.error("Save input changes error:", error);
      alert("Erro ao salvar alterações. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, onSubmit]);

  return (
    <div className="flex items-center gap-1">
      {isEditing ? (
        <>
          <Input
            type="text"
            value={inputValue}
            disabled={isLoading}
            className="max-h-fit p-2 -my-2"
            onChange={(e) => setInputValue(e.target.value)}
          />

          <CircleCheck
            size={24}
            onClick={submit}
            className="cursor-pointer text-green-500"
          />

          <CircleX
            size={24}
            onClick={reset}
            className="cursor-pointer text-red-500"
          />
        </>
      ) : (
        <>
          <span>{value}</span>
          <SquarePen
            size={15}
            onClick={() => setIsEditing(true)}
            className="cursor-pointer opacity-50 ml-1"
          />
        </>
      )}
    </div>
  );
};
