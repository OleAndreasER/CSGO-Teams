import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Mainpage from "./mainpage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoritesProvider } from "../favorites/favorites-provider";

describe("Mainpage", () => {
  test("Mainpage renders correctly.", async () => {
    const { findByTestId } = render(
      <QueryClientProvider client={new QueryClient()}>
        <FavoritesProvider>
          <Mainpage />
        </FavoritesProvider>
      </QueryClientProvider>
    );

    expect(await findByTestId("selected-country-dropdown")).toBeInTheDocument();
    expect(await findByTestId("sort-option-dropdown")).toBeInTheDocument();
    expect(await findByTestId("international-checkbox")).toBeInTheDocument();
    expect(await findByTestId("favorite-checkbox")).toBeInTheDocument();
    expect(await findByTestId("teams")).toBeInTheDocument();
  });

})
