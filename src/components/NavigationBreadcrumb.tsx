import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

interface NavigationLevel {
  label: string;
  value: string;
  options?: { label: string; value: string }[];
}

interface NavigationBreadcrumbProps {
  levels: NavigationLevel[];
  onLevelChange: (level: string, value: string) => void;
}

export function NavigationBreadcrumb({ levels, onLevelChange }: NavigationBreadcrumbProps) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg border">
      <Breadcrumb>
        <BreadcrumbList>
          {levels.map((level, index) => (
            <div key={level.label} className="flex items-center">
              <BreadcrumbItem>
                {level.options ? (
                  <Select
                    value={level.value}
                    onValueChange={(value) => onLevelChange(level.label.toLowerCase(), value)}
                  >
                    <SelectTrigger className="h-8 border-0 bg-transparent shadow-none p-0 font-medium text-primary hover:text-primary/80">
                      <SelectValue />
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </SelectTrigger>
                    <SelectContent>
                      {level.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <BreadcrumbPage className="font-medium">
                    {level.value || level.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < levels.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}