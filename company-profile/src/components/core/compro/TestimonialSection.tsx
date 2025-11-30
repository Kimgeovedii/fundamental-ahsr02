"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Mark Roberts",
    role: "Founder",
    company: "GreenEarth Eco Store",
    content:
      "Working with Digiforma was a pleasure. Their development skills and understanding of business needs helped us launch a platform that exceeded expectations. The IT strategy they provided was exactly what we needed.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mark",
  },
  {
    id: "2",
    name: "Lisa Williams",
    role: "Head of Product",
    company: "HealthTech Innovations",
    content:
      "Digiforma built a fast, scalable, and maintainable app for us. Their blend of technical expertise and governance insight made the collaboration seamless. Highly recommended for any enterprise project.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
  },
  {
    id: "3",
    name: "Michael Johnson",
    role: "Marketing Manager",
    company: "GlobalTech",
    content:
      "Our digital transformation project ran smoothly thanks to Digiforma's mastery in frameworks like COBIT and TOGAF, ensuring top-notch quality control. The results speak for themselves.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: "4",
    name: "Sarah Chen",
    role: "CTO",
    company: "FinTech Solutions",
    content:
      "The Enterprise Architecture design provided by Digiforma transformed our IT infrastructure. Their expertise in IT governance and custom software development is unmatched. Excellent partnership!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "5",
    name: "David Kumar",
    role: "Operations Director",
    company: "Manufacturing Plus",
    content:
      "Digiforma helped us implement a comprehensive IT Master Plan that aligned perfectly with our business goals. Their custom software solution streamlined our operations significantly.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
];

const TestimonialSection = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [itemsPerView, setItemsPerView] = React.useState(3);
  const [autoPlay, setAutoPlay] = React.useState(true);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = React.useMemo(
    () => Math.ceil(testimonials.length / itemsPerView),
    [itemsPerView]
  );

  React.useEffect(() => {
    if (currentSlide >= totalSlides && totalSlides > 0) {
      setCurrentSlide(0);
    }
  }, [currentSlide, totalSlides]);

  React.useEffect(() => {
    if (!autoPlay || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, totalSlides]);

  const getVisibleTestimonials = () => {
    const startIndex = currentSlide * itemsPerView;
    const visible: Testimonial[] = [];
    for (
      let i = 0;
      i < itemsPerView && startIndex + i < testimonials.length;
      i++
    ) {
      visible.push(testimonials[startIndex + i]);
    }
    return visible;
  };

  const nextSlide = () => {
    setAutoPlay(false);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const prevSlide = () => {
    setAutoPlay(false);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const goToSlide = (slideIndex: number) => {
    if (slideIndex === currentSlide) return;
    setAutoPlay(false);
    setCurrentSlide(slideIndex);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-blue-950 dark:to-indigo-950 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white/90">Our</span>{" "}
            <span className="bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 dark:from-blue-300 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>
          <p className="text-lg md:text-xl text-blue-100 dark:text-blue-200 max-w-3xl mx-auto">
            Hear what our clients say about working with us — collaboration that
            blends technology, governance, and business excellence.
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {getVisibleTestimonials().map((testimonial, idx) => (
                  <motion.div
                    key={`${testimonial.id}-${currentSlide}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300 h-full flex flex-col"
                  >
                    <div className="relative mb-6">
                      <Quote className="w-12 h-12 text-blue-200 dark:text-blue-300 opacity-80" />
                    </div>

                    <p className="text-white/90 dark:text-white/80 text-base md:text-lg leading-relaxed mb-6 grow">
                      {testimonial.content}
                    </p>

                    <div className="flex items-center gap-4 pt-4 mt-auto border-t border-white/20 dark:border-white/10">
                      <Avatar className="h-12 w-12 border-2 border-white/30 shrink-0">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback className="bg-blue-400 dark:bg-blue-500 text-white font-semibold">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-base">
                          {testimonial.name}
                        </p>
                        <p className="text-white/70 dark:text-white/60 text-sm">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12  hover:bg-white/20  text-white h-12 w-12"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 hover:bg-white/20 dark:hover:bg-white/10 text-white  h-12 w-12"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex justify-center items-center gap-2 mt-12">
          {Array.from({ length: totalSlides }).map((_, index) => {
            const isActive = currentSlide === index;
            return (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  isActive
                    ? "bg-white w-8"
                    : "bg-white/40 dark:bg-white/30 hover:bg-white/60 w-2.5"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 dark:bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 dark:bg-indigo-500/20 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default TestimonialSection;
