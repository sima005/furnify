"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Truck, Headset, ShieldCheck, Gem } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      <section className="w-full bg-[#F7F3EC] px-4 md:px-8 pt-0 pb-0">
        <div className="relative max-w-[1500px] mx-auto min-h-[500px] md:min-h-[590px] overflow-hidden bg-[#062A43] flex items-center">
          <img src="/toranj-hero.jpg" alt="مبلمان و دکوراسیون ترنج" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#031C2E]/15 via-[#031C2E]/50 to-[#031C2E]/95" />
          <div className="relative z-10 w-full max-w-7xl mx-auto px-7 md:px-16 lg:px-24 py-16">
            <motion.div initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="max-w-xl text-right">
              <p className="text-[#D9AE62] font-semibold text-lg mb-5">مبلمان و دکوراسیون چوبی</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.25] tracking-tight text-[#FCFAF6]">
                ترکیب هنر و اصالت<br />در خانه شما
              </h1>
              <div className="w-40 h-px bg-[#B88A3A] my-7" />
              <p className="text-[#FCFAF6]/90 text-base md:text-lg leading-8 max-w-lg">
                محصولات ترنج، حاصل هنر دست استادکاران ایرانی با بهترین متریال و ماندگارترین کیفیت.
              </p>
              <Link href="/shop" className="inline-flex items-center gap-3 mt-8 px-7 py-3.5 bg-[#D9AE62] hover:bg-[#B88A3A] text-[#031C2E] rounded-md font-bold transition-colors">
                مشاهده محصولات <ArrowLeft size={19} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#FCFAF6] border-b border-[#062A43]/10 px-5 md:px-10 py-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 divide-x divide-x-reverse divide-[#B88A3A]/40">
          {[
            { icon: Truck, title: "ارسال سریع و مطمئن", sub: "به سراسر کشور" },
            { icon: ShieldCheck, title: "ضمانت کیفیت", sub: "و اصالت کالا" },
            { icon: Headset, title: "پشتیبانی حرفه‌ای", sub: "پاسخگویی ۷ روز هفته" },
            { icon: Gem, title: "تنوع محصولات", sub: "در سبک‌های اصیل ایرانی" },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-center justify-center gap-3 px-5 text-center">
              <Icon size={31} strokeWidth={1.5} className="text-[#B88A3A] shrink-0" />
              <div><p className="font-bold text-[#0B2942] text-sm md:text-base">{title}</p><p className="text-[#6F6A62] text-xs md:text-sm mt-1">{sub}</p></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
