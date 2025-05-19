'use client';

import { Box, Button, Group } from '@mantine/core';
import Link from 'next/link';

interface NavbarProps {
  onCreateJob?: () => void;
}

export function Navbar({ onCreateJob }: NavbarProps) {
  return (
    <Box
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid var(--mantine-color-gray-2)',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0px 0px 10px rgba(128, 128, 128, 0.15))',
      }}
    >
      <Box
        style={{
          background: '#FFFFFF',
          borderRadius: '40px',
          padding: '10px 20px',
          boxShadow: '0 0 20px rgba(128, 128, 128, 0.15)',
          width: 'fit-content',
          maxWidth: '1000px',
        }}
      >
        <Group gap={40} align="center">
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <g clipPath="url(#clip0)">
                <path d="M26.33 4.42L26.89 22.4L41.64 12.93L26.33 4.42Z" fill="#333333"/>
                <path d="M41.53 31.76V12.86L20.4 26.47V44.34H21.11" fill="#494949"/>
                <path d="M3.19 31.04L16.72 22.36L17.22 38.85L3.19 31.04Z" fill="url(#paint0_linear)" stroke="url(#paint1_linear)" strokeWidth="0.846"/>
                <path d="M2.47 12.25V31.14L23.61 17.55V-0.34H22.89" fill="url(#paint2_linear)"/>
              </g>
              <defs>
                <linearGradient id="paint0_linear" x1="2.37" y1="30.59" x2="17.67" y2="30.59" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00AAFF"/>
                  <stop offset="1" stopColor="#8636F8"/>
                </linearGradient>
                <linearGradient id="paint1_linear" x1="10.02" y1="39.58" x2="10.02" y2="21.6" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.6"/>
                  <stop offset="0.775" stopColor="white" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="paint2_linear" x1="1.59" y1="19.08" x2="24.89" y2="17.39" gradientUnits="userSpaceOnUse">
                  <stop offset="0.0226" stopColor="#8636F8"/>
                  <stop offset="0.3484" stopColor="#F020B3"/>
                  <stop offset="0.6742" stopColor="#F8475E"/>
                  <stop offset="1" stopColor="#FF9421"/>
                </linearGradient>
                <clipPath id="clip0">
                  <rect width="44" height="44" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </Link>

          {/* Navigation Links */}
          <Group gap={32}>
            {[
              { label: 'Home', href: '/' },
              { label: 'Find Jobs', href: '/jobs' },
              { label: 'Find Talents', href: '/talents' },
              { label: 'About us', href: '/about' },
              { label: 'Testimonials', href: '/testimonials' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  textDecoration: 'none',
                  color: '#303030',
                  fontSize: '16px',
                  fontWeight: 600,
                  padding: '8px 12px',
                  borderRadius: '15px',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#303030';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {link.label}
              </Link>
            ))}
          </Group>

          {/* Create Jobs Button */}
          <Button
            onClick={onCreateJob}
            styles={(theme) => ({
              root: {
                background: 'linear-gradient(180deg, #A128FF 0%, #6100AD 100%)',
                borderRadius: '19px',
                padding: '8px 24px',
                height: '38px',
                fontSize: '16px',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(180deg, #B23FFF 0%, #7211C4 100%)',
                },
              },
            })}
          >
            Create Jobs
          </Button>
        </Group>
      </Box>
    </Box>
  );
} 