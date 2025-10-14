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
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <ScrollTrigger animation="fade-up">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-purple-900 md:text-5xl">
            Our Love Story
          </h2>
        </ScrollTrigger>

        <div className="space-y-16">
          {/* How We Met */}
          <ScrollTrigger animation="fade-up">
            <div className="rounded-lg bg-purple-50 p-8">
              <h3 className="mb-4 font-serif text-2xl font-bold text-purple-900">
                How We Met
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                {howWeMet}
              </p>
            </div>
          </ScrollTrigger>

          {/* Timeline */}
          {timeline.length > 0 && (
            <div>
              <ScrollTrigger animation="fade-up">
                <h3 className="mb-8 text-center font-serif text-3xl font-bold text-purple-900">
                  Our Journey
                </h3>
              </ScrollTrigger>

              <StaggerChildren staggerDelay={0.2} animation="fade-left">
                {timeline.map((entry, index) => (
                  <div key={index} className="mb-8 flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                        {index + 1}
                      </div>
                      {index < timeline.length - 1 && (
                        <div className="my-2 h-full w-1 bg-purple-300" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <p className="mb-2 text-sm text-purple-600">
                        {entry.date.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </p>
                      <h4 className="mb-2 font-serif text-xl font-bold text-purple-900">
                        {entry.title}
                      </h4>
                      <p className="text-gray-700">{entry.description}</p>
                      {entry.photo && (
                        <img
                          src={entry.photo}
                          alt={entry.title}
                          className="mt-4 h-48 w-full rounded-lg object-cover"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </StaggerChildren>
            </div>
          )}

          {/* Proposal */}
          <ScrollTrigger animation="fade-up">
            <div className="rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 p-8 text-white">
              <h3 className="mb-4 font-serif text-2xl font-bold">
                The Proposal
              </h3>
              <p className="text-lg leading-relaxed">
                {proposal}
              </p>
            </div>
          </ScrollTrigger>
        </div>
      </div>
    </section>
  );
}
