'use client';
import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

const columns = [
  { label: 'دسترسی سریع', links: [{title:'صفحه اصلی',href:'/'},{title:'فروشگاه',href:'/shop'},{title:'درباره ما',href:'/about'}] },
  { label: 'راهنما', links: [{title:'تماس با ما',href:'/contact'},{title:'حریم خصوصی',href:'/privacy'},{title:'قوانین و مقررات',href:'/terms'}] },
];

export function Footer() {
  return <footer className="bg-[#031C2E] text-[#FCFAF6] mt-0">
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10 pb-10">
        <AnimatedContainer><img src="/toranj-logo.svg" alt="ترنج" className="w-52 h-auto mb-5 brightness-0 invert"/><p className="text-white/60 text-sm leading-7">ترنج؛ تلفیق هنر اصیل ایرانی با طراحی ماندگار برای خانه‌ای که دوستش دارید.</p></AnimatedContainer>
        {columns.map((col,i)=><AnimatedContainer key={col.label} delay={.1+i*.1}><h3 className="font-bold text-[#D9AE62] mb-5">{col.label}</h3><ul className="space-y-3 text-sm text-white/65">{col.links.map(l=><li key={l.title}><Link href={l.href} className="hover:text-[#D9AE62] transition-colors">{l.title}</Link></li>)}</ul></AnimatedContainer>)}
        <AnimatedContainer><h3 className="font-bold text-[#D9AE62] mb-5">با ما در ارتباط باشید</h3><div className="space-y-4 text-sm text-white/65"><p className="flex gap-2 items-center"><Phone size={16}/>۰۲۱-۱۳۳۴۵۶۷۸</p><p className="flex gap-2 items-center"><Mail size={16}/>info@toranj.ir</p><p className="flex gap-2 items-center"><MapPin size={16}/>تهران، ایران</p></div><div className="flex gap-3 mt-5"><span className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center"><Instagram size={17}/></span></div></AnimatedContainer>
      </div>
      <div className="pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/40"><span>© {new Date().getFullYear()} ترنج. تمامی حقوق محفوظ است.</span><span>ساخته شده با عشق برای خانه‌های ایرانی</span></div>
    </div>
  </footer>;
}

function AnimatedContainer({children,delay=0,className}:{children:React.ReactNode;delay?:number;className?:string}){
 const reduce=useReducedMotion(); if(reduce)return <div className={className}>{children}</div>;
 return <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay,duration:.5}} className={className}>{children}</motion.div>;
}
