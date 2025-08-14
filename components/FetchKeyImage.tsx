import { getFileUrl } from "@/lib/services";
import { useEffect, useState } from "react";
import { FetchKeyImageProps } from "@/types";

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
        const url = await getFileUrl(imageKey);
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
