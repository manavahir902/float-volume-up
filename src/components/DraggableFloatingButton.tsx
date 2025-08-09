import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Position {
  x: number;
  y: number;
}

interface DraggableFloatingButtonProps {
  children: React.ReactNode;
  position: Position;
  onPositionChange: (position: Position) => void;
  onClick?: () => void;
  onLongPress?: () => void;
  isExpanded?: boolean;
  className?: string;
}

export function DraggableFloatingButton({
  children,
  position,
  onPositionChange,
  onClick,
  onLongPress,
  isExpanded = false,
  className
}: DraggableFloatingButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [hasMoved, setHasMoved] = useState(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    setIsDragging(true);
    setHasMoved(false);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });

    // Start long press timer
    const timer = setTimeout(() => {
      if (!hasMoved) {
        onLongPress?.();
      }
    }, 500);
    setLongPressTimer(timer);

    buttonRef.current?.setPointerCapture(e.pointerId);
  }, [position, onLongPress, hasMoved]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Check if moved significantly
    const moveThreshold = 5;
    if (Math.abs(newX - position.x) > moveThreshold || Math.abs(newY - position.y) > moveThreshold) {
      setHasMoved(true);
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        setLongPressTimer(null);
      }
    }

    // Constrain to viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonSize = isExpanded ? 120 : 80;

    const constrainedX = Math.max(0, Math.min(viewportWidth - buttonSize, newX));
    const constrainedY = Math.max(0, Math.min(viewportHeight - buttonSize, newY));

    onPositionChange({
      x: constrainedX,
      y: constrainedY
    });
  }, [isDragging, dragStart, position, onPositionChange, isExpanded, longPressTimer]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }

    // If didn't move much, treat as click
    if (!hasMoved) {
      onClick?.();
    }

    buttonRef.current?.releasePointerCapture(e.pointerId);
  }, [onClick, hasMoved, longPressTimer]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
      }
    };
  }, [longPressTimer]);

  return (
    <Button
      ref={buttonRef}
      variant="volume"
      size={isExpanded ? "volume" : "floating"}
      className={cn(
        "fixed z-50 drag-handle touch-none select-none",
        isDragging && "scale-110",
        isExpanded && "p-4",
        className
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: isDragging ? 'scale(1.1)' : 'scale(1)',
        transition: isDragging ? 'none' : 'var(--transition-smooth)'
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {children}
    </Button>
  );
}