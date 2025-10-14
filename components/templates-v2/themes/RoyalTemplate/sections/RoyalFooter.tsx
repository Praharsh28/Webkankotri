'use client';

import { Heart, Mail, Phone, MessageCircle } from 'lucide-react';

interface RoyalFooterProps {
  groomName: string;
  brideName: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
}

export function RoyalFooter({
  groomName,
  brideName,
  email,
  phone,
  whatsapp,
}: RoyalFooterProps) {
  return (
    <footer className="border-t border-white/10 bg-black py-12 px-4 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <Heart className="mx-auto mb-4 h-8 w-8 text-amber-200/40" />
          <p className="font-serif text-xl font-light text-white/70">
            {groomName} & {brideName}
          </p>
        </div>

        {/* Contact Info */}
        {(email || phone || whatsapp) && (
          <div className="mb-8 flex flex-wrap justify-center gap-6">
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
              >
                <Mail className="h-5 w-5" />
                <span className="text-sm">{email}</span>
              </a>
            )}

            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
              >
                <Phone className="h-5 w-5" />
                <span className="text-sm">{phone}</span>
              </a>
            )}

            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm">WhatsApp</span>
              </a>
            )}
          </div>
        )}

        <div className="border-t border-white/20 pt-6">
          <p className="text-sm text-white/60">
            Made with <Heart className="inline h-4 w-4 text-red-400" /> using WebKankotri
          </p>
        </div>
      </div>
    </footer>
  );
}
