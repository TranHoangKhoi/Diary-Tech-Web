"use client";

import React from "react";

const LoadingOverlay = ({ show }: { show: boolean }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-9999999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 bg-white px-8 py-6 rounded-2xl shadow-lg">
        {/* spinner */}
        <div className="w-10 h-10 border-4 border-slate-200 border-t-primary rounded-full animate-spin" />

        <p className="text-sm font-medium text-slate-700">
          Đang tạo tài khoản...
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
