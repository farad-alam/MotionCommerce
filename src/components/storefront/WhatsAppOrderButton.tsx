"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppOrderButtonProps {
  product: {
    name: string;
    price: number;
    slug: string;
  };
  whatsappNumber: string;   // E.164 without +, e.g. "8801712345678"
  template: string;         // Supports {{items}}, {{total}}, {{name}} tokens
  quantity?: number;
  variantName?: string;
  className?: string;
}

export function WhatsAppOrderButton({
  product,
  whatsappNumber,
  template,
  quantity = 1,
  variantName,
  className = "",
}: WhatsAppOrderButtonProps) {
  const handleWhatsAppOrder = () => {
    const itemLine = variantName
      ? `• ${product.name} (${variantName}) × ${quantity} = ৳${(product.price * quantity).toLocaleString()}`
      : `• ${product.name} × ${quantity} = ৳${(product.price * quantity).toLocaleString()}`;

    const total = `৳${(product.price * quantity).toLocaleString()}`;

    const message = template
      .replace("{{items}}", itemLine)
      .replace("{{total}}", total)
      .replace("{{name}}", product.name);

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleWhatsAppOrder}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm bg-[#25D366] hover:bg-[#20c55a] active:scale-95 text-white shadow-sm transition-all ${className}`}
    >
      <MessageCircle className="w-4 h-4" />
      Order via WhatsApp
    </button>
  );
}
