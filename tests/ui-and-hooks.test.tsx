import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import HeroCTAs from "@/components/HeroCTAs";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import { usePagination } from "@/hooks/usePagination";

afterEach(() => vi.useRealTimers());

describe("interactive UI", () => {
  it("scrolls to hero actions", () => {
    const target = document.createElement("div");
    target.id = "projectsDiv";
    const scrollIntoView = vi.fn();
    target.scrollIntoView = scrollIntoView;
    document.body.append(target);
    render(<HeroCTAs />);
    fireEvent.click(screen.getByRole("button", { name: /view selected work/i }));
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    target.remove();
  });

  it("opens the mobile navigation", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: /toggle menu/i }));
    expect(screen.getAllByText("Projects")).toHaveLength(2);
  });

  it("emits valid person schema", () => {
    const { container } = render(<JsonLd />);
    expect(JSON.parse(container.querySelector("script")!.textContent!)).toMatchObject({ name: "Syed Mohammed Faham", address: { addressRegion: "CA" } });
  });
});

describe("usePagination", () => {
  it("paginates and returns to the first page", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => usePagination({ totalItems: 5, itemsPerPage: 2 }));
    expect(result.current.totalPages).toBe(3);
    act(() => result.current.goToNext());
    expect(result.current.currentPage).toBe(1);
    expect(result.current.getVisibleItems([1, 2, 3, 4, 5])).toEqual([3, 4]);
    act(() => result.current.goToPrevious());
    expect(result.current.currentPage).toBe(0);
    act(() => vi.runAllTimers());
    expect(result.current.slideDirection).toBeNull();
  });
});
