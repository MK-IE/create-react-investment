import React from "react";

function RenderLoad() {
  return (
    <div className="load-screen full-height">
      <div className="d-flex h-100 align-items-center justify-content-center">
        <div className="spinner-border text-primary">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default RenderLoad;
