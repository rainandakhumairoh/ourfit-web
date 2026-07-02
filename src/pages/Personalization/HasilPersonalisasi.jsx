import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import PersonalizationCard from "../../components/PersonalizationCard/PersonalizationCard";

export default function HasilPersonalisasi() {
  const smart = JSON.parse(
    sessionStorage.getItem("smartFitResult")
  );

  const style = JSON.parse(
    sessionStorage.getItem("styleQuizResult")
  );

  const name =
    sessionStorage.getItem("userName") || "User";

  if (!smart || !style) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Belum ada hasil personalisasi.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary px-6 py-10 relative">
      <h1 className="text-pink1 text-4xl font-bold text-center font-[Poppins]">
        Hai, {name}! ✨
      </h1>

      <p className="text-center text-gray-700 mt-1 mb-8 font-[Poppins] font-medium">
        Ini hasil personalisasi lengkap untukmu.
      </p>

      <PersonalizationCard
        smart={smart}
        styleRes={style}
        readOnly={false}
      />
    </div>
  );
}