import { getFileUrl } from "@/lib/services";
import { useEffect, useState } from "react";
import { FetchKeyImageProps } from "@/types";
import dynamic from "next/dynamic";

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const FetchKeyImage = ({
  imageKey,
  className,
  tempUrl = false,
  alt = "Image",
}: FetchKeyImageProps) => {
  const [src, setSrc] = useState<string | undefined>();
  const [isLottie, setIsLottie] = useState(false);
  const [lottieData, setLottieData] = useState<any>(null);

  useEffect(() => {
    const fetchUrl = async () => {
      if (!imageKey) {
        setSrc(undefined);
        setIsLottie(false);
        setLottieData(null);
        return;
      }

      try {
        // Check if it's a JSON string (Lottie animation data stored directly)
        if (
          typeof imageKey === "string" &&
          (imageKey.trim().startsWith("{") || imageKey.trim().startsWith("["))
        ) {
          try {
            const parsed = JSON.parse(imageKey);
            setIsLottie(true);
            setLottieData(parsed);
            return;
          } catch (e) {
            // Not a JSON string, continue with normal flow
          }
        }

        const url = await getFileUrl(imageKey);

        // Check if the URL points to a JSON file
        if (url && (url.endsWith(".json") || imageKey.endsWith(".json"))) {
          const response = await fetch(url);
          const data = await response.json();
          setIsLottie(true);
          setLottieData(data);
        } else {
          setSrc(url);
          setIsLottie(false);
        }
      } catch (err) {
        console.error("Image fetch failed:", err);
        setSrc(undefined);
        setIsLottie(false);
        setLottieData(null);
      }
    };

    if (tempUrl) {
      // For temporary URLs (direct data or blob URLs)
      if (
        typeof imageKey === "string" &&
        (imageKey.trim().startsWith("{") || imageKey.trim().startsWith("["))
      ) {
        try {
          const parsed = JSON.parse(imageKey);
          setIsLottie(true);
          setLottieData(parsed);
        } catch (e) {
          setSrc(imageKey);
          setIsLottie(false);
        }
      } else {
        setSrc(imageKey);
        setIsLottie(false);
      }
    } else {
      fetchUrl();
    }
  }, [imageKey, tempUrl]);

  if (isLottie && lottieData) {
    return (
      <div className={className}>
        <Lottie
          animationData={lottieData}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }

  return (
    <img src={src || "/placeholder.svg"} alt={alt} className={className} />
  );
};

export default FetchKeyImage;
