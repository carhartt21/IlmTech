'use client';

/**
 * Large animated hero logo — electricity/data pulses flow through the house-icon paths.
 * Re-uses the same SVG paths as the header Logo but rendered larger with stroke-dashoffset animations.
 */
export default function HeroLogo() {
  return (
    <div className="flex justify-center">
      <svg
        viewBox="0 0 160 160"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-accent-blue drop-shadow-[0_0_24px_rgba(0,212,255,0.4)]"
        aria-hidden="true"
      >
        <defs>
          {/* Glow filter for the energy pulses */}
          <filter id="pulse-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Static base paths (dim) ── */}
        <g opacity="0.25">
          <path fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" strokeMiterlimit="5" d="M -0.0002375 -0.0011625 L -0.0002375 -34.915225 C -0.0002375 -37.704288 2.284919 -39.954288 5.073981 -39.915225 L 42.234138 -39.356631 C 44.964606 -39.317569 47.159919 -37.091006 47.159919 -34.360538 L 47.159919 3.932431" transform="matrix(1, 0, 0, -1, 30.7268, 92.7254)"/>
          <path fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="miter" stroke="currentColor" strokeMiterlimit="5" d="M 0.000525 0.00184375 L -9.741662 0.0135625 C -11.948694 0.0174688 -13.737756 1.806531 -13.737756 4.013563 L -13.737756 31.341688 C -13.737756 34.06825 -15.917444 36.290906 -18.6401 36.341688 L -33.089319 36.619031 C -37.694787 36.704969 -39.741662 42.44325 -36.23385 45.423719 L 16.887244 90.626844 C 18.723181 92.189344 21.414588 92.220594 23.285681 90.69325 L 42.32865 75.181531 C 43.39115 74.314344 44.988806 75.072156 44.988806 76.447156 L 44.988806 84.482313 C 44.988806 85.560438 45.844275 86.447156 46.9224 86.482313 L 58.496619 86.861219 C 59.625525 86.896375 60.563025 85.990125 60.563025 84.861219 L 60.563025 64.345594 C 60.563025 63.771375 60.809119 63.220594 61.242713 62.841688 L 80.742713 45.740125 C 84.191931 42.712781 82.090369 37.029188 77.504431 36.978406 L 71.875525 36.915906 C 69.652869 36.892469 67.875525 35.056531 67.9224 32.833875 L 68.742713 -6.392687 C 68.801306 -9.201281 66.559119 -11.517687 63.750525 -11.545031 L 30.051306 -11.908312" transform="matrix(1, 0, 0, -1, 57.8276, 120.037)"/>
          <path fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" strokeMiterlimit="5" d="M -0.00118125 0.0001875 L 33.616006 28.230656 C 35.436319 29.761906 38.084756 29.793156 39.944131 28.312687 L 68.217569 5.808781 C 69.408975 4.859562 70.104287 3.418156 70.104287 1.894719 L 70.104287 -41.027156 C 70.104287 -43.238094 68.311319 -45.027156 66.104287 -45.027156 L 55.420694 -45.027156" transform="matrix(1, 0, 0, -1, 41.1379, 75.008)"/>
        </g>

        {/* ── Animated energy paths ── */}
        {/* Path 1 — left building */}
        <path
          fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" strokeMiterlimit="5"
          d="M -0.0002375 -0.0011625 L -0.0002375 -34.915225 C -0.0002375 -37.704288 2.284919 -39.954288 5.073981 -39.915225 L 42.234138 -39.356631 C 44.964606 -39.317569 47.159919 -37.091006 47.159919 -34.360538 L 47.159919 3.932431"
          transform="matrix(1, 0, 0, -1, 30.7268, 92.7254)"
          strokeDasharray="12 180"
          filter="url(#pulse-glow)"
        >
          <animate attributeName="stroke-dashoffset" from="192" to="0" dur="4.5s" repeatCount="indefinite" calcMode="linear" />
        </path>

        {/* Path 2 — main house outline */}
        <path
          fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="miter" stroke="currentColor" strokeMiterlimit="5"
          d="M 0.000525 0.00184375 L -9.741662 0.0135625 C -11.948694 0.0174688 -13.737756 1.806531 -13.737756 4.013563 L -13.737756 31.341688 C -13.737756 34.06825 -15.917444 36.290906 -18.6401 36.341688 L -33.089319 36.619031 C -37.694787 36.704969 -39.741662 42.44325 -36.23385 45.423719 L 16.887244 90.626844 C 18.723181 92.189344 21.414588 92.220594 23.285681 90.69325 L 42.32865 75.181531 C 43.39115 74.314344 44.988806 75.072156 44.988806 76.447156 L 44.988806 84.482313 C 44.988806 85.560438 45.844275 86.447156 46.9224 86.482313 L 58.496619 86.861219 C 59.625525 86.896375 60.563025 85.990125 60.563025 84.861219 L 60.563025 64.345594 C 60.563025 63.771375 60.809119 63.220594 61.242713 62.841688 L 80.742713 45.740125 C 84.191931 42.712781 82.090369 37.029188 77.504431 36.978406 L 71.875525 36.915906 C 69.652869 36.892469 67.875525 35.056531 67.9224 32.833875 L 68.742713 -6.392687 C 68.801306 -9.201281 66.559119 -11.517687 63.750525 -11.545031 L 30.051306 -11.908312"
          transform="matrix(1, 0, 0, -1, 57.8276, 120.037)"
          strokeDasharray="16 400"
          filter="url(#pulse-glow)"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="416" dur="5.2s" repeatCount="indefinite" calcMode="linear" />
        </path>

        {/* Path 3 — roof & right wall */}
        <path
          fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" strokeMiterlimit="5"
          d="M -0.00118125 0.0001875 L 33.616006 28.230656 C 35.436319 29.761906 38.084756 29.793156 39.944131 28.312687 L 68.217569 5.808781 C 69.408975 4.859562 70.104287 3.418156 70.104287 1.894719 L 70.104287 -41.027156 C 70.104287 -43.238094 68.311319 -45.027156 66.104287 -45.027156 L 55.420694 -45.027156"
          transform="matrix(1, 0, 0, -1, 41.1379, 75.008)"
          strokeDasharray="14 220"
          filter="url(#pulse-glow)"
        >
          <animate attributeName="stroke-dashoffset" from="234" to="0" dur="4.3s" repeatCount="indefinite" calcMode="linear" />
        </path>

        {/* ── Connection nodes (dots) — bright ── */}
        <path fill="none" strokeWidth="3" strokeLinecap="butt" strokeLinejoin="miter" stroke="currentColor" strokeMiterlimit="10" d="M 0.00149375 0.00184375 C 0.00149375 -1.380969 -1.1196 -2.498156 -2.498506 -2.498156 C -3.881319 -2.498156 -4.998506 -1.380969 -4.998506 0.00184375 C -4.998506 1.38075 -3.881319 2.501844 -2.498506 2.501844 C -1.1196 2.501844 0.00149375 1.38075 0.00149375 0.00184375 Z" transform="matrix(1, 0, 0, -1, 64.1821, 120.037)">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="3.4s" repeatCount="indefinite" />
        </path>
        <path fill="none" strokeWidth="3" strokeLinecap="butt" strokeLinejoin="miter" stroke="currentColor" strokeMiterlimit="10" d="M 0.00011875 0.00184375 C 0.00011875 -1.380969 -1.117069 -2.498156 -2.499881 -2.498156 C -3.882694 -2.498156 -4.999881 -1.380969 -4.999881 0.00184375 C -4.999881 1.38075 -3.882694 2.501844 -2.499881 2.501844 C -1.117069 2.501844 0.00011875 1.38075 0.00011875 0.00184375 Z" transform="matrix(1, 0, 0, -1, 95.5116, 120.037)">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite" begin="0.6s" />
        </path>

        {/* Filled center dot */}
        <path fillRule="nonzero" fill="currentColor" d="M 81.886719 84.371094 C 81.886719 86.582031 80.09375 88.371094 77.886719 88.371094 C 75.675781 88.371094 73.886719 86.582031 73.886719 84.371094 C 73.886719 82.164062 75.675781 80.371094 77.886719 80.371094 C 80.09375 80.371094 81.886719 82.164062 81.886719 84.371094">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin="0.4s" />
        </path>
        <path fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" strokeMiterlimit="10" d="M 0.00111875 0.00100625 C 0.00111875 -2.209931 -1.79185 -3.998994 -3.998881 -3.998994 C -6.209819 -3.998994 -7.998881 -2.209931 -7.998881 0.00100625 C -7.998881 2.208038 -6.209819 4.001006 -3.998881 4.001006 C -1.79185 4.001006 0.00111875 2.208038 0.00111875 0.00100625 Z" transform="matrix(1, 0, 0, -1, 81.8856, 84.3721)">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin="0.4s" />
        </path>
      </svg>
    </div>
  );
}
