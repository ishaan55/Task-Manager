import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-white">404 Not Found</div>
      <Link to="/" className="text-white border-b-white border-b">Home</Link>
    </div>
  );
}

export default NotFoundPage;
