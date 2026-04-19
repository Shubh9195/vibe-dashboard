"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      // Parse the URL hash for implicit flow tokens (e.g. #access_token=...)
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace("#", "?").slice(1));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const errorCode = params.get("error_code");

      // Also check for PKCE flow code in query string
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");

      if (errorCode) {
        setError(`Auth error: ${params.get("error_description") ?? errorCode}`);
        setTimeout(() => router.push("/login"), 3000);
        return;
      }

      // Handle PKCE flow (code in query param)
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setError(error.message);
          setTimeout(() => router.push("/login"), 3000);
          return;
        }
        router.push("/dashboard");
        return;
      }

      // Handle implicit flow (tokens in hash)
      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (error) {
          setError(error.message);
          setTimeout(() => router.push("/login"), 3000);
          return;
        }
        router.push("/dashboard");
        return;
      }

      // If supabase-js auto-detected the session (detectSessionInUrl=true default)
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
        return;
      }

      // Nothing worked
      setError("Could not verify your magic link. Please try again.");
      setTimeout(() => router.push("/login"), 3000);
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white gap-4">
      {error ? (
        <>
          <div className="text-red-400 text-lg font-medium">{error}</div>
          <p className="text-zinc-500 text-sm">Redirecting you back to login...</p>
        </>
      ) : (
        <>
          <Loader2 className="w-10 h-10 text-blue-400 animate-spin" />
          <p className="text-zinc-300 text-lg font-medium">Signing you in...</p>
          <p className="text-zinc-500 text-sm">Please wait a moment.</p>
        </>
      )}
    </div>
  );
}
