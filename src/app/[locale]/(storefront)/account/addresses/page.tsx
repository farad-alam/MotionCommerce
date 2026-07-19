import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { MapPin, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AccountAddressesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const session = await auth();
  const { locale } = await params;

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  const addresses = await prisma.address.findMany({
    where: { userId: session.user.id },
    orderBy: { isDefault: "desc" },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Saved Addresses</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4" /> Add New Address
        </button>
      </div>
      
      {addresses.length === 0 ? (
        <div className="text-center py-12 px-4 border border-dashed border-slate-300 rounded-xl bg-slate-50">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-1">No addresses saved</h3>
          <p className="text-slate-500 mb-6">Save your addresses for a faster checkout experience.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div key={address.id} className={`border rounded-xl p-5 bg-white relative ${address.isDefault ? 'border-indigo-500 ring-1 ring-indigo-500/20' : 'border-slate-200 hover:border-slate-300 transition-colors'}`}>
              {address.isDefault && (
                <span className="absolute -top-2.5 right-4 bg-indigo-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm">
                  Default
                </span>
              )}
              
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center border border-slate-100">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-slate-900">{address.label}</h3>
              </div>
              
              <div className="space-y-1 text-sm text-slate-600 mb-5">
                <p className="font-medium text-slate-900">{address.fullName}</p>
                <p>{address.phone}</p>
                <p className="pt-2">{address.address}</p>
                <p>{address.area}, {address.district}</p>
                <p>{address.division} {address.postalCode}</p>
              </div>
              
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Edit</button>
                <span className="text-slate-300">|</span>
                <button className="text-sm font-medium text-red-500 hover:text-red-600">Delete</button>
                {!address.isDefault && (
                  <>
                    <span className="text-slate-300">|</span>
                    <button className="text-sm font-medium text-slate-500 hover:text-slate-700">Set as Default</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
