"use client";

import { Search, ShoppingCart, UserRound, Phone, Mail, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const SEARCHABLE = [
  { title: "مبل کلاسیک", href: "/shop", category: "مبلمان" }, { title: "میز و جلو مبلی", href: "/shop", category: "میز" },
  { title: "آینه و کنسول", href: "/shop", category: "دکوراتیو" }, { title: "تخت خواب", href: "/shop", category: "اتاق خواب" },
  { title: "چراغ و آباژور", href: "/shop", category: "نورپردازی" }, { title: "دکور و تزئینی", href: "/shop", category: "دکوراسیون" },
];

export default function Navbar() {
  const { itemCount, openDrawer } = useCart(); const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false); const [query, setQuery] = useState(""); const inputRef = useRef<HTMLInputElement>(null);
  const results = query.trim() ? SEARCHABLE.filter((p) => `${p.title} ${p.category}`.includes(query.trim())) : [];
  useEffect(() => { if (searchOpen) setTimeout(() => inputRef.current?.focus(), 50); else setQuery(""); }, [searchOpen]);
  useEffect(() => { const handler = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false); window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler); }, []);
  return <header className="w-full bg-[#FCFAF6] border-b border-[#062A43]/10">
    <div className="hidden md:flex h-10 px-8 lg:px-12 bg-[#031C2E] text-[#FCFAF6] items-center justify-between text-xs"><div className="flex items-center gap-5"><span className="flex items-center gap-2"><Phone size={13}/>۰۲۱-۱۳۳۴۵۶۷۸</span><span className="h-4 w-px bg-white/30"/><span className="flex items-center gap-2"><Mail size={13}/>info@toranj.ir</span></div><span className="text-[#D9AE62]">هنر، اصالت، کیفیت ✦</span></div>
    <nav className="h-[88px] px-5 md:px-8 lg:px-12 flex items-center justify-between gap-5">
      <Link href="/" className="shrink-0 order-1" aria-label="ترنج"><img src="/toranj-logo.svg" alt="ترنج" className="w-[190px] md:w-[215px] h-auto object-contain"/></Link>
      <div className="hidden lg:flex items-center gap-8 order-2 text-[15px] font-bold text-[#0B2942]"><Link href="/" className="text-[#B88A3A] border-b-2 border-[#B88A3A] py-8">صفحه اصلی</Link><Link href="/shop" className="hover:text-[#B88A3A]">فروشگاه</Link><button className="flex items-center gap-1 hover:text-[#B88A3A]">دسته‌بندی‌ها <ChevronDown size={16}/></button><Link href="/about" className="hover:text-[#B88A3A]">درباره ما</Link><Link href="/contact" className="hover:text-[#B88A3A]">تماس با ما</Link></div>
      <div className="flex items-center gap-1 md:gap-2 order-3"><button onClick={()=>setSearchOpen(true)} className="hidden sm:flex items-center gap-2 w-44 lg:w-56 h-11 px-4 rounded-full border border-[#062A43]/15 bg-[#F7F3EC] text-[#6F6A62] text-xs hover:border-[#B88A3A]"><Search size={18}/><span>جستجو در محصولات...</span></button><button onClick={()=>setSearchOpen(true)} className="sm:hidden p-3"><Search size={20}/></button><Link href="/account" className="p-3 hover:text-[#B88A3A]"><UserRound size={21}/></Link><button onClick={openDrawer} className="p-3 relative hover:text-[#B88A3A]"><ShoppingCart size={22}/>{itemCount>0&&<span className="absolute top-1 right-0 w-5 h-5 rounded-full bg-[#B88A3A] text-white text-[10px] flex items-center justify-center">{itemCount}</span>}</button></div>
    </nav><CartDrawer/>
    <AnimatePresence>{searchOpen&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-[#031C2E]/60 backdrop-blur-sm flex items-start justify-center pt-28 px-4" onClick={()=>setSearchOpen(false)}><motion.div initial={{opacity:0,y:-15}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-15}} className="w-full max-w-xl bg-[#FCFAF6] rounded-3xl shadow-2xl overflow-hidden" onClick={e=>e.stopPropagation()}><form onSubmit={e=>{e.preventDefault();if(results[0]){setSearchOpen(false);router.push(results[0].href)}}} className="flex items-center gap-3 px-5 py-4 border-b border-[#062A43]/10"><Search size={20} className="text-[#B88A3A]"/><input ref={inputRef} value={query} onChange={e=>setQuery(e.target.value)} placeholder="جستجو در محصولات و دسته‌بندی‌ها..." className="flex-1 outline-none bg-transparent"/><button type="button" onClick={()=>setSearchOpen(false)}><X size={19}/></button></form>{query?<div className="p-3">{results.length?results.map(item=><button key={item.title} onClick={()=>{setSearchOpen(false);router.push(item.href)}} className="w-full text-right p-4 rounded-xl hover:bg-[#F7F3EC]"><p className="font-bold">{item.title}</p><p className="text-xs text-[#6F6A62] mt-1">{item.category}</p></button>):<p className="text-center text-[#6F6A62] p-6">محصولی پیدا نشد.</p>}</div>:<div className="p-5 text-sm text-[#6F6A62]">محبوب‌ترین‌ها: مبل کلاسیک، میز و جلو مبلی، آینه و کنسول</div>}</motion.div></motion.div>}</AnimatePresence>
  </header>;
}
