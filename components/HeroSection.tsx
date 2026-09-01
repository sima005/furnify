"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Truck, Headset, ShieldCheck, Gem, Sparkles } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: Truck, title: "ارسال سریع و مطمئن", sub: "به سراسر کشور" },
  { icon: ShieldCheck, title: "ضمانت کیفیت", sub: "و اصالت کالا" },
  { icon: Headset, title: "پشتیبانی حرفه‌ای", sub: "پاسخگویی ۷ روز هفته" },
  { icon: Gem, title: "تنوع محصولات", sub: "در سبک‌های اصیل ایرانی" },
];

export default function HeroSection() {
  return (
    <>
      <section className="w-full bg-[#F7F3EC] px-4 md:px-8 pt-0 pb-0">
        <div className="relative max-w-[1500px] mx-auto min-h-[500px] md:min-h-[590px] overflow-hidden bg-[#062A43] flex items-center">
          <img src="/toranj-hero.jpg" alt="مبلمان و دکوراسیون ترنج" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#031C2E]/15 via-[#031C2E]/50 to-[#031C2E]/95" />
          <div className="relative z-10 w-full max-w-7xl mx-auto px-7 md:px-16 lg:px-24 py-16">
            <motion.div initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="max-w-xl text-right">
              <div className="flex items-center gap-2 text-[#D9AE62] font-semibold text-base md:text-lg mb-5">
                <Sparkles size={18} />
                <span>مبلمان و دکوراسیون چوبی</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.25] tracking-tight text-[#FCFAF6]">
                ترکیب هنر و اصالت<br />در خانه شما
              </h1>
              <div className="w-40 h-px bg-[#B88A3A] my-7" />
              <p className="text-[#FCFAF6]/90 text-base md:text-lg leading-8 max-w-lg">
                محصولات ترنج، حاصل هنر دست استادکاران ایرانی با بهترین متریال و ماندگارترین کیفیت.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/shop" className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#D9AE62] hover:bg-[#B88A3A] text-[#031C2E] rounded-full font-bold transition-colors">
                  مشاهده محصولات <ArrowLeft size={19} />
                </Link>
                <Link href="/build" className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#FCFAF6]/10 hover:bg-[#FCFAF6]/20 border border-[#D9AE62]/70 text-[#FCFAF6] rounded-full font-bold backdrop-blur-sm transition-colors">
                  ساخت محصول دلخواه <ArrowLeft size={19} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#F7F3EC] px-5 md:px-10 py-8 md:py-10 border-b border-[#B88A3A]/15">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {features.map(({ icon: Icon, title, sub }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .45, delay: .15 + index * .08 }}
              className="min-h-[112px] rounded-3xl bg-[#FCFAF6] border border-[#B88A3A]/20 shadow-[0_8px_30px_rgba(3,28,46,0.07)] flex items-center justify-center gap-4 px-5 text-center hover:-translate-y-1 hover:shadow-[0_12px_34px_rgba(3,28,46,0.11)] transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-[#F7F3EC] border border-[#D9AE62]/60 flex items-center justify-center shrink-0">
                <Icon size={29} strokeWidth={1.6} className="text-[#B88A3A]" />
              </div>
              <div>
                <p className="font-bold text-[#0B2942] text-sm md:text-base">{title}</p>
                <p className="text-[#6F6A62] text-xs md:text-sm mt-1.5">{sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
