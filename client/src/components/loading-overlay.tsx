import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export function LoadingOverlay({ isVisible, message = "Loading..." }: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-8 text-center shadow-2xl">
        <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
        <p className="text-lg text-foreground">{message}</p>
      </div>
    </div>
  );
}
