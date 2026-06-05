import ChevronUp from "@assets/chevron-up.svg";
import ChevronDown from "@assets/chevron-down.svg";
import ChevronRight from "@assets/chevron-right.svg";
import ChevronLeft from "@assets/chevron-left.svg";
import Trash from "@assets/trash.svg";
import Save from "@assets/save.svg";
import Export from "@assets/export.svg";
import Pdf from "@assets/export.svg";
import Xmark from "@assets/xmark.svg";

export interface IconProps {
  size?: "xs"|"s"|"m"|"lg"|"xl"
}
export interface ChevronIconProps extends IconProps {
  /**
   * Direction the Chevron should be facing
   */
  direction: "up" | "down" | "left" | "right";
}

const iconClassSizeMap = {
  "xs": "w-2 h-2",
  "s": "w-4 h-4",
  "m": "w-8 h-8",
  "lg": "w-16 h-16",
  "xl": "w-32 h-32",
}

/**
 * Single Chevron Icon
 */
export const ChevronIcon = ({ direction, size = "m" }: ChevronIconProps) => {
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

export const TrashIcon = ({size = "m"}: IconProps) => (<img src={Trash} className={iconClassSizeMap[size]} />);
export const SaveIcon = ({size = "m"}: IconProps) => (<img src={Save} className={iconClassSizeMap[size]} />);
export const ExportIcon = ({size = "m"}: IconProps) => (<img src={Export} className={iconClassSizeMap[size]} />);
export const PdfIcon = ({size = "m"}: IconProps) => (<img src={Pdf} className={iconClassSizeMap[size]} />);
export const XmarkIcon = ({size = "m"}: IconProps) => (<img src={Xmark} className={iconClassSizeMap[size]} />);
