/* This file is created automatically at build time, there is no need to commit it */
import React from 'react';
import dynamic from 'next/dynamic';

const Card = dynamic(() => import('./components/Card.dynamic.jsx'), { suspense: true });
const Description = dynamic(() => import('./components/Description.dynamic.jsx'), { suspense: true });
const Footer = dynamic(() => import('./components/Footer.dynamic.jsx'), { suspense: true });
const Header = dynamic(() => import('./components/Header.dynamic.jsx'), { suspense: true });
const Layout = dynamic(() => import('./components/Layout.dynamic.jsx'), { suspense: true });

export default function DynamicComponent ({ type, props }) {
switch (type) {
  case 'Card':
    return <React.Suspense fallback={null}><Card {...props} /></React.Suspense>
  case 'Description':
    return <React.Suspense fallback={null}><Description {...props} /></React.Suspense>
  case 'Footer':
    return <React.Suspense fallback={null}><Footer {...props} /></React.Suspense>
  case 'Header':
    return <React.Suspense fallback={null}><Header {...props} /></React.Suspense>
  case 'Layout':
    return <React.Suspense fallback={null}><Layout {...props} /></React.Suspense>
  default:
    return <div data-component-name={type}/>
  }
}
