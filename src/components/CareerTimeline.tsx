'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Zap, 
  Layers, 
  Cpu, 
  Database, 
  Cloud, 
  GitBranch 
} from 'lucide-react';
import { AnimatedBeamMultipleOutputDemo as ProjectShowcase } from './ProjectShowcase';
import { AnimatedBeamMultipleOutputDemo as ProjectShowcaseRight } from './ProjectShowcaseRight';

gsap.registerPlugin(ScrollTrigger);

// NextJS Icon Component
const NextJSIcon = () => (
  <svg width="24" height="24" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M119.616813,0.0688905149 C119.066276,0.118932037 117.314565,0.294077364 115.738025,0.419181169 C79.3775171,3.69690087 45.3192571,23.3131775 23.7481916,53.4631946 C11.7364614,70.2271045 4.05395894,89.2428829 1.15112414,109.384595 C0.12512219,116.415429 0,118.492153 0,128.025062 C0,137.557972 0.12512219,139.634696 1.15112414,146.665529 C8.10791789,194.730411 42.3163245,235.11392 88.7116325,250.076335 C97.0197458,252.753556 105.778299,254.580072 115.738025,255.680985 C119.616813,256.106338 136.383187,256.106338 140.261975,255.680985 C157.453763,253.779407 172.017986,249.525878 186.382014,242.194795 C188.584164,241.068861 189.00958,240.768612 188.709286,240.518404 C188.509091,240.36828 179.124927,227.782837 167.86393,212.570214 L147.393939,184.922273 L121.743891,146.965779 C107.630108,126.098464 96.0187683,109.034305 95.9186706,109.034305 C95.8185728,109.009284 95.7184751,125.873277 95.6684262,146.465363 C95.5933529,182.52028 95.5683284,183.971484 95.1178886,184.82219 C94.4672532,186.048207 93.9667644,186.548623 92.915738,187.099079 C92.114956,187.499411 91.4142717,187.574474 87.6355816,187.574474 L83.3063539,187.574474 L82.1552297,186.848872 C81.4044966,186.373477 80.8539589,185.747958 80.4785924,185.022356 L79.9530792,183.896422 L80.0031281,133.729796 L80.0782014,83.5381493 L80.8539589,82.5623397 C81.25435,82.0369037 82.1051808,81.3613431 82.7057674,81.0360732 C83.7317693,80.535658 84.1321603,80.4856165 88.4613881,80.4856165 C93.5663734,80.4856165 94.4172043,80.6857826 95.7434995,82.1369867 C96.1188661,82.5373189 110.007429,103.454675 126.623656,128.650581 C143.239883,153.846488 165.962072,188.250034 177.122972,205.139048 L197.392766,235.839522 L198.418768,235.163961 C207.502639,229.259062 217.112023,220.852086 224.719453,212.09482 C240.910264,193.504394 251.345455,170.835585 254.848876,146.665529 C255.874878,139.634696 256,137.557972 256,128.025062 C256,118.492153 255.874878,116.415429 254.848876,109.384595 C247.892082,61.3197135 213.683675,20.9362052 167.288368,5.97379012 C159.105376,3.32158945 150.396872,1.49507389 140.637341,0.394160408 C138.234995,0.143952798 121.693842,-0.131275573 119.616813,0.0688905149 Z M172.017986,77.4831252 C173.219159,78.0836234 174.195112,79.2345784 174.545455,80.435575 C174.74565,81.0861148 174.795699,94.9976579 174.74565,126.348671 L174.670577,171.336 L166.73783,159.17591 L158.780059,147.01582 L158.780059,114.313685 C158.780059,93.1711423 158.880156,81.2862808 159.030303,80.7108033 C159.430694,79.3096407 160.306549,78.2087272 161.507722,77.5581875 C162.533724,77.0327515 162.909091,76.98271 166.837928,76.98271 C170.541544,76.98271 171.19218,77.0327515 172.017986,77.4831252 Z" fill="currentColor"/>
  </svg>
);

