import type { ComponentProps, MouseEvent, TouchEvent } from "react";
import { useState } from "react";
import { useLockBodyScroll } from "react-use";
import { useImmutableState } from "~/hooks";
import type { TinderCard } from ".";

const ANIMATION_TRANSITION = 600;

export const useTinderCard = ({
  onConfirm,
  onCancel,
  mode = "active"
}: ComponentProps<typeof TinderCard>) => {
  const [drag, setDrag] = useImmutableState({
    state: false,
    startPos: { x: 0, y: 0 }
  });

  const [animation, setAnimation] = useImmutableState({
    transition: 0,
    translatePos: { x: 0, y: 0 },
    rotate: 0,
    opacity: 1,
    event: true
  });

  const [selectedDirection, setSelectedDirection] = useState<"right" | "left" | null>(null);

  useLockBodyScroll(drag.state);

  const handleDown = (x: number, y: number) => {
    setDrag({ state: true, startPos: { x, y } });
    setAnimation({ transition: 0 });
  };

  const handleMove = (x: number, y: number, width: number) => {
    const {
      startPos: { x: startX, y: startY }
    } = drag;

    if (drag.state) {
      const movePosX = x - startX;
      const minMovePosX = width / 3;

      if (Math.abs(movePosX) > minMovePosX) {
        setSelectedDirection(movePosX > 0 ? "right" : "left");
      } else {
        setSelectedDirection(null);
      }

      setAnimation({
        translatePos: { x: x - startX, y: y - startY },
        rotate: (x - startX) / 20
      });
    }
  };

  const handleUp = () => {
    if (selectedDirection && mode === "active") {
      setAnimation({
        transition: ANIMATION_TRANSITION,
        translatePos: { x: animation.translatePos.x * 4, y: animation.translatePos.y * 4 },
        event: false
      });

      setTimeout(() => {
        if (selectedDirection === "left") {
          if (onCancel) onCancel();
        } else if (selectedDirection === "right") {
          if (onConfirm) onConfirm();
        }
      }, 300);
    } else {
      setAnimation({
        transition: ANIMATION_TRANSITION,
        translatePos: { x: 0, y: 0 },
        rotate: 0
      });
    }

    setDrag({ state: false, startPos: { x: 0, y: 0 } });
  };

  const handleMouseDown = ({ clientX, clientY }: MouseEvent<HTMLDivElement>) => {
    handleDown(clientX, clientY);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event.touches[0];

    handleDown(clientX, clientY);
  };

  const handleMouseMove = ({
    clientX,
    clientY,
    currentTarget: { offsetWidth }
  }: MouseEvent<HTMLDivElement>) => {
    handleMove(clientX, clientY, offsetWidth);
  };

  const handleTouchMove = ({
    touches,
    currentTarget: { offsetWidth }
  }: TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = touches[0];

    handleMove(clientX, clientY, offsetWidth);
  };

  const handleConfirm = () => {
    if (onConfirm) {
      setAnimation({ translatePos: { x: 500, y: -100 }, rotate: 30, opacity: 0 });

      setTimeout(onConfirm, ANIMATION_TRANSITION);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      setAnimation({ translatePos: { x: -500, y: -100 }, rotate: -30, opacity: 0 });

      setTimeout(onCancel, ANIMATION_TRANSITION);
    }
  };

  return {
    animation,
    selectedDirection,
    handleMouseDown,
    handleMouseMove,
    handleUp,
    handleTouchMove,
    handleTouchStart,
    handleConfirm,
    handleCancel
  };
};
