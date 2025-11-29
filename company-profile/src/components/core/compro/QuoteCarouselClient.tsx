"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuoteType {
  quote: string;
  name: string;
  title: string;
  buttonText: string;
}

interface QuoteCarouselClientProps {
  quotes: QuoteType[];
}

export function QuoteCarouselClient({ quotes }: QuoteCarouselClientProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(1);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    return () => {
      api.off("select", () => setCurrent(api.selectedScrollSnap() + 1));
    };
  }, [api]);

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {quotes.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <div
                className={cn(
                  "flex flex-col items-center text-center px-4 md:px-6 py-8 md:py-4 min-h-[200px] md:h-56 transition-opacity duration-300 relative",
                  current - 1 === index
                    ? "opacity-100 scale-100"
                    : "opacity-50 md:scale-95"
                )}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 md:-translate-y-4 z-10">
                  <span className="text-3xl md:text-4xl text-blue-700 opacity-60">
                    "
                  </span>
                </div>
                <p className="text-base md:text-xl italic font-semibold mb-4 text-white pt-6 leading-relaxed">
                  {item.quote}
                </p>
                <p className="text-sm font-bold text-blue-400">{item.name}</p>
                <p className="text-xs text-gray-400">{item.title}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 border-white/20 bg-transparent text-white hover:bg-white/10 hidden sm:flex"
          asChild
        >
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-8 h-8 md:w-10 md:h-10 bg-black/50 hover:bg-black/70 border-white text-white dark:bg-black/80 dark:hover:bg-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </CarouselPrevious>

        <CarouselNext
          className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 border-white/20 bg-transparent text-white hover:bg-white/10 hidden sm:flex"
          asChild
        >
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-8 h-8 md:w-10 md:h-10 bg-black/50 hover:bg-black/70 border-white text-white dark:bg-black/80 dark:hover:bg-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M16.28 12.28a.75.75 0 0 0 0-1.06l-7.5-7.5a.75.75 0 0 0-1.06 1.06L14.69 12l-6.97 6.97a.75.75 0 1 0 1.06 1.06l7.5-7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </CarouselNext>
      </Carousel>
    </div>
  );
}
