"use client";

import {
  CSSProperties,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

import { cn } from "@/lib/utils";

interface NeonColorsProps {
  firstColor: string;
  secondColor: string;
}

interface NeonGradientCardProps {
  /**
   * @default <div />
   * @type ReactElement
   * @description
   * The component to be rendered as the card
   * */
  as?: ReactElement;
  /**
   * @default ""
   * @type string
   * @description
   * The className of the card
   */
  className?: string;

  /**
   * @default ""
   * @type ReactNode
   * @description
   * The children of the card
   * */
  children?: ReactNode;

  /**
   * @default 5
   * @type number
   * @description
   * The size of the border in pixels
   * */
  borderSize?: number;

  /**
   * @default 20
   * @type number
   * @description
   * The size of the radius in pixels
   * */
  borderRadius?: number;

  /**
   * @default "{ firstColor: '#ff00aa', secondColor: '#00FFF1' }"
   * @type string
   * @description
   * The colors of the neon gradient
   * */
  neonColors?: NeonColorsProps;

  [key: string]: any;
}

const NeonGradientCard: React.FC<NeonGradientCardProps> = ({
  className,
  children,
  borderSize = 2,
  borderRadius = 20,
  neonColors = {
    firstColor: "#ff00aa",
    secondColor: "#00FFF1",
  },
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 200, height: 200 }); // Default fallback dimensions
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      // Only update if dimensions are actually different and not zero
      if (offsetWidth > 0 && offsetHeight > 0) {
        setDimensions((prev) => {
          // Only update if dimensions actually changed to prevent unnecessary re-renders
          if (prev.width !== offsetWidth || prev.height !== offsetHeight) {
            return { width: offsetWidth, height: offsetHeight };
          }
          return prev;
        });
      }
    }
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    // Use multiple strategies to ensure dimensions are calculated
    const strategies = [
      () => updateDimensions(), // Immediate
      () => setTimeout(updateDimensions, 0), // Next tick
      () => requestAnimationFrame(updateDimensions), // Next frame
      () => setTimeout(updateDimensions, 100), // After a short delay
    ];

    strategies.forEach((strategy) => strategy());

    // Use ResizeObserver for better dimension tracking
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updateDimensions();
      });
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updateDimensions);

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener("resize", updateDimensions);
    };
  }, [isClient, updateDimensions]);

  // Don't render the animated parts on server side to prevent hydration issues
  if (!isClient) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "relative z-10 h-full w-full rounded-[var(--border-radius)]",
          className
        )}
        style={
          {
            "--border-size": `${borderSize}px`,
            "--border-radius": `${borderRadius}px`,
            "--neon-first-color": neonColors.firstColor,
            "--neon-second-color": neonColors.secondColor,
          } as CSSProperties
        }
        {...props}
      >
        <div
          className={cn(
            "relative h-full min-h-[inherit] w-full rounded-[var(--card-content-radius)] bg-gray-100 p-6",
            "dark:bg-neutral-900"
          )}
          style={
            {
              "--card-content-radius": `${borderRadius - borderSize}px`,
            } as CSSProperties
          }
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={
        {
          "--border-size": `${borderSize}px`,
          "--border-radius": `${borderRadius}px`,
          "--neon-first-color": neonColors.firstColor,
          "--neon-second-color": neonColors.secondColor,
          "--card-width": `${dimensions.width}px`,
          "--card-height": `${dimensions.height}px`,
          "--card-content-radius": `${borderRadius - borderSize}px`,
          "--pseudo-element-background-image": `linear-gradient(0deg, ${neonColors.firstColor}, ${neonColors.secondColor})`,
          "--pseudo-element-width": `${Math.max(
            dimensions.width + borderSize * 2,
            200
          )}px`,
          "--pseudo-element-height": `${Math.max(
            dimensions.height + borderSize * 2,
            200
          )}px`,
          "--after-blur": `${Math.max(dimensions.width / 3, 20)}px`, // Ensure minimum blur value
        } as CSSProperties
      }
      className={cn(
        "relative z-10 h-full w-full rounded-[var(--border-radius)]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "relative h-full min-h-[inherit] w-full rounded-[var(--card-content-radius)] bg-gray-100 p-6",
          "before:absolute before:-left-[var(--border-size)] before:-top-[var(--border-size)] before:-z-10 before:block",
          "before:h-[var(--pseudo-element-height)] before:w-[var(--pseudo-element-width)] before:rounded-[var(--border-radius)] before:content-['']",
          "before:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] before:bg-[length:100%_200%]",
          "before:animate-backgroundPositionSpin",
          "after:absolute after:-left-[var(--border-size)] after:-top-[var(--border-size)] after:-z-10 after:block",
          "after:h-[var(--pseudo-element-height)] after:w-[var(--pseudo-element-width)] after:rounded-[var(--border-radius)] after:blur-[var(--after-blur)] after:content-['']",
          "after:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] after:bg-[length:100%_200%] after:opacity-80",
          "after:animate-backgroundPositionSpin",
          "dark:bg-neutral-900"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export { NeonGradientCard };
