'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ScrollTrigger, FireworksCanvas, ConfettiExplosion } from '@/components/animations-v2';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import type { RSVPData } from '@/types/v2/template';

const rsvpSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().optional(),
  attending: z.enum(['yes', 'no', 'maybe']),
  guestCount: z.number().min(1).max(10),
  mealPreference: z.enum(['veg', 'non-veg', 'vegan', 'jain']).optional(),
  message: z.string().optional(),
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

interface RoyalRSVPProps {
  invitationId: string;
}

export function RoyalRSVP({ invitationId }: RoyalRSVPProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attending: 'yes',
      guestCount: 1,
    },
  });

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          invitationId,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit RSVP');

      // Success!
      toast.success('RSVP submitted successfully!');
      setIsSuccess(true);
      setShowCelebration(true);
      reset();

      // Hide celebration after 5 seconds
      setTimeout(() => setShowCelebration(false), 5000);
    } catch (error) {
      console.error('RSVP submission error:', error);
      toast.error('Failed to submit RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <ScrollTrigger animation="fade-up">
          <h2 className="mb-4 text-center font-serif text-4xl font-bold text-white md:text-5xl">
            Join Our Celebration
          </h2>
        </ScrollTrigger>

        <ScrollTrigger animation="fade-up" delay={0.2}>
          <p className="mb-12 text-center text-xl text-white/80">
            We would be honored by your presence
          </p>
        </ScrollTrigger>

        <ScrollTrigger animation="scale" delay={0.4}>
          <div className="rounded-lg bg-white p-8 shadow-2xl">
            {isSuccess ? (
              <div className="py-12 text-center">
                <div className="mb-4 text-6xl">🎉</div>
                <h3 className="mb-2 text-2xl font-bold text-purple-900">
                  Thank You!
                </h3>
                <p className="text-gray-600">
                  We've received your RSVP and can't wait to celebrate with you!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <Input
                    {...register('name')}
                    placeholder="Enter your name"
                    className="w-full"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <Input
                    {...register('phone')}
                    type="tel"
                    placeholder="+91 1234567890"
                    className="w-full"
                  />
                </div>

                {/* Attending */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Will you attend? *
                  </label>
                  <div className="flex gap-4">
                    {['yes', 'no', 'maybe'].map((option) => (
                      <label key={option} className="flex items-center gap-2">
                        <input
                          {...register('attending')}
                          type="radio"
                          value={option}
                          className="h-4 w-4 text-purple-600"
                        />
                        <span className="capitalize">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Guest Count */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Number of Guests *
                  </label>
                  <Input
                    {...register('guestCount', { valueAsNumber: true })}
                    type="number"
                    min="1"
                    max="10"
                    className="w-full"
                  />
                </div>

                {/* Meal Preference */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Meal Preference
                  </label>
                  <select
                    {...register('mealPreference')}
                    className="w-full rounded-md border border-gray-300 px-4 py-2"
                  >
                    <option value="">Select preference</option>
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="jain">Jain</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Message for the Couple
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="Share your wishes..."
                    className="w-full rounded-md border border-gray-300 px-4 py-2"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full border border-amber-200/30 bg-amber-200/10 py-6 text-lg text-amber-200 hover:bg-amber-200/20"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                </Button>
              </form>
            )}
          </div>
        </ScrollTrigger>
      </div>

      {/* Celebration Effects */}
      <FireworksCanvas
        trigger={showCelebration}
        color={['#D4AF37', '#FF6B9D', '#5D1A8B']}
        intensity="high"
        duration={5000}
      />
      <ConfettiExplosion
        trigger={showCelebration}
        colors={['#D4AF37', '#FF6B9D', '#5D1A8B', '#4ECDC4']}
        particleCount={200}
      />
    </section>
  );
}
