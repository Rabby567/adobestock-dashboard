import Button from "../ui/Button";
import Input from "../ui/Input";

interface DashboardToolbarProps {
  title: string;
  subtitle: string;
  search: string;
  searchPlaceholder?: string;
  buttonText: string;
  onSearch: (value: string) => void;
  onButtonClick: () => void;
}

export default function DashboardToolbar({
  title,
  subtitle,
  search,
  searchPlaceholder = "Search...",
  buttonText,
  onSearch,
  onButtonClick,
}: DashboardToolbarProps) {
  return (
    <div className="flex items-end justify-between mb-8 mt-8">

      <div>
        <h2 className="text-3xl font-bold">
          {title}
        </h2>

        <p className="mt-1 text-slate-500">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="w-72">
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <Button onClick={onButtonClick}>
          {buttonText}
        </Button>

      </div>

    </div>
  );
}