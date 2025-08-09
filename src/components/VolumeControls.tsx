import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Volume2, VolumeX, Settings, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Position {
  x: number;
  y: number;
}

interface VolumeControlsProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
  onClose: () => void;
  position: Position;
  className?: string;
}

export function VolumeControls({
  volume,
  onVolumeChange,
  onClose,
  position,
  className
}: VolumeControlsProps) {
  const handleVolumeChange = (values: number[]) => {
    onVolumeChange(values[0]);
  };

  const getControlsPosition = () => {
    const viewportWidth = window.innerWidth;
    const controlsWidth = 300;
    const margin = 20;

    let left = position.x + 100; // Offset from button
    if (left + controlsWidth > viewportWidth - margin) {
      left = position.x - controlsWidth - 20; // Show on left side
    }

    return {
      left: Math.max(margin, left),
      top: position.y
    };
  };

  const controlsPos = getControlsPosition();

  return (
    <div
      className={cn(
        "fixed z-40 glass-morphism rounded-2xl p-6 min-w-[280px]",
        "animate-in slide-in-from-left-2 duration-300",
        className
      )}
      style={{
        left: `${controlsPos.left}px`,
        top: `${controlsPos.top}px`
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {volume > 0 ? (
            <Volume2 className="h-5 w-5 text-primary" />
          ) : (
            <VolumeX className="h-5 w-5 text-muted-foreground" />
          )}
          <span className="font-medium text-foreground">Volume</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="px-2">
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>0%</span>
          <span className="font-medium text-foreground">{volume}%</span>
          <span>100%</span>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onVolumeChange(0)}
            className="flex-1"
          >
            <VolumeX className="h-4 w-4 mr-1" />
            Mute
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onVolumeChange(100)}
            className="flex-1"
          >
            <Volume2 className="h-4 w-4 mr-1" />
            Max
          </Button>
        </div>
      </div>
    </div>
  );
}