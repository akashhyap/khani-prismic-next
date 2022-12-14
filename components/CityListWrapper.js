import clsx from "clsx";

export const CityListWrapper = ({
  as: Comp = "div",
  size = "base",
  className,
  children,
}) => {
  return (
    <Comp className={clsx("px-4 pt-10", className)}>
      <div
        className={clsx(
          "mx-auto w-full",
          size === "small" && "max-w-xl",
          size === "base" && "max-w-3xl",
          size === "wide" && "max-w-4xl",
          size === "wider" && "max-w-5xl",
          size === "widest" && "max-w-6xl"
        )}
      >
        {children}
      </div>
    </Comp>
  );
};
