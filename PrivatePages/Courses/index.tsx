import React, { useEffect, useState, useCallback } from "react";

import { useAuth } from "../../../hooks/auth";
import apiV2 from "../../../services/apiV2";

import { Category as CategoryInterface } from "../../../models/AuthModels";

import CategoryContainer from "../../../components/Mols/CategoryContainer";
import MainSlider from "../../../components/Mols/MainSlider";
import MainSliderSkeleton from "../../../components/Mols/Shimmer/MainSlider";

import { Container } from "./styles";

const Cursos: React.FC = () => {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [slideImgs, setSlideImgs] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user, getDashboard } = useAuth();

  let urlAtual =
    process.env.NODE_ENV === "development"
      ? `${process.env.REACT_APP_WHITELABEL}`
      : window.location.href;
  let splitUrlProd = urlAtual.split(".");
  let subdomain = splitUrlProd[0].includes("www")
    ? ["", splitUrlProd[1]]
    : splitUrlProd[0].split("//");

  const getAllCategories = useCallback(async () => {
    setIsLoading(true);

    const response = await apiV2.get(
      `/course?userid=${user.userid}&schoolid=${user.schoolid}`
    );

    setCategories(response.data.courses);
    setSlideImgs(response.data.banners);
    setIsLoading(false);
  }, [user.userid]);

  useEffect(() => {
    getAllCategories();
    getDashboard(user);
  }, [getAllCategories, user, getDashboard]);

  return (
    <Container>
      {slideImgs.length > 0 ? (
        <MainSlider slideImgs={slideImgs} />
      ) : (
        <MainSliderSkeleton />
      )}
      <CategoryContainer categories={categories} isLoading={isLoading} />
    </Container>
  );
};

export default Cursos;
