import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = createClient(await cookies());
  const [{ count: products }, { count: orders }, { count: users }] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("orders").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }),
  ]);
  return <>
    <div className="mb-7"><p className="text-[#B88A3A] font-bold">مدیریت فروشگاه</p><h2 className="text-4xl font-black mt-1">داشبورد</h2></div>
    <div className="grid sm:grid-cols-3 gap-5">
      <Stat title="محصولات" value={products ?? 0} href="/admin/products" />
      <Stat title="سفارش‌ها" value={orders ?? 0} href="/admin/orders" />
      <Stat title="کاربران" value={users ?? 0} href="/admin/users" />
    </div>
    <div className="mt-7 grid md:grid-cols-2 gap-5">
      <Link href="/admin/products" className="bg-[#FCFAF6] border border-[#B88A3A]/20 rounded-3xl p-7 hover:shadow-lg transition-shadow"><h3 className="text-xl font-black">مدیریت محصولات</h3><p className="text-[#6F6A62] mt-2">افزودن، ویرایش و حذف محصولات فروشگاه.</p></Link>
      <Link href="/admin/orders" className="bg-[#FCFAF6] border border-[#B88A3A]/20 rounded-3xl p-7 hover:shadow-lg transition-shadow"><h3 className="text-xl font-black">مدیریت سفارش‌ها</h3><p className="text-[#6F6A62] mt-2">مشاهده خریدار، اقلام سفارش و وضعیت ارسال.</p></Link>
    </div>
  </>;
}
function Stat({title,value,href}:{title:string;value:number;href:string}){return <Link href={href} className="bg-[#FCFAF6] rounded-3xl border border-[#B88A3A]/20 p-6 hover:-translate-y-1 transition-transform"><p className="text-[#6F6A62]">{title}</p><p className="text-4xl font-black text-[#062A43] mt-3">{value}</p></Link>}
