import {
  Children,
  cloneElement,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type HTMLProps,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from "react";

export interface EditableFieldProps {
  /**
   * reliably supported types for inputs
   */
  type:
    | "number"
    | "text"
    | "tel"
    | "email"
    | "date"
    | "time"
    | "url"
    | "month"
    | "datetime-local"
    | "week";
  /**
   * Override prop that can be passed to tell component it is in editing state
   */
  isEditing?: boolean;
  /**
   * Override prop that can be passed to tell component what the value should be
   * or the initial value
   */
  value: string | number | undefined; // valid types for inputs
  /**
   * Node that is used when not being editied
   */
  children: ReactNode;
  /**
   * Callback for when user has changed the value from what was
   * originally passed in.
   */
  onChanged: (value: string | number) => void;
}

const EditableField = ({
  type,
  isEditing: isEditingProp,
  children,
  value: valueProp,
  onChanged,
}: EditableFieldProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(valueProp);
  const [isEditing, setIsEditing] = useState(isEditingProp);

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    // see https://www.w3.org/TR/uievents-key/#named-key-attribute-values
    if (event.key === "Escape" || event.key === "Cancel") {
      event.preventDefault(); // stop propegation incase we are in a form
      setIsEditing(false);
      setValue(valueProp); // revert back to what the consumer originally had
    }
    if (event.key === "Accept" || event.key === "Execute") {
      event.preventDefault(); // stop propegation incase we are in a form
      setIsEditing(false);
      if (value !== valueProp) {
        onChanged(value); // tell the consumer we have made an official chane not just clicking to edit and then leaving
      }
    }
  };

  const handleBlur = (_: FocusEvent<HTMLInputElement>) => {
    setIsEditing(false);
    if (value !== valueProp) {
      onChanged(value); // tell the consumer we have made an official chane not just clicking to edit and then leaving
    }
  };

  const handleFieldValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleChildClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      // add timeout to let the render turn into an input
      ref.current?.focus();
    }, 100);
  };

  useEffect(() => {
    // incase consumer updates editing state to be different than us
    if (isEditingProp !== isEditing) {
      setIsEditing(Boolean(isEditingProp));
    }
  }, [isEditingProp]);

  useEffect(() => {
    // incase soncumser updates the value outside of what we are doing
    if (valueProp !== value) {
      setValue(valueProp);
    }
  }, [valueProp]);

  if (!isEditing) {
    const childArray = Children.toArray(children);
    return Children.map(childArray, (child) => {
      if (typeof child !== "object") {
        console.warn(
          typeof child,
          "is not a supported type for editable inputs",
        );
        return child; // just return whatever they gave us
      }
      if (!("props" in child)) {
        console.warn(
          "Child does not implement props property. Not suspected as ReactElement",
        );
        return child;
      }
      return cloneElement(child as ReactElement<HTMLProps<HTMLElement>>, {
        onClick: handleChildClick,
      });
    });
  }

  return (
    <input
      ref={ref}
      type={type}
      value={value ?? ""}
      onChange={handleFieldValueChanged}
      onKeyUp={handleKeyUp}
      onBlur={handleBlur}
    />
  );
};

export default EditableField;
