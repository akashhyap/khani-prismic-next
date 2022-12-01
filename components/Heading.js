import clsx from "clsx";

export const Heading = ({
  as: Comp = "h1",
  size = "4xl",
  children,
  className,
}) => {
  return (
    <Comp
      className={clsx(
        className
      )}
    >
      {children}
    </Comp>
  );
};
