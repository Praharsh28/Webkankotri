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
    <section className="bg-gradient-to-br from-purple-900 to-purple-700 py-20 px-4 text-white">
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
              <div className="rounded-lg bg-white/10 p-8 backdrop-blur-sm transition-transform hover:scale-105">
                <h3 className="mb-4 font-serif text-3xl font-bold text-gold-400">
                  {event.name}
                </h3>

                <div className="space-y-3 text-white/90">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gold-400" />
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
                    <Clock className="h-5 w-5 text-gold-400" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gold-400" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                {event.description && (
                  <p className="mt-4 text-white/80">{event.description}</p>
                )}

                {event.dresscode && (
                  <div className="mt-4 rounded-lg bg-gold-500/20 p-3">
                    <p className="text-sm">
                      <span className="font-bold">Dress Code:</span> {event.dresscode}
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
