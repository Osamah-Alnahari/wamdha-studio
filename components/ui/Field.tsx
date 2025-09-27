import React, { useId, isValidElement } from "react";
import clsx from "clsx";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  htmlFor?: string;
  help?: string;
  error?: string;
  required?: boolean;
  /**
   * A single form control element (input, textarea, select, etc.)
   */
  children: React.ReactElement<any>;
}

export const Field: React.FC<FieldProps> = ({
  label,
  htmlFor,
  help,
  error,
  required,
  children,
  className,
  ...rest
}) => {
  const fallbackId = useId();
  const id = htmlFor || fallbackId;
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-err` : undefined;

  let control = children;
  if (isValidElement(children)) {
    const childProps: Record<string, unknown> = {
      id,
      "aria-describedby":
        [helpId, errorId].filter(Boolean).join(" ") || undefined,
      "aria-invalid": error ? true : undefined,
      className: clsx("field-input", (children.props as any).className),
    };
    control = React.cloneElement(children, childProps);
  }

  return (
    <div
      className={clsx("ds-field", error && "ds-field--error", className)}
      {...rest}
    >
      <label className="ds-field__label" htmlFor={id}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      {control}
      {help && (
        <p id={helpId} className="ds-field__help">
          {help}
        </p>
      )}
      {error && (
        <p id={errorId} className="ds-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
