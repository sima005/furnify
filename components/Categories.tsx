"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const categories = [
  { title: "مبلمان کلاسیک", sub: "انواع مبل و صندلی", image: "/product_img/inspire3.jpg" },
  { title: "میز و جلو مبلی", sub: "میزهای اصیل چوبی", image: "/product_img/inspire2.jpg" },
  { title: "آینه و کنسول", sub: "جزئیات ماندگار دکوراسیون", image: "/product_img/minimalist_bedroom.jpg" },
  { title: "تخت خواب", sub: "آرامش با طراحی اصیل", image: "/product_img/minimalist_bedroom.jpg" },
  { title: "دکور و تزئینی", sub: "زیبایی در جزئیات", image: "/product_img/inspire2.jpg" },
];

export default function Categories() {
  return (
    <section className="w-full px-5 md:px-8 py-14 md:py-20 bg-[#F7F3EC]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="h-px w-20 bg-[#B88A3A]" /><span className="text-[#B88A3A]">✦</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0B2942]">دسته‌بندی محصولات</h2>
          <span className="text-[#B88A3A]">✦</span><span className="h-px w-20 bg-[#B88A3A]" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {categories.map((cat, i) => (
            <motion.div key={cat.title} whileHover={{ y: -5 }} transition={{ duration: .2 }}>
              <Link href="/shop" className="block bg-[#FCFAF6] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-[#062A43]/5">
                <div className="aspect-[1.15] bg-[#EDE6DC] overflow-hidden">
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-[#0B2942] text-sm md:text-base">{cat.title}</h3>
                  <p className="text-xs text-[#6F6A62] mt-1">{cat.sub}</p>
                  <span className="inline-flex items-center gap-1 text-[#B88A3A] text-xs font-bold mt-3">مشاهده <ArrowLeft size={13} /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
