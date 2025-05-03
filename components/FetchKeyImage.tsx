import { fetchImageUrl } from "@/lib/utils";
import { useEffect, useState } from "react";

interface FetchKeyImageProps {
  imageKey?: string;
  className?: string;
  alt?: string;
}

const FetchKeyImage = ({
  imageKey,
  className,
  alt = "Image",
}: FetchKeyImageProps) => {
  const [src, setSrc] = useState<string | undefined>();
  console.log("FetchedImage - imageKey:", imageKey, "src:", src);
  useEffect(() => {
    if (!imageKey) {
      setSrc(undefined);
      return;
    }

    fetchImageUrl(imageKey)
      .then((url) => setSrc(url))
      .catch((err) => {
        console.error("Image fetch failed:", err);
        setSrc(undefined);
      });
  }, [imageKey]);
  console.log("FetchedImage - imageKey:", imageKey, "src:", src);

  return (
    <img src={src || "/placeholder.svg"} alt={alt} className={className} />
  );
};

export default FetchKeyImage;
