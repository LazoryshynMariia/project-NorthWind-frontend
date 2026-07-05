'use client';

import { ReactNode } from 'react';

type LoaderProviderProps = {
  children: ReactNode;
};

export default function LoaderProvider({ children }: LoaderProviderProps) {
  return children;
}