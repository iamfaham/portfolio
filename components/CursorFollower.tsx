'use client';

import { useEffect, useRef } from 'react';

const CursorFollower = () => {
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveFollower = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event;
      if (followerRef.current) {
        followerRef.current.style.left = `${x}px`;
        followerRef.current.style.top = `${y}px`;
      }
    };

    document.addEventListener('mousemove', moveFollower);

    return () => {
      document.removeEventListener('mousemove', moveFollower);
    };
  }, []);

  return <div ref={followerRef} className="cursor-follower"></div>;
};

export default CursorFollower;
