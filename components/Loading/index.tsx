import React from "react";
import "./loading.css";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 items-center justify-center bg-black/40 z-50">
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    </div>
  );
}
