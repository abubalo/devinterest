import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProgressBar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router]);
  return (
    <div
      className={`fixed top-0 bg-white h-1 transition-all duration-500 ease-in-out z-50 `}
      style={{ width: loading ? "100%" : "0%" }}
    />
  );
};

export default ProgressBar;
