'use client';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260510_060007_60275ce7-030c-4668-a160-8f364ec537d3.mp4';

export default function HeroVideo() {
  return (
    <video
      className="hero__bg"
      src={VIDEO_URL}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  );
}
