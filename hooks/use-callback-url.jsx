import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";

export function useCallbackUrl() {
  const searchParams = useSearchParams();
  const [callbackUrl, setCallbackUrl] = useState("/dashboard/training");

  useEffect(() => {
    const urlFromParams = searchParams.get("callbackUrl")?.toString();
    const urlFromCookie = getCookie("redirectUrl")?.toString();
    const urlFromStorage = localStorage.getItem("callbackUrl");

    const finalUrl =
      urlFromParams || urlFromCookie || urlFromStorage || "/dashboard/training";

    setCallbackUrl(finalUrl);
    localStorage.setItem("callbackUrl", finalUrl);
  }, [searchParams]);

  return callbackUrl;
}
