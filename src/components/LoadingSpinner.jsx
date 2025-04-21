import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <img
        src={`/assets/LoadingState/loading-liquor.gif`}
        alt="Loading..."
        className="w-32 h-32"
      />
    </div>
  );
};

export default LoadingSpinner;
