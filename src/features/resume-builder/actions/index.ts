import type { DispatchDetailsAction } from "./details";
import type { DispatchExperienceActionType } from "./experience";
import type { DispatchJobActionType } from "./jobs";

export * from "./jobs";
export * from "./experience";
export * from "./details";

export type ResumeBuilderActionType =
  | DispatchJobActionType
  | DispatchExperienceActionType
  | DispatchDetailsAction;
