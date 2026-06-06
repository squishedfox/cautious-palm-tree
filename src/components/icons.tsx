import ChevronUp from "@assets/chevron-up.svg";
import ChevronDown from "@assets/chevron-down.svg";
import ChevronRight from "@assets/chevron-right.svg";
import ChevronLeft from "@assets/chevron-left.svg";
import Trash from "@assets/trash.svg";
import Save from "@assets/save.svg";
import Export from "@assets/export.svg";
import Pdf from "@assets/export.svg";
import Xmark from "@assets/xmark.svg";
import Plus from "@assets/plus.svg";
import CirclePlus from "@assets/circle-plus.svg";
import type { AriaAttributes, HTMLAttributes } from "react";

const iconClassSizeMap = {
  "xs": "w-2 h-2",
  "sm": "w-4 h-4",
  "md": "w-8 h-8",
  "lg": "w-16 h-16",
  "xl": "w-32 h-32",
}
export interface IconProps extends AriaAttributes, Omit<HTMLAttributes<HTMLElement>, "src"|"alt"> {
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
export const ChevronIcon = ({ direction, size = "md", ...restHtmlProps }: ChevronIconProps) => {
  switch (direction) {
    case "down":
      return <img {...restHtmlProps} src={ChevronDown} className={iconClassSizeMap[size]} alt="chevron down" />;
    case "up":
      return <img {...restHtmlProps}  src={ChevronUp} className={iconClassSizeMap[size]} alt="chevron up" />;
    case "left":
      return <img {...restHtmlProps} src={ChevronLeft} className={iconClassSizeMap[size]} alt="chevron left" />;
    case "right":
      return <img {...restHtmlProps} src={ChevronRight} className={iconClassSizeMap[size]} alt="chevron right" />;
    default:
      return null; // you done goofed
  }
};

export const TrashIcon = ({size = "md"}: IconProps) => (<img src={Trash} className={iconClassSizeMap[size]} />);
export const SaveIcon = ({size = "md"}: IconProps) => (<img src={Save} className={iconClassSizeMap[size]} />);
export const ExportIcon = ({size = "md"}: IconProps) => (<img src={Export} className={iconClassSizeMap[size]} />);
export const PdfIcon = ({size = "md"}: IconProps) => (<img src={Pdf} className={iconClassSizeMap[size]} />);
export const XmarkIcon = ({size = "md"}: IconProps) => (<img src={Xmark} className={iconClassSizeMap[size]} />);
export const PlusIcon = ({size = "md"}: IconProps) => (<img src={Plus} className={iconClassSizeMap[size]} />);
export const CirclePlusIcon = ({size = "md"}: IconProps) => (<img src={CirclePlus} className={iconClassSizeMap[size]} />);
