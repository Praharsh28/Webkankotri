'use client';

import { ScrollTrigger, CountdownTimer } from '@/components/animations-v2';
import { Calendar, Clock, MapPin } from 'lucide-react';
import type { WeddingEvent } from '@/types/v2/template';

interface RoyalEventsProps {
  events: WeddingEvent[];
  weddingDate: Date;
}

export function RoyalEvents({ events, weddingDate }: RoyalEventsProps) {
  return (
    <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 px-4 text-white">
      <div className="container mx-auto max-w-6xl">
        <ScrollTrigger animation="fade-up">
          <h2 className="mb-4 text-center font-serif text-4xl font-bold md:text-5xl">
            Wedding Events
          </h2>
        </ScrollTrigger>

        <ScrollTrigger animation="fade-up" delay={0.2}>
          <p className="mb-12 text-center text-xl text-white/80">
            Join us in celebrating our special day
          </p>
        </ScrollTrigger>

        {/* Countdown */}
        <ScrollTrigger animation="scale" delay={0.4}>
          <div className="mb-16">
            <CountdownTimer
              targetDate={weddingDate}
              style="elegant"
              size="large"
              className="text-white"
            />
          </div>
        </ScrollTrigger>

        {/* Events Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {events.map((event, index) => (
            <ScrollTrigger
              key={event.id}
              animation="fade-up"
              delay={0.2 * (index + 1)}
            >
              <div className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-amber-200/30">
                <h3 className="mb-6 font-serif text-2xl font-light text-amber-200">
                  {event.name}
                </h3>

                <div className="space-y-3 text-sm text-white/70">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-amber-200/60" />
                    <span>
                      {event.date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-amber-200/60" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-amber-200/60" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                {event.description && (
                  <p className="mt-4 text-white/80">{event.description}</p>
                )}

                {event.dresscode && (
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="text-xs text-white/50">
                      <span className="font-medium">Dress Code:</span> {event.dresscode}
                    </p>
                  </div>
                )}
              </div>
            </ScrollTrigger>
          ))}
        </div>
      </div>
    </section>
  );
}
