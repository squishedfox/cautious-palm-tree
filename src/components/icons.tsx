import ChevronUp from "@assets/chevron-up.svg";
import ChevronDown from "@assets/chevron-down.svg";
import ChevronRight from "@assets/chevron-right.svg";
import ChevronLeft from "@assets/chevron-left.svg";
import Trash from "@assets/trash.svg";
import Save from "@assets/save.svg";
import Export from "@assets/export.svg";
import Pdf from "@assets/export.svg";
import Xmark from "@assets/xmark.svg";

const iconClassSizeMap = {
  "xs": "w-2 h-2",
  "sm": "w-4 h-4",
  "md": "w-8 h-8",
  "lg": "w-16 h-16",
  "xl": "w-32 h-32",
}
export interface IconProps {
  size?: "xs"|"sm"|"md"|"lg"|"xl"
}
export interface ChevronIconProps extends IconProps {
  /**
   * Direction the Chevron should be facing
   */
  direction: "up" | "down" | "left" | "right";
}

/**
 * Single Chevron Icon
 */
export const ChevronIcon = ({ direction, size = "md" }: ChevronIconProps) => {
  // TODO: eventually need to support size differences
  switch (direction) {
    case "down":
      return <img src={ChevronDown} className={iconClassSizeMap[size]} alt="chevron down" />;
    case "up":
      return <img src={ChevronUp} className={iconClassSizeMap[size]} alt="chevron up" />;
    case "left":
      return <img src={ChevronLeft} className={iconClassSizeMap[size]} alt="chevron left" />;
    case "right":
      return <img src={ChevronRight} className={iconClassSizeMap[size]} alt="chevron right" />;
    default:
      return null; // you done goofed
  }
};

export const TrashIcon = ({size = "md"}: IconProps) => (<img src={Trash} className={iconClassSizeMap[size]} />);
export const SaveIcon = ({size = "md"}: IconProps) => (<img src={Save} className={iconClassSizeMap[size]} />);
export const ExportIcon = ({size = "md"}: IconProps) => (<img src={Export} className={iconClassSizeMap[size]} />);
export const PdfIcon = ({size = "md"}: IconProps) => (<img src={Pdf} className={iconClassSizeMap[size]} />);
export const XmarkIcon = ({size = "md"}: IconProps) => (<img src={Xmark} className={iconClassSizeMap[size]} />);
