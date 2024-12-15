import { FieldError } from "react-hook-form";
import { Text } from "../text";

interface ErrorMessageProps {
  error: FieldError;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <div role="alert" className="flex items-center mt-1">
      <Text
        value={error.message}
        variant="p3"
        className="text-left ml-1 text-red-200"
      />
    </div>
  );
};