// GreenSock Icon Component
const GreenSockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.964 31.932c-0.417-0.073-0.849-0.271-1.094-0.49-0.167-0.172-0.26-0.406-0.266-0.646 0-0.245 0.125-0.589 0.323-0.932 0.12-0.193 0.214-0.401 0.281-0.62 0.042-0.151 0.13-0.396 0.198-0.552l0.12-0.286 0.031-1.911c0.016-1.057 0.047-2.036 0.073-2.188 0.068-0.438 0.182-0.865 0.333-1.281l0.115-0.276-0.167-0.099c-0.151-0.094-0.276-0.224-0.771-0.813-0.609-0.719-1.411-1.115-2.547-1.25-0.37-0.036-0.745-0.063-1.12-0.078-1.667-0.078-2.62-0.427-3.479-1.271-0.641-0.63-0.974-1.365-1.109-2.448-0.182-1.464-0.385-2.214-0.76-2.823-0.094-0.151-0.198-0.292-0.318-0.422l-0.151-0.151-0.333 0.214c-0.182 0.12-0.438 0.271-0.563 0.339-0.417 0.229-0.813 0.484-1.193 0.76-0.932 0.677-1.948 1.526-2.505 2.083-0.25 0.25-0.38 0.359-0.438 0.349-0.38-0.057-0.089-1.703 0.531-2.943 0.792-1.599 2.125-3.073 3.667-4.068 1.266-0.818 3.313-1.943 4.26-2.339 1.682-0.703 3.859-1.464 5.349-1.87 0.313-0.089 0.505-0.167 0.635-0.255 0.292-0.203 0.578-0.302 0.906-0.307 0.276-0.005 0.302-0.010 0.568-0.188 0.313-0.203 0.406-0.214 0.719-0.104l0.203 0.073 0.25-0.172 0.25-0.167 0.359 0.005c0.276 0.005 0.401-0.005 0.521-0.057 0.151-0.068 0.156-0.078 0.198-0.328 0.094-0.542 0.104-0.813 0.047-1.141-0.073-0.432-0.083-2.109-0.010-2.438 0.078-0.354 0.13-0.427 0.396-0.557 0.396-0.193 0.693-0.25 1.375-0.25 0.833 0 1.255 0.115 1.568 0.417 0.281 0.271 0.328 0.906 0.182 2.396-0.089 0.859-0.099 1.099-0.073 1.661 0.010 0.359 0.036 0.698 0.047 0.745 0.021 0.089 0.042 0.094 0.344 0.099 0.297 0.005 0.349 0.021 0.63 0.167 0.271 0.141 0.474 0.313 0.516 0.438 0.005 0.026 0.052 0.026 0.135 0 0.161-0.047 0.302 0.005 0.417 0.146 0.068 0.089 0.109 0.104 0.266 0.104 0.214 0 0.292 0.052 0.469 0.313 0.083 0.12 0.198 0.208 0.328 0.266 0.292 0.146 0.688 0.552 0.839 0.875 0.234 0.479 0.281 1.036 0.135 1.536-0.052 0.188-0.052 0.193 0.057 0.375 0.229 0.391 0.313 0.87 0.219 1.276l-0.052 0.24 0.156 0.156c0.776 0.776 0.661 2.042-0.286 3.172-0.099 0.12-0.219 0.307-0.266 0.422-0.182 0.484-0.391 0.823-0.661 1.104l-0.276 0.281h-0.281c-0.281 0-0.677-0.094-0.917-0.219-0.099-0.052-0.104-0.052-0.083 0.010 0.063 0.229 0.219 1.161 0.271 1.677 0.083 0.792 0.057 1.943-0.052 2.438-0.078 0.365-0.214 0.719-0.396 1.047-0.104 0.167-0.109 0.203-0.089 0.406 0.031 0.286-0.036 0.766-0.151 1.083-0.141 0.37-0.193 0.542-0.224 0.729-0.026 0.161-0.026 0.161 0.089 0.161 0.151 0 0.234 0.089 0.234 0.266 0 0.078-0.068 0.5-0.151 0.932-0.229 1.214-0.245 1.349-0.245 2.526-0.005 1.214-0.005 1.203 0.271 1.385l0.62 0.401c0.531 0.354 1.104 0.646 1.703 0.875 0.87 0.344 0.99 0.432 0.99 0.724 0 0.13-0.026 0.177-0.135 0.281-0.333 0.323-0.99 0.396-2.313 0.255-0.688-0.063-1.38-0.099-2.068-0.099-1.823-0.026-2.089-0.089-2.328-0.542-0.135-0.26-0.109-0.599 0.078-1.156 0.083-0.245 0.156-0.495 0.219-0.75 0.125-0.604 0.042-1.323-0.25-2.135l-0.25-0.693c-0.245-0.703-0.38-1.99-0.234-2.281 0.026-0.057 0.073-0.068 0.198-0.063l0.156 0.016 0.13-0.271c0.099-0.214 0.208-0.354 0.505-0.651l0.38-0.38-0.021-0.245c-0.016-0.234-0.323-1.37-0.365-1.365-0.016 0-0.099 0.115-0.193 0.26-0.229 0.344-0.734 0.875-1.021 1.068-0.125 0.083-0.229 0.182-0.229 0.214-0.005 0.141-0.125 0.417-0.271 0.609-0.141 0.188-0.151 0.219-0.13 0.385 0.036 0.245-0.042 1.031-0.135 1.443-0.083 0.302-0.198 0.599-0.344 0.885-0.359 0.745-0.63 1.411-0.698 1.719-0.052 0.297-0.078 0.599-0.094 0.896-0.016 0.354-0.052 0.698-0.078 0.771-0.036 0.099-0.036 0.177-0.005 0.328 0.026 0.109 0.042 0.354 0.036 0.547-0.005 0.266 0.016 0.438 0.094 0.75 0.135 0.531 0.161 0.865 0.099 1.063-0.042 0.125-0.083 0.172-0.224 0.24-0.313 0.161-1.198 0.25-1.677 0.167zM19.229 31.505c0.182-0.052 0.339-0.208 0.339-0.349 0-0.063-0.052-0.245-0.115-0.406-0.125-0.307-0.339-1.12-0.339-1.255 0-0.068 0.005-0.073 0.109-0.016l0.115 0.063v-0.146c-0.016-0.135-0.047-0.266-0.089-0.396-0.099-0.297-0.109-0.302-0.74-0.339l-0.427-0.021-0.156 0.151c-0.083 0.089-0.161 0.182-0.224 0.292-0.068 0.135-0.094 0.339-0.052 0.385 0.010 0.016 0.115 0 0.229-0.026 0.068-0.021 0.135-0.031 0.208-0.036 0 0.005-0.115 0.099-0.26 0.198-0.625 0.469-0.844 0.755-0.844 1.12 0 0.38 0.359 0.677 0.922 0.766 0.385 0.057 1.135 0.073 1.323 0.016zM27.703 30.885c0.156-0.188 0.135-0.38-0.063-0.599-0.115-0.115-0.245-0.214-0.391-0.292s-0.292-0.167-0.438-0.26c-0.115-0.083-0.479-0.297-0.813-0.479-0.24-0.13-0.474-0.266-0.703-0.411l-0.094-0.073v-1.432c0-1.411-0.005-1.432-0.078-1.411-0.365 0.099-0.969 0.146-1.734 0.13l-0.828-0.010 0.12 0.292c0.224 0.552 0.339 1.292 0.339 2.141 0 0.318-0.021 0.432-0.099 0.656-0.042 0.109-0.078 0.219-0.115 0.328-0.016 0.047 0.042 0.083 0.255 0.146 0.156 0.047 0.385 0.094 0.516 0.109l0.24 0.026-0.026 0.24c-0.026 0.271 0.005 0.557 0.073 0.646 0.042 0.052 0.198 0.073 0.922 0.104 0.547 0.026 1.141 0.083 1.609 0.151 0.406 0.063 0.844 0.115 0.974 0.115 0.219 0.005 0.24-0.005 0.333-0.115zM19.365 28.448c0.021-0.016 0.052-0.297 0.063-0.63 0.042-0.932 0.078-1.068 0.547-2.12 0.385-0.859 0.589-1.661 0.573-2.229l-0.010-0.339-0.146 0.141c-0.302 0.302-0.094-0.172 0.266-0.594 0.271-0.323 0.365-0.5 0.406-0.786 0.021-0.115 0.063-0.172 0.24-0.307 0.672-0.51 1.156-1.156 1.474-1.948 0.073-0.188 0.26-0.828 0.417-1.422 0.292-1.099 0.448-1.573 0.589-1.776 0.052-0.078 0.073-0.094 0.063-0.042-0.083 0.313-0.109 0.443-0.177 0.849-0.042 0.255-0.12 0.755-0.172 1.104-0.099 0.714-0.203 1.172-0.344 1.526l-0.094 0.24 0.25 0.646c0.26 0.661 0.38 1.141 0.401 1.604l0.016 0.26-0.203 0.042c-0.271 0.047-0.505 0.198-0.667 0.417-0.177 0.255-0.276 0.464-0.229 0.51 0.021 0.021 0.276 0.068 0.568 0.104 0.453 0.052 0.625 0.052 1.224 0.016 0.26-0.010 0.516-0.036 0.771-0.073 0.057-0.021 0.115-0.135 0.208-0.432 0.214-0.682 0.255-0.922 0.229-1.401l-0.021-0.422 0.109-0.141c0.255-0.323 0.453-0.906 0.536-1.589 0.099-0.833-0.083-2.578-0.422-4.078-0.161-0.714-0.229-1.141-0.229-1.453v-0.276l-0.255 0.026c-0.917 0.099-2.026 0.073-2.703-0.068-0.37-0.073-1.302-0.349-1.505-0.438l-0.161-0.073-0.021 0.182c-0.016 0.099-0.031 0.198-0.052 0.302-0.031 0.109-0.021 0.135 0.172 0.323 0.24 0.245 0.313 0.37 0.313 0.536 0 0.104-0.057 0.188-0.349 0.49-0.214 0.224-0.484 0.464-0.693 0.599l-0.339 0.229-0.146 0.505c-0.521 1.849-0.62 3.531-0.276 4.734l0.083 0.302-0.167 0.208c-0.625 0.786-0.995 1.385-1.052 1.719-0.010 0.068-0.063 0.286-0.115 0.49-0.135 0.516-0.24 1.271-0.286 2.089-0.031 0.682-0.078 1.37-0.135 2.052l-0.026 0.203 0.26 0.078c0.146 0.047 0.365 0.099 0.49 0.12 0.234 0.036 0.667 0.026 0.734-0.010zM24.422 25.583c0.406-0.026 0.776-0.089 0.849-0.151 0.031-0.021 0.068-0.13 0.078-0.24l0.026-0.198-0.323 0.073c-0.255 0.052-0.51 0.083-0.766 0.104-0.615 0.026-1.234 0.010-1.844-0.052-0.203-0.031-0.203-0.031-0.141 0.234 0.052 0.198 0.063 0.208 0.594 0.245 0.354 0.031 0.849 0.026 1.526-0.016zM24.083 24.677c0.531-0.047 1.193-0.161 1.323-0.229 0.042-0.021 0.078-0.099 0.094-0.188l0.047-0.276 0.026-0.13-0.13 0.026c-0.578 0.12-1.016 0.156-1.891 0.156-0.854 0-0.953-0.005-1.177-0.083-0.083-0.036-0.177-0.057-0.271-0.063-0.036 0.021-0.042 0.318-0.010 0.526 0.021 0.125 0.042 0.146 0.167 0.182 0.396 0.109 1.063 0.135 1.823 0.073zM14.417 19.979c1.333-0.385 3.078-1.516 4.505-2.932 0.464-0.464 0.521-0.526 0.583-0.734l0.083-0.266c0.010-0.021-0.073-0.057-0.182-0.083-0.286-0.068-0.505-0.234-0.505-0.385 0-0.089-0.052-0.177-0.203-0.339-0.245-0.276-0.307-0.396-0.333-0.661l-0.021-0.214-0.292-0.208c-0.167-0.12-0.75-0.443-1.37-0.755-0.469-0.229-0.932-0.479-1.385-0.75-0.521-0.349-0.87-0.766-1.068-1.26-0.036-0.099-0.083-0.182-0.099-0.182-0.042 0-1.214 1.13-1.714 1.661-1.234 1.302-2.083 2.432-2.62 3.479-0.135 0.26-0.281 0.568-0.323 0.682l-0.078 0.208 0.094 0.349c0.057 0.188 0.177 0.495 0.271 0.677 0.328 0.646 0.719 1.036 1.365 1.354 0.693 0.344 1.307 0.464 2.333 0.448 0.552-0.005 0.714-0.021 0.958-0.094zM3.896 15.411c0.875-0.776 2.083-1.625 3.563-2.505 0.969-0.578 4.714-2.453 6.438-3.219 0.313-0.141 0.594-0.271 0.625-0.286 0.031-0.021 0.12-0.245 0.203-0.495 0.365-1.156 0.547-1.385 1.208-1.536 0.083-0.021 0.104-0.047 0.104-0.13 0-0.151 0.104-0.5 0.193-0.656 0.068-0.12 0.068-0.125 0.010-0.109-0.036 0.010-0.255 0.073-0.484 0.141-3.177 0.917-5.953 2.135-8.349 3.656-2.557 1.625-4.031 3.573-4.458 5.906l-0.031 0.172 0.313-0.307c0.167-0.172 0.469-0.453 0.667-0.625zM27.464 15.854c0.255-0.13 0.651-0.729 0.797-1.203 0.042-0.167 0.125-0.323 0.245-0.453 0.385-0.427 0.703-1.203 0.708-1.734 0-0.828-0.469-1.146-1.151-0.792-0.089 0.042-0.161 0.073-0.172 0.063-0.036-0.036 0.156-0.224 0.391-0.37 0.307-0.203 0.365-0.323 0.365-0.755 0-0.365-0.089-0.656-0.297-0.979-0.094-0.141-0.13-0.234-0.115-0.292l0.094-0.349c0.13-0.464 0.083-0.995-0.12-1.333-0.302-0.51-0.672-0.76-1.188-0.802l-0.302-0.021 0.177 0.198c0.526 0.568 0.781 1.281 0.677 1.891-0.052 0.313-0.099 0.375-0.401 0.495l-0.177 0.073 0.021 0.24c0.036 0.391-0.031 0.677-0.281 1.203-0.125 0.266-0.219 0.505-0.208 0.531 0.031 0.089 0.375 0.255 0.646 0.323l0.266 0.063-0.167 0.057c-0.219 0.068-0.266 0.167-0.266 0.526 0 0.328 0.047 0.464 0.286 0.823 0.109 0.156 0.182 0.318 0.193 0.411 0.021 0.146 0.016 0.156-0.104 0.198-0.135 0.036-0.276 0.063-0.417 0.068-0.49 0.031-0.526 0.047-0.745 0.255-0.198 0.188-0.203 0.198-0.203 0.406 0 0.286 0.109 0.865 0.177 0.943 0.089 0.094 0.583 0.339 0.776 0.375 0.167 0.042 0.344 0.021 0.495-0.057zM20.25 15.464c0.318-0.25 0.568-0.5 0.708-0.714 0.089-0.13 0.094-0.156 0.052-0.266-0.073-0.167-0.552-0.599-0.818-0.729-0.177-0.078-0.365-0.135-0.557-0.161l-0.328-0.042-0.203-0.255c-0.422-0.521-0.656-0.927-0.99-1.714-0.292-0.667-0.547-1.057-0.953-1.443-0.167-0.156-0.286-0.286-0.276-0.286 0.021 0 0.219 0.099 0.448 0.219 0.38 0.203 0.427 0.219 0.599 0.193 0.62-0.073 1.167-0.786 1.365-1.786 0.057-0.281 0.172-0.568 0.292-0.74 0.005-0.005 0.245 0.151 0.526 0.354 0.714 0.505 0.87 0.583 1.276 0.599 0.266 0.010 0.417-0.010 0.896-0.125 1.021-0.25 2.125-0.349 2.797-0.26 0.38 0.052 0.927 0.219 1.333 0.411 0.401 0.188 0.479 0.198 0.609 0.083 0.109-0.094 0.109-0.109 0.109-0.458-0.005-0.516-0.193-1.073-0.479-1.406-0.146-0.172-0.557-0.453-0.964-0.667-0.146-0.078-0.292-0.156-0.432-0.234-0.193-0.115-0.411-0.099-1.005 0.057-0.688 0.177-0.87 0.177-1.656-0.026-0.667-0.167-0.708-0.172-1.365-0.068-0.349 0.052-1.224 0.021-1.516-0.057-0.146-0.042-0.292-0.083-0.432-0.135-0.255-0.099-0.698-0.115-1.099-0.042-0.797 0.141-1.401 0.573-1.62 1.161-0.115 0.297-0.099 0.438 0.052 0.531 0.24 0.151 0.557 0.563 0.557 0.724 0 0.010-0.078-0.057-0.167-0.151-0.224-0.234-0.427-0.339-0.667-0.339-0.318 0.010-0.604 0.198-0.734 0.484-0.068 0.182-0.13 0.37-0.177 0.563-0.146 0.531-0.276 0.813-0.552 1.188-0.245 0.339-0.281 0.49-0.193 0.87 0.219 0.958 0.599 1.344 2.187 2.245 0.833 0.474 1.26 0.74 1.573 0.974 0.24 0.177 0.245 0.188 0.224 0.323-0.047 0.313 0.151 0.651 0.542 0.927 0.099 0.068 0.161 0.141 0.161 0.193 0 0.094 0.266 0.224 0.458 0.224 0.109 0 0.193-0.047 0.417-0.219zM26.672 13.708c0.604 0.021 0.635-0.026 0.313-0.401-0.339-0.391-0.432-0.708-0.307-1.057l0.052-0.135-0.214-0.104c-0.073-0.036-0.146-0.073-0.219-0.099-0.036 0.141-0.073 0.276-0.104 0.417-0.078 0.318-0.172 1.141-0.177 1.49 0 0.031 0.052 0.021 0.141-0.036 0.125-0.073 0.188-0.083 0.516-0.073zM24.646 13.677c0.365-0.021 0.74-0.047 0.839-0.063l0.182-0.026 0.021-0.599c0.031-0.854 0.156-1.359 0.526-2.167 0.26-0.573 0.375-1.073 0.318-1.448-0.021-0.161-0.031-0.172-0.25-0.266-0.401-0.161-0.818-0.271-1.245-0.339-0.411-0.057-1.62-0.026-2.073 0.063-0.188 0.031-0.531 0.104-0.76 0.161-0.568 0.13-0.87 0.115-1.302-0.073-0.427-0.188-0.698-0.359-0.953-0.599-0.203-0.188-0.224-0.198-0.276-0.135-0.042 0.047-0.063 0.188-0.078 0.49-0.016 0.464-0.089 0.708-0.292 1.036-0.047 0.068-0.083 0.141-0.115 0.214 0 0.016 0.156 0.198 0.349 0.396 0.667 0.693 0.995 0.87 1.521 0.833 0.172-0.016 0.292-0.010 0.292 0.010 0 0.042-0.339 0.307-0.479 0.38-0.068 0.036-0.083 0.073-0.073 0.151l0.083 0.547c0.047 0.313 0.083 0.458 0.13 0.5 0.125 0.104 0.771 0.438 1.177 0.604 0.531 0.214 0.823 0.292 1.229 0.328 0.5 0.042 0.51 0.042 1.229 0zM20.339 13.104c0.010-0.016-0.026-0.318-0.094-0.667-0.083-0.474-0.13-0.646-0.182-0.693-0.036-0.031-0.229-0.167-0.422-0.307-0.255-0.182-0.495-0.385-0.719-0.599l-0.359-0.354-0.193 0.099-0.203 0.109c0.016 0.083 0.047 0.161 0.083 0.234 0.057 0.125 0.172 0.432 0.255 0.682 0.219 0.651 0.391 0.964 0.823 1.531l0.161 0.214 0.307 0.047c0.172 0.026 0.344 0.063 0.391 0.078 0.073 0.031 0.083 0.016 0.104-0.151 0.010-0.073 0.026-0.151 0.047-0.224zM26.938 6.625c0.266-0.026 0.313-0.063 0.198-0.182-0.073-0.073-0.24-0.078-0.375-0.016-0.089 0.042-0.109 0.031-0.25-0.12-0.146-0.161-0.156-0.167-0.339-0.146-0.167 0.021-0.193 0.016-0.214-0.052-0.068-0.115-0.146-0.214-0.24-0.302-0.12-0.135-0.266-0.24-0.432-0.307-0.323-0.125-0.505-0.109-0.813 0.063-0.891 0.484-0.854 0.479-1.714 0.26-0.802-0.203-1.401-0.411-1.594-0.542-0.161-0.109-0.505-0.229-0.792-0.266-0.214-0.031-0.349 0.016-0.552 0.182l-0.109 0.089 0.099 0.172c0.135 0.24 0.12 0.255-0.083 0.078-0.219-0.182-0.479-0.307-0.646-0.313-0.12 0-0.474 0.156-0.516 0.224-0.016 0.021 0.094 0.047 0.24 0.057 0.151 0.016 0.359 0.068 0.5 0.125 0.365 0.156 0.552 0.208 0.885 0.24 0.365 0.036 1.026-0.005 1.104-0.068 0.042-0.036 0.156-0.042 0.396-0.021 0.318 0.021 0.448 0.052 1.203 0.255 0.438 0.12 0.745 0.109 1.266-0.031 0.24-0.068 0.542-0.135 0.667-0.151 0.214-0.021 0.255-0.010 0.589 0.141 0.531 0.24 0.813 0.391 0.969 0.531 0.156 0.135 0.177 0.135 0.552 0.104zM23.969 5.714l0.318-0.167-0.010-0.323c-0.005-0.224-0.016-0.443-0.026-0.661l-0.026-0.333-0.318 0.245c-0.188 0.146-0.37 0.255-0.448 0.271-0.229 0.042-1.359 0-1.464-0.057-0.141-0.104-0.271-0.219-0.391-0.344l-0.292-0.297-0.005 0.177c0 0.094-0.010 0.255-0.031 0.354-0.026 0.188-0.026 0.193 0.177 0.448 0.109 0.141 0.198 0.266 0.198 0.281 0 0.099 1.505 0.568 1.844 0.573 0.109 0 0.245-0.047 0.474-0.167zM23.365 4.531c0.375-0.073 0.557-0.344 0.698-1.031 0.146-0.74 0.219-1.901 0.151-2.396-0.063-0.448-0.563-0.646-1.516-0.615-0.594 0.021-0.839 0.078-1.042 0.25-0.125 0.104-0.125 0.115-0.182 0.609-0.104 0.948 0.052 2.297 0.323 2.802 0.13 0.245 0.245 0.333 0.484 0.375 0.271 0.047 0.849 0.047 1.083 0.005z" fill="currentColor"/>
  </svg>
);

