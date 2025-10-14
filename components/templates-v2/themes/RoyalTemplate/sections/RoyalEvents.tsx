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
    <section className="bg-neutral-900 py-32 px-6 text-white">
      <div className="container mx-auto max-w-6xl">
        <ScrollTrigger animation="fade">
          <div className="mb-20 text-center">
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-white/30">
              Schedule of Events
            </p>
            <h2 className="font-serif text-5xl font-light tracking-wide md:text-6xl">
              Wedding Events
            </h2>
            <div className="mx-auto mt-8 h-px w-16 bg-amber-600/30" />
          </div>
        </ScrollTrigger>

        {/* Countdown - Refined */}
        <ScrollTrigger animation="fade" delay={0.3}>
          <div className="mb-24">
            <CountdownTimer
              targetDate={weddingDate}
              style="minimal"
              size="medium"
              labels={{
                days: 'Days',
                hours: 'Hours',
                minutes: 'Minutes',
                seconds: 'Seconds',
              }}
              showSeconds={false}
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
              <div className="border-l-2 border-amber-600/20 bg-white/5 p-8 transition-all hover:border-amber-600/40 hover:bg-white/10">
                <h3 className="mb-6 font-serif text-3xl font-light tracking-wide text-amber-400/90">
                  {event.name}
                </h3>

                <div className="space-y-3 text-sm font-light text-white/60">
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600/50" />
                    <span className="leading-relaxed">
                      {event.date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600/50" />
                    <span className="leading-relaxed">{event.time}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600/50" />
                    <span className="leading-relaxed">{event.venue}</span>
                  </div>
                </div>

                {event.description && (
                  <p className="mt-6 font-light leading-relaxed text-white/70">{event.description}</p>
                )}

                {event.dresscode && (
                  <div className="mt-6 border-t border-white/5 pt-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                      Dress Code
                    </p>
                    <p className="mt-2 font-light text-white/60">{event.dresscode}</p>
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
