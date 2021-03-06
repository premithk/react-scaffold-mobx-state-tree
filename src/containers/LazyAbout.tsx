import * as React from "react";
import Loading from '../components/Loading';
const Loadable = require('react-loadable');

export const LazyAbout = Loadable({
  loader: () => import(/* webpackChunkName: 'about' */ './AboutPage'),
  loading: Loading,
  timeout: 10000,
  delay: 150
});