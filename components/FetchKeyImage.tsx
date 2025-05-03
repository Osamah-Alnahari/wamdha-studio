import { fetchImageUrl } from "@/lib/utils";
import { useEffect, useState } from "react";

interface FetchKeyImageProps {
  imageKey?: string;
  className?: string;
  tempUrl?: boolean;
  alt?: string;
}

const FetchKeyImage = ({
  imageKey,
  className,
  tempUrl = false,
  alt = "Image",
}: FetchKeyImageProps) => {
  const [src, setSrc] = useState<string | undefined>();
  useEffect(() => {
    const fetchUrl = async () => {
      if (!imageKey) {
        setSrc(undefined);
        return;
      }
      try {
        const url = await fetchImageUrl(imageKey);
        setSrc(url);
      } catch (err) {
        console.error("Image fetch failed:", err);
        setSrc(undefined);
      }
    };
    if (tempUrl) {
      setSrc(imageKey);
    } else {
      fetchUrl();
    }
  }, [imageKey]);

  return (
    <img src={src || "/placeholder.svg"} alt={alt} className={className} />
  );
};

export default FetchKeyImage;