const Framer = () => (
  <img
    src="/framer.svg"
    alt="Framer"
    width={24}
    height={24}
    style={{ display: "inline-block" }}
  />
);
const Tailwind = () => (
  <img
    src="/tailwind.svg"
    alt="Tailwind CSS"
    width={24}
    height={24}
    style={{ display: "inline-block" }}
  />
);
const Zustand = () => (
  <img
    src="/zustand.svg"
    alt="Zustand"
    width={24}
    height={24}
    style={{ display: "inline-block" }}
  />
);
const Shandcn = () => (
  <img
    src="/shadcn.png"
    alt="Shandcn"
    width={24}
    height={24}
    style={{ display: "inline-block" }}
  />
);

const Melody = () => (
  <img
    src="/melody.webp"
    alt="Melody"
    width={24}
    height={24}
    style={{ display: "inline-block" }}
  />
);

const Deals = () => (
  <img
    src="/delas.png"
    alt="Deals"
    width={24}
    height={24}
    style={{ display: "inline-block" }}
  />
);

const React = () => (
  <img
    src="/react.svg"
    alt="React"
    width={24}
    height={24}
    style={{ display: "inline-block" }}
  />
);
const Redux = () => (
  <img
    src="/redux.svg"
    alt="Redux"
    width={24}
    height={24}
    style={{ display: "inline-block" }}
  />
);
const Metireal = () => (
  <img
    src="/Metierial.png"
    alt="Metireal"
    width={24}
    height={24}
    style={{ display: "inline-block" }}
  />
);
const Query = () => (
  <img
    src="/query.png"
    alt="Query"
    width={24}
    height={24}
    style={{ display: "inline-block" }}
  />
);

