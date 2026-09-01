"use client";

import { FormEvent, useEffect, useState } from "react";
import { LogIn, LogOut, UserRound, Mail, ShieldCheck, ShoppingBag } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function AccountPage() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) {
        setUser(data.user ?? null);
        setProfileName(data.user?.user_metadata?.full_name ?? "");
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const next = session?.user ?? null;
      setUser(next);
      setProfileName(next?.user_metadata?.full_name ?? "");
    });
    return () => { mounted = false; listener.subscription.unsubscribe(); };
  }, [supabase]);

  async function submit(e: FormEvent) {
    e.preventDefault(); setLoading(true); setError(""); setMessage("");
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { data: { full_name: name } },
      });
      if (error) setError(error.message);
      else if (data.session) setMessage("حساب شما ساخته شد و وارد شدید.");
      else setMessage("حساب ساخته شد. برای فعال‌سازی، ایمیل تأیید را بررسی کنید.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError("ایمیل یا رمز عبور صحیح نیست.");
      else setMessage("خوش آمدید 🌿");
    }
    setLoading(false);
  }

  async function saveProfile(e: FormEvent) {
    e.preventDefault(); setLoading(true); setError(""); setMessage("");
    const { data, error } = await supabase.auth.updateUser({ data: { full_name: profileName } });
    if (error) setError(error.message); else { setUser(data.user); setMessage("اطلاعات پروفایل ذخیره شد."); }
    setLoading(false);
  }

  async function signOut() { await supabase.auth.signOut(); setMessage("از حساب خارج شدید."); }

  if (!user) return <main className="min-h-[calc(100vh-130px)] bg-[#F7F3EC] px-5 py-16 flex items-center justify-center"><div className="w-full max-w-md bg-[#FCFAF6] rounded-[2rem] border border-[#B88A3A]/20 shadow-xl p-7 md:p-9"><div className="text-center mb-8"><div className="mx-auto w-16 h-16 rounded-full bg-[#062A43] text-[#D9AE62] flex items-center justify-center"><UserRound size={29}/></div><h1 className="text-3xl font-black text-[#0B2942] mt-5">حساب کاربری</h1><p className="text-[#6F6A62] mt-2">{mode === "login" ? "برای ادامه وارد حساب ترنج شوید." : "حساب خودتان را در ترنج بسازید."}</p></div><div className="grid grid-cols-2 rounded-full bg-[#F7F3EC] p-1 mb-6"><button onClick={()=>{setMode("login");setError("")}} className={`rounded-full py-2.5 text-sm font-bold ${mode==="login"?"bg-[#062A43] text-[#FCFAF6]":"text-[#6F6A62]"}`}>ورود</button><button onClick={()=>{setMode("signup");setError("")}} className={`rounded-full py-2.5 text-sm font-bold ${mode==="signup"?"bg-[#062A43] text-[#FCFAF6]":"text-[#6F6A62]"}`}>ثبت‌نام</button></div><form onSubmit={submit} className="space-y-4">{mode==="signup"&&<label className="block"><span className="text-sm font-bold">نام و نام خانوادگی</span><input required value={name} onChange={e=>setName(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#062A43]/15 bg-[#F7F3EC] px-4 py-3 outline-none focus:border-[#B88A3A]" placeholder="مثلاً سارا احمدی"/></label>}<label className="block"><span className="text-sm font-bold">ایمیل</span><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#062A43]/15 bg-[#F7F3EC] px-4 py-3 outline-none focus:border-[#B88A3A]" placeholder="you@example.com" dir="ltr"/></label><label className="block"><span className="text-sm font-bold">رمز عبور</span><input required minLength={6} type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#062A43]/15 bg-[#F7F3EC] px-4 py-3 outline-none focus:border-[#B88A3A]" placeholder="حداقل ۶ کاراکتر" dir="ltr"/></label>{error&&<p className="text-sm text-red-700 bg-red-50 rounded-xl p-3">{error}</p>}{message&&<p className="text-sm text-[#062A43] bg-[#D9AE62]/15 rounded-xl p-3">{message}</p>}<button disabled={loading} className="w-full rounded-full bg-[#062A43] hover:bg-[#031C2E] disabled:opacity-60 text-[#FCFAF6] py-3.5 font-bold flex items-center justify-center gap-2">{mode==="login"?<LogIn size={18}/>:<UserRound size={18}/>} {loading?"در حال پردازش…":mode==="login"?"ورود به حساب":"ساخت حساب"}</button></form></div></main>;

  return <main className="min-h-[calc(100vh-130px)] bg-[#F7F3EC] px-5 py-12"><div className="max-w-5xl mx-auto"><div className="bg-[#031C2E] rounded-[2rem] p-7 md:p-10 text-[#FCFAF6] flex flex-col md:flex-row items-center justify-between gap-6"><div className="flex items-center gap-5"><div className="w-16 h-16 rounded-full bg-[#D9AE62] text-[#031C2E] flex items-center justify-center"><UserRound size={29}/></div><div><p className="text-[#D9AE62] text-sm">خوش آمدید</p><h1 className="text-2xl md:text-3xl font-black">{profileName || "کاربر ترنج"}</h1><p className="text-white/60 text-sm mt-1" dir="ltr">{user.email}</p></div></div><button onClick={signOut} className="rounded-full border border-white/15 px-5 py-2.5 flex items-center gap-2 hover:bg-white/10"><LogOut size={17}/> خروج از حساب</button></div><div className="grid md:grid-cols-3 gap-5 mt-6"><Link href="/cart" className="bg-[#FCFAF6] rounded-3xl p-6 border border-[#B88A3A]/20 hover:-translate-y-1 transition-transform"><ShoppingBag className="text-[#B88A3A]"/><h2 className="font-black text-lg mt-4">سبد خرید من</h2><p className="text-[#6F6A62] text-sm mt-1">مشاهده و مدیریت سفارش‌های انتخاب‌شده</p></Link><div className="bg-[#FCFAF6] rounded-3xl p-6 border border-[#B88A3A]/20"><ShieldCheck className="text-[#B88A3A]"/><h2 className="font-black text-lg mt-4">حساب امن</h2><p className="text-[#6F6A62] text-sm mt-1">ورود امن با Supabase Authentication</p></div><Link href="/shop" className="bg-[#FCFAF6] rounded-3xl p-6 border border-[#B88A3A]/20 hover:-translate-y-1 transition-transform"><Mail className="text-[#B88A3A]"/><h2 className="font-black text-lg mt-4">فروشگاه</h2><p className="text-[#6F6A62] text-sm mt-1">ادامه خرید از مجموعه ترنج</p></Link></div><form onSubmit={saveProfile} className="mt-6 bg-[#FCFAF6] rounded-3xl border border-[#B88A3A]/20 p-7"><h2 className="text-xl font-black">اطلاعات پروفایل</h2><div className="mt-5 max-w-xl"><label className="text-sm font-bold">نام و نام خانوادگی</label><input value={profileName} onChange={e=>setProfileName(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#062A43]/15 bg-[#F7F3EC] px-4 py-3 outline-none focus:border-[#B88A3A]"/></div><div className="mt-5 flex items-center gap-3"><button disabled={loading} className="rounded-full bg-[#B88A3A] text-[#031C2E] px-6 py-3 font-bold disabled:opacity-60">ذخیره اطلاعات</button>{message&&<span className="text-sm text-[#062A43]">{message}</span>}{error&&<span className="text-sm text-red-700">{error}</span>}</div></form></div></main>;
}
