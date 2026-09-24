"use client";
import { Lottie } from "lottie-react";
import loading from "../../../public/loading.json";

export const Loading = () => {
  return <Lottie src={loading} autoplay loop role="status" aria-label="読み込み中" />;
};
