import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./Loader";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import NotFound from "../pages/NotFound";

function Main() {
  return (
    <main className="main">
      <div className="container">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="detail/:city" element={<Detail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </main>
  );
}

export default Main;
