"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, RefreshCw, Upload, Box } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

type Product={id:string;name:string;price:number;original_price:number|null;image:string|null;tag:string|null;rating:number;reviews:string;has_3d:boolean;model_url?:string|null};
const empty={name:"",price:"",original_price:"",tag:"",rating:"5",reviews:"0",has_3d:false,image:null as File|null,model:null as File|null};

export default function ProductsAdmin(){
  const[supabase]=useState(()=>createClient());
  const[products,setProducts]=useState<Product[]>([]);
  const[form,setForm]=useState(empty);
  const[loading,setLoading]=useState(false);
  const[uploading,setUploading]=useState(false);
  const[error,setError]=useState("");

  async function load(){
    setLoading(true); setError("");
    try{
      const{data,error}=await supabase.from("products").select("*").order("created_at",{ascending:false});
      if(error) throw error;
      setProducts((data??[]) as Product[]);
    }catch(e:any){setError(e?.message||"دریافت محصولات ناموفق بود.");}
    finally{setLoading(false);}
  }
  useEffect(()=>{load()},[]);

  async function uploadFile(file:File,kind:"image"|"model"){
    const fd=new FormData(); fd.append("file",file); fd.append("kind",kind);
    const r=await fetch("/api/admin/upload",{method:"POST",body:fd});
    const d=await r.json().catch(()=>({}));
    if(!r.ok) throw new Error(d.error||"آپلود فایل ناموفق بود.");
    return d.url as string;
  }

  async function add(e:React.FormEvent){
    e.preventDefault(); setError("");
    const price=Number(form.price);
    if(!form.name.trim()||!Number.isFinite(price)||price<0){setError("نام و قیمت معتبر وارد کنید.");return}
    if(!form.image){setError("لطفاً تصویر محصول را انتخاب کنید.");return}
    if(form.has_3d&&!form.model){setError("برای محصول سه‌بعدی باید فایل GLB را انتخاب کنید.");return}

    setUploading(true);
    try{
      const imageUrl=await uploadFile(form.image,"image");
      const modelUrl=form.has_3d&&form.model?await uploadFile(form.model,"model"):null;
      const r=await fetch("/api/admin/products",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          name:form.name.trim(),price,
          original_price:form.original_price?Number(form.original_price):null,
          image:imageUrl,model_url:modelUrl,tag:form.tag.trim()||null,
          rating:Number(form.rating)||5,reviews:form.reviews.trim()||"0",has_3d:form.has_3d
        })
      });
      const d=await r.json().catch(()=>({}));
      if(!r.ok) throw new Error(d.error||"افزودن محصول ناموفق بود.");
      setForm(empty); await load();
    }catch(e:any){setError(e?.message||"افزودن محصول ناموفق بود.");}
    finally{setUploading(false);}
  }

  async function remove(id:string){
    if(!confirm("این محصول حذف شود؟"))return;
    setError("");
    try{
      const r=await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`,{method:"DELETE"});
      const d=await r.json().catch(()=>({}));
      if(!r.ok) throw new Error(d.error||"حذف محصول ناموفق بود.");
      setProducts(p=>p.filter(x=>x.id!==id));
    }catch(e:any){setError(e?.message||"حذف محصول ناموفق بود.");}
  }

  return <>
    <div className="flex justify-between items-end mb-7"><div><p className="text-[#B88A3A] font-bold">فروشگاه</p><h2 className="text-4xl font-black">محصولات</h2></div><button onClick={load} disabled={loading} className="rounded-full border border-[#062A43]/10 px-4 py-2 flex gap-2 disabled:opacity-50"><RefreshCw size={17}/> بروزرسانی</button></div>
    <div className="grid lg:grid-cols-[380px_1fr] gap-6">
      <form onSubmit={add} className="bg-[#FCFAF6] border border-[#B88A3A]/20 rounded-3xl p-6 h-fit space-y-4">
        <h3 className="text-xl font-black flex gap-2"><Plus/> افزودن محصول</h3>
        <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="نام محصول" className="w-full rounded-xl bg-[#F7F3EC] border border-[#062A43]/10 px-4 py-3"/>
        <input required type="number" min="0" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="قیمت" className="w-full rounded-xl bg-[#F7F3EC] border border-[#062A43]/10 px-4 py-3"/>
        <input type="number" min="0" value={form.original_price} onChange={e=>setForm({...form,original_price:e.target.value})} placeholder="قیمت قبلی (اختیاری)" className="w-full rounded-xl bg-[#F7F3EC] border border-[#062A43]/10 px-4 py-3"/>
        <label className="block"><span className="text-sm font-bold">تصویر محصول</span><div className="mt-2 border-2 border-dashed border-[#B88A3A]/40 rounded-2xl p-4 hover:bg-[#F7F3EC] cursor-pointer"><input required type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={e=>setForm({...form,image:e.target.files?.[0]??null})} className="w-full text-sm"/><p className="text-xs text-[#6F6A62] mt-2 flex gap-1 items-center"><Upload size={14}/> JPG / PNG / WEBP / AVIF — حداکثر ۸MB</p></div></label>
        <label className="flex gap-2 items-center font-bold"><input type="checkbox" checked={form.has_3d} onChange={e=>setForm({...form,has_3d:e.target.checked,model:e.target.checked?form.model:null})}/> <Box size={17}/> این محصول مدل سه‌بعدی دارد</label>
        {form.has_3d&&<label className="block"><span className="text-sm font-bold">فایل مدل سه‌بعدی</span><div className="mt-2 border-2 border-dashed border-[#B88A3A]/40 rounded-2xl p-4"><input required type="file" accept=".glb,model/gltf-binary" onChange={e=>setForm({...form,model:e.target.files?.[0]??null})} className="w-full text-sm"/><p className="text-xs text-[#6F6A62] mt-2">فقط GLB — حداکثر ۴۰MB</p></div></label>}
        <input value={form.tag} onChange={e=>setForm({...form,tag:e.target.value})} placeholder="برچسب" className="w-full rounded-xl bg-[#F7F3EC] border border-[#062A43]/10 px-4 py-3"/>
        <div className="grid grid-cols-2 gap-3"><input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={e=>setForm({...form,rating:e.target.value})} placeholder="امتیاز" className="w-full rounded-xl bg-[#F7F3EC] border border-[#062A43]/10 px-4 py-3"/><input value={form.reviews} onChange={e=>setForm({...form,reviews:e.target.value})} placeholder="تعداد نظر" className="w-full rounded-xl bg-[#F7F3EC] border border-[#062A43]/10 px-4 py-3"/></div>
        {error&&<p className="text-red-700 text-sm bg-red-50 rounded-xl p-3 break-words">{error}</p>}
        <button disabled={loading||uploading} className="w-full rounded-full bg-[#062A43] text-[#D9AE62] py-3 font-bold disabled:opacity-60">{uploading?"در حال آپلود فایل‌ها…":loading?"در حال پردازش…":"افزودن محصول"}</button>
      </form>
      <div className="space-y-3">{products.map(p=><div key={p.id} className="bg-[#FCFAF6] border border-[#B88A3A]/20 rounded-2xl p-4 flex items-center gap-4">{p.image?<img src={p.image} className="w-20 h-20 rounded-xl object-cover"/>:<div className="w-20 h-20 rounded-xl bg-[#F7F3EC]"/>}<div className="flex-1"><h3 className="font-black">{p.name}</h3><p className="text-[#B88A3A] font-bold">{p.price.toLocaleString("fa-IR")}</p><p className="text-xs text-[#6F6A62]">{p.tag||"بدون برچسب"} {p.has_3d&&" • مدل سه‌بعدی"}</p></div><button onClick={()=>remove(p.id)} className="p-3 rounded-full hover:bg-red-50 text-red-700"><Trash2 size={18}/></button></div>)}{!products.length&&!loading&&<div className="bg-[#FCFAF6] rounded-3xl p-10 text-center text-[#6F6A62]">محصولی ثبت نشده است.</div>}</div>
    </div>
  </>
}
