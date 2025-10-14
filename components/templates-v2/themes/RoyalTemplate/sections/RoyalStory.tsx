'use client';

import { ScrollTrigger, StaggerChildren } from '@/components/animations-v2';
import type { TimelineEntry } from '@/types/v2/template';

interface RoyalStoryProps {
  howWeMet: string;
  proposal: string;
  timeline: TimelineEntry[];
}

export function RoyalStory({ howWeMet, proposal, timeline }: RoyalStoryProps) {
  return (
    <section className="bg-neutral-50 py-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <ScrollTrigger animation="fade">
          <div className="mb-20 text-center">
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-neutral-400">
              Chapter One
            </p>
            <h2 className="font-serif text-5xl font-light tracking-wide text-neutral-900 md:text-6xl">
              Our Love Story
            </h2>
            <div className="mx-auto mt-8 h-px w-16 bg-amber-600/30" />
          </div>
        </ScrollTrigger>

        <div className="space-y-16">
          {/* How We Met */}
          <ScrollTrigger animation="fade" delay={0.2}>
            <div className="mb-24">
              <p className="mb-6 text-xs uppercase tracking-[0.3em] text-neutral-400">
                How It Began
              </p>
              <p className="font-light leading-loose text-neutral-600 md:text-lg">
                {howWeMet}
              </p>
            </div>
          </ScrollTrigger>

          {/* Timeline - Refined luxury */}
          {timeline.length > 0 && (
            <div className="mb-24">
              <ScrollTrigger animation="fade" delay={0.4}>
                <p className="mb-12 text-center text-xs uppercase tracking-[0.3em] text-neutral-400">
                  Our Journey
                </p>
              </ScrollTrigger>

              <div className="space-y-16">
                {timeline.map((entry, index) => (
                  <ScrollTrigger key={index} animation="fade" delay={0.1 * index}>
                    <div className="border-l border-amber-600/20 pl-8">
                      <p className="mb-2 text-xs tracking-wide text-neutral-400">
                        {entry.date.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </p>
                      <h4 className="mb-3 font-serif text-2xl font-light text-neutral-900">
                        {entry.title}
                      </h4>
                      <p className="font-light leading-relaxed text-neutral-600">
                        {entry.description}
                      </p>
                      {entry.photo && (
                        <div className="mt-6 border border-neutral-200 p-2">
                          <img
                            src={entry.photo}
                            alt={entry.title}
                            className="h-64 w-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </ScrollTrigger>
                ))}
              </div>
            </div>
          )}

          {/* Proposal - Highlighted */}
          <ScrollTrigger animation="fade" delay={0.6}>
            <div className="border-t border-b border-neutral-200 py-16">
              <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-neutral-400">
                The Proposal
              </p>
              <p className="mx-auto max-w-3xl text-center font-light leading-loose text-neutral-700 md:text-lg">
                {proposal}
              </p>
            </div>
          </ScrollTrigger>
        </div>
      </div>
    </section>
  );
}
