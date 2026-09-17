"use client";

import React, { useActionState, useState } from "react";
import { Terminal, ShieldAlert, Key, Eye, EyeOff, Lock } from "lucide-react";
import { loginAction } from "./actions";

export default function AdminLogin() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="py-16 sm:py-24 flex items-center justify-center w-full">
      <div className="w-full max-w-md cyber-panel cyber-cut border border-neutral-800 p-6 sm:p-8 space-y-6 shadow-[0_0_30px_var(--cyber-glow-soft)] relative">
        {/* Corner HUD Tag */}
        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 border-b border-neutral-900 pb-3">
          <span className="flex items-center gap-1.5 text-[var(--cyber-primary)]">
            <Lock className="w-3.5 h-3.5" />
            CLEARANCE_CHECK
          </span>
          <span>PROTOCOL_v2.0</span>
        </div>

        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-none bg-neutral-900 border border-[var(--cyber-primary)] flex items-center justify-center mx-auto text-[var(--cyber-primary)] shadow-[0_0_15px_var(--cyber-glow-soft)]">
            <Key className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-mono font-extrabold text-white tracking-widest uppercase">
            ADMIN_CONSOLE // ACCESS
          </h1>
          <p className="text-xs font-mono text-neutral-400">
            Enter cryptographic authorization passcode to unlock real-time content management.
          </p>
        </div>

        {/* Error Alert */}
        {state?.error && (
          <div className="p-3 bg-red-950/40 border border-red-800/80 text-red-400 font-mono text-xs flex items-start gap-2 animate-shake">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
            <div className="space-y-1">
              <div>{state.error}</div>
              {state.remaining !== undefined && state.remaining > 0 && (
                <div className="text-[10px] text-red-500">
                  AUTO-LOCKOUT TRIGGER IN: {state.remaining} ATTEMPT(S)
                </div>
              )}
            </div>
          </div>
        )}

        {/* Login Form */}
        <form action={formAction} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 flex items-center justify-between">
              <span>ADMIN_PASSCODE:</span>
              <span className="text-[10px] text-neutral-600">[SERVER_ENCRYPTED]</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="passcode"
                required
                autoFocus
                placeholder="Enter access passcode..."
                className="w-full px-3 py-2.5 bg-neutral-900/90 border border-neutral-800 text-white font-mono text-sm focus:outline-none focus:border-[var(--cyber-primary)] transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 bg-neutral-900 hover:bg-[var(--cyber-primary)] border border-[var(--cyber-primary)] text-white hover:text-black font-mono text-xs uppercase tracking-widest font-bold transition-all cyber-cut-sm shadow-[0_0_12px_var(--cyber-glow-soft)] cursor-pointer disabled:opacity-50"
          >
            {isPending ? "DECRYPTING_HANDSHAKE..." : "AUTHORIZE_SESSION // ENTER"}
          </button>
        </form>

        {/* Tip / Default Password Guidance */}
        <div className="p-3 bg-neutral-900/60 border border-neutral-900 text-[11px] font-mono text-neutral-500 space-y-1">
          <div className="text-[var(--cyber-primary)] font-semibold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>SECURITY_NOTICE</span>
          </div>
          <p>
            Default developer passcode is configured in <code className="text-neutral-300">.env.local</code> as <code className="text-white bg-black px-1">none of your business.</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
