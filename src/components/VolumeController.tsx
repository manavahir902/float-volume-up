import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { VolumeControls } from './VolumeControls';
import { DraggableFloatingButton } from './DraggableFloatingButton';
import { Plus, Volume2, Settings } from 'lucide-react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

interface VolumeControllerProps {
  className?: string;
}

export function VolumeController({ className }: VolumeControllerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(50);
  const [position, setPosition] = useState({ x: 300, y: 400 });

  const handleVolumeUp = useCallback(async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
      const newVolume = Math.min(100, volume + 10);
      setVolume(newVolume);
      
      // In a real app, this would call native Android volume control
      console.log('Volume up:', newVolume);
    } catch (error) {
      console.error('Error with haptic feedback:', error);
    }
  }, [volume]);

  const handleVolumeDown = useCallback(async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
      const newVolume = Math.max(0, volume - 10);
      setVolume(newVolume);
      
      // In a real app, this would call native Android volume control
      console.log('Volume down:', newVolume);
    } catch (error) {
      console.error('Error with haptic feedback:', error);
    }
  }, [volume]);

  const toggleExpanded = useCallback(async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
      setIsExpanded(!isExpanded);
    } catch (error) {
      console.error('Error with haptic feedback:', error);
    }
  }, [isExpanded]);

  return (
    <div className={className}>
      <DraggableFloatingButton
        position={position}
        onPositionChange={setPosition}
        onClick={isExpanded ? toggleExpanded : handleVolumeUp}
        onLongPress={toggleExpanded}
        isExpanded={isExpanded}
      >
        {isExpanded ? (
          <div className="flex flex-col items-center space-y-2">
            <Button
              variant="volume"
              size="floating"
              onClick={handleVolumeUp}
              className="text-white"
            >
              <Plus className="h-6 w-6" />
            </Button>
            <div className="text-white text-xs font-medium">
              {volume}%
            </div>
            <Button
              variant="volume"
              size="floating"
              onClick={handleVolumeDown}
              className="text-white rotate-45"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        ) : (
          <Plus className="h-8 w-8 text-white" />
        )}
      </DraggableFloatingButton>

      {isExpanded && (
        <VolumeControls
          volume={volume}
          onVolumeChange={setVolume}
          onClose={() => setIsExpanded(false)}
          position={position}
        />
      )}
    </div>
  );
}