const HTML = () => (
  <img
    src="/html.png"
    alt="HTML"
    width={24}
    height={24}
    style={{ display: "inline-block" }}
  />
);
const Css = () => (
  <img
    src="/css.jpeg"
    alt="CSS"
    width={24}
    height={24}
    style={{ display: "inline-block" }}
  />
);
const Js = () => (
  <img
    src="/js.png"
    alt="Javascript"
    width={24}
    height={24}
    style={{ display: "inline-block" }}
  />
);
const Limkar = () => (
  <img
    src="/limkar.svg"
    alt="Limkar"
    width={24}
    height={24}
    style={{ display: "inline-block" }}
  />
);

// ProjectShowcase Data - Item 1
const projectShowcaseData1 = [
 { icon: <Shandcn />, bgColor: 'bg-white' },

   { icon: <Tailwind />, bgColor: 'bg-white' },
    { icon: <Zustand />, bgColor: 'bg-white' },
     { icon: <GreenSockIcon />, bgColor: 'bg-white' },
  { icon: <Framer />, bgColor: 'bg-white' },
  { icon: <NextJSIcon />, bgColor: 'bg-white' },
  { icon: <Melody />, bgColor: 'bg-white' },
];

// ProjectShowcase Data - Item 2
const projectShowcaseData2 = [
  { icon: <GitBranch/>, bgColor: 'bg-white' },
 { icon: <Zustand />, bgColor: 'bg-white' },
   { icon: <Shandcn />, bgColor: 'bg-white' },
   { icon: <Tailwind />, bgColor: 'bg-white' },
 { icon: <GreenSockIcon />, bgColor: 'bg-white' },
 { icon: <NextJSIcon />, bgColor: 'bg-white' },
    { icon: <Deals />, bgColor: 'bg-white' },
];


