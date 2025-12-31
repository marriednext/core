import type { ComponentPropsWithoutRef, ComponentType } from "react";

export type ApplicationImageProps = Omit<ComponentPropsWithoutRef<"img">, "src" | "width" | "height"> & {
  src: unknown;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
};

export type ApplicationImageComponent = "img" | ComponentType<ApplicationImageProps>;

