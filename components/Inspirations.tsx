"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  { text: "کیفیت محصولات و جزئیات کار چوب واقعاً فوق‌العاده بود. چیزی که تحویل گرفتم دقیقاً همان چیزی بود که انتظار داشتم.", name: "سارا احمدی", role: "طراح داخلی", image: "/persons_img/sarah.jpg" },
  { text: "از انتخاب محصول تا ارسال، همه چیز مرتب و حرفه‌ای بود. طراحی کلاسیک محصول کاملاً با فضای خانه ما هماهنگ شد.", name: "مهدی کریمی", role: "مشتری ترنج", image: "/persons_img/michael.jpg" },
  { text: "اگر دنبال مبلمان اصیل و ماندگار هستید، ترنج انتخابی مطمئن است. تجربه خرید من بسیار خوب بود.", name: "نگار رضایی", role: "معمار", image: "/persons_img/emily.jpg" },
];

export default function Inspirations() {
  const [current, setCurrent] = useState(0);
  useEffect(() => { const timer = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 5000); return () => clearInterval(timer); }, []);
  const item = testimonials[current];

  return (
    <section className="w-full px-5 md:px-8 py-16 bg-[#FCFAF6]">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-[#B88A3A] font-bold mb-3">الهام از هنر ایرانی</p>
            <h2 className="text-3xl md:text-5xl font-black leading-tight text-[#0B2942]">خانه‌ای که<br />داستان شما را می‌گوید</h2>
            <p className="text-[#6F6A62] leading-8 mt-6 max-w-xl">از چوب و هنر دست استادکاران ایرانی تا جزئیات ظریف دکوراسیون؛ هر قطعه ترنج برای ساختن فضایی اصیل و ماندگار انتخاب شده است.</p>
            <button className="mt-7 inline-flex items-center gap-2 px-6 py-3 bg-[#062A43] hover:bg-[#031C2E] text-[#FCFAF6] rounded-md font-bold transition-colors">مشاهده مجموعه‌ها <ArrowLeft size={17} /></button>
          </div>
          <div className="grid grid-cols-2 gap-4 h-[390px]">
            <img src="/product_img/minimalist_bedroom.jpg" alt="دکوراسیون ترنج" className="w-full h-full object-cover rounded-2xl" />
            <div className="pt-12"><img src="/product_img/inspire3.jpg" alt="مبلمان ترنج" className="w-full h-full object-cover rounded-2xl" /></div>
          </div>
        </div>

        <div id="testimonials" className="bg-[#062A43] text-[#FCFAF6] rounded-3xl p-7 md:p-12 grid md:grid-cols-[.8fr_1.6fr] gap-10 items-center overflow-hidden">
          <div><p className="text-[#D9AE62] font-bold mb-3">نظر مشتریان</p><h2 className="text-3xl md:text-4xl font-black leading-tight">تجربه‌ای که<br />مشتری‌ها می‌گویند</h2><p className="text-white/65 text-sm leading-7 mt-4">اعتماد شما، باارزش‌ترین بخش داستان ترنج است.</p></div>
          <motion.div key={current} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} className="bg-[#FCFAF6] text-[#0B2942] rounded-2xl p-7 md:p-9 relative">
            <Quote className="absolute top-6 left-6 text-[#B88A3A]/30" size={42} />
            <p className="text-base md:text-lg leading-8 font-medium pl-4">«{item.text}»</p>
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-3"><img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover" /><div><p className="font-bold text-sm">{item.name}</p><p className="text-xs text-[#6F6A62] mt-1">{item.role}</p></div></div>
              <div className="flex gap-2"><button onClick={() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)} className="w-9 h-9 rounded-full border border-[#062A43]/20 flex items-center justify-center"><ArrowRight size={15} /></button><button onClick={() => setCurrent((p) => (p + 1) % testimonials.length)} className="w-9 h-9 rounded-full bg-[#B88A3A] text-white flex items-center justify-center"><ArrowLeft size={15} /></button></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
