"use client";

import { Refreshable } from "@/components/refreshable";
import { Navbar } from "@/components/navbar";
import { MainCards } from "@/components/main-cards";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <Refreshable>
      <Navbar />
      <main className="flex-1">
        <MainCards />
      </main>
      <Footer />
    </Refreshable>
  );
}
