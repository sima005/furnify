import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/account?next=/admin");

  const creator = process.env.FURNIFY_CREATOR_EMAIL?.trim().toLowerCase();
  const email = user.email?.toLowerCase();
  if (!creator || email !== creator) redirect("/");

  return <div className="min-h-screen bg-[#F7F3EC] text-[#0B2942]" dir="rtl">
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-[#031C2E] rounded-[2rem] p-5 md:p-6 text-[#FCFAF6] flex flex-wrap gap-3 items-center justify-between mb-7">
        <div><p className="text-[#D9AE62] text-xs font-bold">TORANJ / FURNIFY</p><h1 className="text-2xl font-black">پنل مدیریت</h1></div>
        <nav className="flex flex-wrap gap-2 text-sm font-bold">
          <Link className="px-4 py-2 rounded-full hover:bg-white/10" href="/admin">داشبورد</Link>
          <Link className="px-4 py-2 rounded-full hover:bg-white/10" href="/admin/products">محصولات</Link>
          <Link className="px-4 py-2 rounded-full hover:bg-white/10" href="/admin/orders">سفارش‌ها</Link>
          <Link className="px-4 py-2 rounded-full hover:bg-white/10" href="/admin/users">کاربران</Link>
        </nav>
      </div>{children}
    </div>
  </div>;
}
