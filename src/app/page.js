
"use client"
import Head from 'next/head';
import Home from './Home/page';
import { useAgencyInfo } from './context/agency';

export default function () {
  const [agency] = useAgencyInfo()
  console.log("agencyagencyagency", agency)
  return (
    <>
      <Home />
    </>
  );
}
