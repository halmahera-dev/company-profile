"use client";

import dynamic from "next/dynamic";

const ControlsSection = dynamic(
  function loadControls() {
    return import("./controls-section").then(function pick(module) {
      return module.ControlsSection;
    });
  },
  {
    ssr: false,
    loading: function ControlsLoading() {
      return <section className="mx-auto min-h-96 max-w-6xl px-4" aria-busy />;
    },
  },
);

const ComponentsSection = dynamic(
  function loadComponents() {
    return import("./components-section").then(function pick(module) {
      return module.ComponentsSection;
    });
  },
  {
    ssr: false,
    loading: function ComponentsLoading() {
      return <section className="mx-auto min-h-96 max-w-6xl px-4" aria-busy />;
    },
  },
);

const RecipesSection = dynamic(
  function loadRecipes() {
    return import("./recipes-section").then(function pick(module) {
      return module.RecipesSection;
    });
  },
  {
    ssr: false,
    loading: function RecipesLoading() {
      return <section className="mx-auto min-h-96 max-w-6xl px-4" aria-busy />;
    },
  },
);

export function LazyDesignSystemSections() {
  return (
    <>
      <ControlsSection />
      <ComponentsSection />
      <RecipesSection />
    </>
  );
}
