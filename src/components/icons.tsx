import ChevronUp from "@assets/chevron-up.svg";
import ChevronDown from "@assets/chevron-down.svg";
import ChevronRight from "@assets/chevron-right.svg";
import ChevronLeft from "@assets/chevron-left.svg";

export interface ChevronIconProps {
  /**
   * Direction the Chevron should be facing
   */
  direction: "up" | "down" | "left" | "right";
}

/**
 * Single Chevron Icon
 */
export const ChevronIcon = ({ direction }: ChevronIconProps) => {
  // TODO: eventually need to support size differences
  switch (direction) {
    case "down":
      return <ChevronDown />;
    case "up":
      return <ChevronUp />;
    case "left":
      return <ChevronLeft />;
    case "right":
      return <ChevronRight />;
    default:
      return null; // you done goofed
  }
};