// ProjectShowcaseRight Data - Item 2
const projectShowcaseRightData2 = [
{ icon: <Framer />, bgColor: 'bg-white' },
{ icon: <Query />, bgColor: 'bg-white' },
{ icon: <Redux />, bgColor: 'bg-white' },
{ icon: <Metireal />, bgColor: 'bg-white' },
  { icon: <Tailwind />, bgColor: 'bg-white' },
  { icon: <React />, bgColor: 'bg-white' },
{ icon: <Deals />, bgColor: 'bg-white' },
];

// ProjectShowcaseRight Data - Item 3
const projectShowcaseRightData3 = [
  { icon: <GitBranch />, bgColor: 'bg-white' },
    { icon: <Framer />, bgColor: 'bg-white' },
  { icon: <GreenSockIcon />, bgColor: 'bg-white' },
  { icon: <Css />, bgColor: 'bg-white' },
    { icon: <HTML />, bgColor: 'bg-white' },
    { icon: <Js />, bgColor: 'bg-white' },
    { icon: <Limkar />, bgColor: 'bg-white' },
];

interface Milestone {
  id: number;
  title: string;
  company: string;
  date: string;
  description: string;
  side: 'left' | 'right';
}

const CareerTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const svgPathMobileRef = useRef<SVGPathElement>(null);

  const milestones: Milestone[] = [
    {
      id: 1,
      title: 'Mallareddy Institute of Technology and Science',
      company: 'College',
      date: '2019 - 2023',
      description: '',
      side: 'left',
    },
    {
      id: 2,
      title: 'Melody Mocktail',
      company: 'Melody Mocktail',
   date: '2023-Present',
      description: 'Worked as a Next.js developer and built a website where users can find rental houses and travel companions.',
      side: 'right',
    },
    {
      id: 3,
      title: 'Deals Mocktail',
      company: 'Melody Mocktail',
   date: '2023-Present',
      description: 'Worked as a React.js developer and created an e-commerce website where users can find the best low-price products',
      side: 'left',
    },
    {
      id: 4,
      title: 'New Deals Mocktail',
      company: 'Melody Mocktail',
      date: '2023-Present',
      description: 'Currently building a high-performance website using the latest Next.js 16 with advanced speed and load-time optimization.',
      side: 'right',
    },
    {
      id: 5,
      title: 'Limkar',
      company: 'Hatundia Private Limited',
      date: '2023',
      description: 'Created a kitchen tools e-commerce website with a smooth UI and easy product browsing.Enabled users to view, select, and purchase kitchen items seamlessly.',
      side: 'left',
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    let desktopTrigger: any = null;
    let mobileTrigger: any = null;

    // Delay to allow DOM to settle after TechSkillsSection pinning
    const timeoutId = setTimeout(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Desktop SVG animation
      if (svgPathRef.current) {
        const path = svgPathRef.current;
        
        try {
          const pathLength = path.getTotalLength();

          // Initialize - path is fully hidden
          gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
            opacity: 1,
          });

          // Create scroll trigger that reveals SVG as section comes into view
          const tween = gsap.to(path, {
            strokeDashoffset: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 3,
              markers: false,
              onUpdate: (self) => {
                // Ensure path visibility
                if (path.parentElement) {
                  path.parentElement.style.pointerEvents = 'none';
                }
              },
            },
          });
          desktopTrigger = tween.scrollTrigger;
        } catch (e) {
          console.error('Error setting up desktop SVG animation:', e);
        }
      }

      // Mobile SVG animation
      if (svgPathMobileRef.current) {
        const pathMobile = svgPathMobileRef.current;
        
        try {
          const pathLengthMobile = pathMobile.getTotalLength();

          // Initialize - path is fully hidden
          gsap.set(pathMobile, {
            strokeDasharray: pathLengthMobile,
            strokeDashoffset: pathLengthMobile,
            opacity: 1,
          });

          // Create scroll trigger that reveals SVG as section comes into view
          const tweenMobile = gsap.to(pathMobile, {
            strokeDashoffset: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 3,
              markers: false,
              onUpdate: (self) => {
                // Ensure path visibility
                if (pathMobile.parentElement) {
                  pathMobile.parentElement.style.pointerEvents = 'none';
                }
              },
            },
          });
          mobileTrigger = tweenMobile.scrollTrigger;
        } catch (e) {
          console.error('Error setting up mobile SVG animation:', e);
        }
      }

      // Refresh ScrollTrigger to recalculate positions
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      // Only kill this component's triggers, not all triggers globally
      if (desktopTrigger) desktopTrigger.kill();
      if (mobileTrigger) mobileTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-8 px-3 md:py-16 md:px-6 bg-linear-to-b from-white via-gray-50 to-white relative overflow-visible"
    >
      {/* Desktop SVG Background */}
      <svg
        className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-5"
        viewBox="0 0 1500 2000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="svgGlow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feFlood floodColor="#9ca3af" floodOpacity="0.5" result="colorFlood" />
            <feComposite in="colorFlood" in2="coloredBlur" operator="in" result="glowColor" />
            <feMerge>
              <feMergeNode in="glowColor" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="svgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b7280" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#9ca3af" stopOpacity="1" />
            <stop offset="100%" stopColor="#6b7280" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <path
          ref={svgPathRef}
          d="M1492 99.5C1492 99.5 43.4999 190 43.5 335.5C43.5 481 1474.5 472 1447 614.5C1419.5 757 107 751.5 92 842C77 932.5 1419.5 1039 1419.5 1154C1419.5 1269 167.5 1350.5 149.5 1432.5C131.5 1514.5 1380 1614.5 1392 1702.5C1404 1790.5 43.5 1957 43.5 1957"
          stroke="url(#svgGradient)"
          strokeWidth="22"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#svgGlow)"
        />
      </svg>

      {/* Mobile SVG Background */}
      <svg
        className="md:hidden absolute inset-0 w-full h-full pointer-events-none z-5"
        viewBox="0 0 1500 2000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="svgGlowMobile">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feFlood floodColor="#9ca3af" floodOpacity="0.5" result="colorFlood" />
            <feComposite in="colorFlood" in2="coloredBlur" operator="in" result="glowColor" />
            <feMerge>
              <feMergeNode in="glowColor" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="svgGradientMobile" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b7280" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#9ca3af" stopOpacity="1" />
            <stop offset="100%" stopColor="#6b7280" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <path
          ref={svgPathMobileRef}
          d="M1492 99.5C1492 99.5 43.4999 190 43.5 335.5C43.5 481 1474.5 472 1447 614.5C1419.5 757 107 751.5 92 842C77 932.5 1419.5 1039 1419.5 1154C1419.5 1269 167.5 1350.5 149.5 1432.5C131.5 1514.5 1380 1614.5 1392 1702.5C1404 1790.5 43.5 1957 43.5 1957"
          stroke="url(#svgGradientMobile)"
          strokeWidth="22"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#svgGlowMobile)"
        />
      </svg>

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-black mb-4 tracking-tight">
            Career Evolution
          </h2>
          <div className="w-20 h-1.5 bg-linear-to-r from-gray-800 to-gray-400 mx-auto mb-6 rounded-full" />
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            A journey of growth, learning, and professional excellence
          </p>
        </div>

        {/* Timeline */}
        <div className="relative" ref={sectionRef}>
          {/* Desktop Center Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 pointer-events-none z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-300" />
            {/* Glowing fill line */}
            <div
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-gray-700 via-gray-500 to-gray-700 shadow-2xl"
              style={{
                width: '100%',
                height: '0%',
                background: 'linear-gradient(to bottom, rgb(55, 65, 81), rgb(107, 114, 128), rgb(55, 65, 81))',
                boxShadow: '0 0 20px rgba(55, 65, 81, 1), 0 0 40px rgba(75, 85, 99, 0.7), inset 0 0 10px rgba(255, 255, 255, 0.2)',
                transition: 'height 0.1s linear',
              }}
              data-line-fill
            />
          </div>

          {/* Mobile Left Line */}
          <div className="md:hidden absolute left-1.5 top-0 bottom-0 w-0.5 -translate-x-1/2 pointer-events-none z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-300" />
            {/* Glowing fill line */}
            <div
              className="absolute inset-x-0 top-0 bg-linear-to-b from-gray-700 via-gray-500 to-gray-700 shadow-2xl"
              style={{
                width: '100%',
                height: '0%',
                background: 'linear-gradient(to bottom, rgb(55, 65, 81), rgb(107, 114, 128), rgb(55, 65, 81))',
                boxShadow: '0 0 20px rgba(55, 65, 81, 1), 0 0 40px rgba(75, 85, 99, 0.7), inset 0 0 10px rgba(255, 255, 255, 0.2)',
                transition: 'height 0.1s linear',
              }}
              data-line-fill-mobile
            />
          </div>

          {/* Milestones */}
          <div className="space-y-0">
            {milestones.map((milestone) => {
              const isLeft = milestone.side === 'left';

              return (
                <div
                  key={milestone.id}
                  className="flex items-center h-[25vh] lg:h-[42vh] justify-center"
                >
                  {/* Desktop Layout */}
                  <div className="hidden md:contents">
                    {/* Left Content */}
                    <div className="w-5/12 h-[42vh] flex items-center justify-end pr-10">
                      {isLeft && (
                        <div className="w-[60vh] h-[38vh] bg-white rounded-2xl p-8 border border-gray-200 flex flex-col justify-center backdrop-blur-sm">
                          <div className="text-xs font-bold text-gray-500 mb-3 tracking-widest uppercase">
                            {milestone.date}
                          </div>
                          <h3 className="text-2xl font-black text-black mb-3 leading-tight">
                            {milestone.title}
                          </h3>
                          <p className="text-sm font-semibold text-gray-700 mb-4 tracking-wide">
                            @ {milestone.company}
                          </p>
                          <div className="w-12 h-1 bg-linear-to-r from-gray-800 to-gray-400 rounded-full mb-4" />
                          <p className="text-sm text-gray-600 leading-relaxed font-light">
                            {milestone.description}
                          </p>
                        </div>
                      )}
                      {!isLeft && (
                      
                        <div className='lg:flex flex-col hidden relative w-full gap-4'>
                          <div className='space-y-1'>
                            <p className='text-xs absolute  right-3 top-7 font-bold text-gray-500 tracking-widest uppercase'>
                                   Tech Stack I Used
                            </p>
                            
                            <div className='w-12 absolute right-24 h-1 top-13 bg-linear-to-r from-gray-600 to-gray-400 rounded-full' />
                          </div>
 <ProjectShowcase data={milestone.id === 2 ? projectShowcaseData1 : projectShowcaseData2}  />
                         </div>
                      )}
                    </div>

                    {/* Center Point */}
                    <div className="w-2/12 flex justify-center relative h-[42vh] items-center z-20">
                      <div className="w-6 h-6 bg-white border-3 border-gray-800 rounded-full shadow-lg" />
                    </div>

                    {/* Right Content */}
                    <div className="w-5/12 h-[42vh] flex items-center justify-start pl-10">
                      {!isLeft && (
                        <div className="w-[60vh] h-[38vh] bg-white rounded-2xl p-8 border border-gray-200 flex flex-col justify-center backdrop-blur-sm">
                          <div className="text-xs font-bold text-gray-500 mb-3 tracking-widest uppercase">
                            {milestone.date}
                          </div>
                          <h3 className="text-2xl font-black text-black mb-3 leading-tight">
                            {milestone.title}
                          </h3>
                          <p className="text-sm font-semibold text-gray-700 mb-4 tracking-wide">
                            @ {milestone.company}
                          </p>
                          <div className="w-12 h-1 bg-linear-to-r from-gray-800 to-gray-400 rounded-full mb-4" />
                          <p className="text-sm text-gray-600 leading-relaxed font-light">
                            {milestone.description}
                          </p>
                        </div>
                      )}
                      {isLeft && milestone.id !== 1 && (
                        <>
                         <div className='lg:flex flex-col hidden relative w-full gap-4'>
                          <div className='space-y-1'>
                            <p className='text-xs absolute  top-7 font-bold text-gray-500 tracking-widest uppercase'>
                                   Tech Stack Used
                            </p>
                            
                            <div className='w-12 absolute h-1 top-13 bg-linear-to-r from-gray-600 to-gray-400 rounded-full' />
                          </div>
                           <ProjectShowcaseRight data={milestone.id === 3 ? projectShowcaseRightData2 : projectShowcaseRightData3} />
                         </div>
                        </>
                      )}
                      
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden w-full flex items-center h-[22vh] lg:h-[28vh] pl-8 pr-4 relative">
                    {/* Mobile Point */}
                    <div className="absolute left-1.5 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
                      <div className="w-5 h-5 bg-white border-2.5 border-gray-800 rounded-full shadow-lg" />
                    </div>

                    {/* Mobile Content */}
                    <div className="w-full h-[22vh] lg:h-[28vh] flex items-center">
                      <div className="w-full h-[22vh] lg:h-[28vh] bg-white rounded-xl p-5 border border-gray-200 flex flex-col justify-center backdrop-blur-sm">
                        <div className="text-xs font-bold text-gray-500 mb-2 tracking-widest uppercase">
                          {milestone.date}
                        </div>
                        <h3 className="text-lg font-black text-black mb-2 leading-tight">
                          {milestone.title}
                        </h3>
                        <p className="text-xs font-semibold text-gray-700 mb-2 tracking-wide">
                          @ {milestone.company}
                        </p>
                        <div className="w-8 h-0.5 bg-linear-to-r from-gray-800 to-gray-400 rounded-full mb-2" />
                        <p className="text-xs text-gray-600 leading-relaxed font-light">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;
 