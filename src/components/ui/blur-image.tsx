/* eslint-disable @next/next/no-img-element */

import Image from "next/image";

export interface BlurImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className: string;
  isBlur?: boolean;
}


export function BlurImage(props: BlurImageProps) {
  const { src, alt, className, isBlur = false, ...rest } = props;

  return (
    <Image
      src={src}
      alt={alt}
      width={150}
      height={150}
      className={`${className} ${isBlur ? "blur-xl" : ""}`}
      {...rest}
    />
  );
}
