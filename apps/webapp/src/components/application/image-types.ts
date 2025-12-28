import type { ComponentPropsWithoutRef, ElementType } from "react";

export type ApplicationImageProps = ComponentPropsWithoutRef<"img"> & {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
};

export type ApplicationImageComponent = ElementType<ApplicationImageProps>;
