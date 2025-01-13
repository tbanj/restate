import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
const AppIconSVG = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={134}
    height={113}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="m74.469 99.631-32.19-.229V0l32.19 20.417v79.214Z" />
    <Path
      fill="url(#b)"
      d="M89.427 92.689 76.23 97.098V37.894l13.198 8.465v46.33Z"
    />
    <Path
      fill="url(#c)"
      d="m27.32 97.962 13.198 1.293V37.894L27.32 46.359v51.603Z"
    />
    <Path
      fill="url(#d)"
      d="M92.775 41.732c11.187 5.966 18.087 14.105 18.087 23.083 0 18.295-28.605 33.126-63.891 33.126-12.898 0-24.893-1.988-34.935-5.396 11.609 6.19 27.834 10.043 45.804 10.043 35.286 0 63.891-14.831 63.891-33.126-.001-11.607-11.525-21.814-28.956-27.73Z"
    />
    <Path
      fill="#414042"
      d="M102.445 43.868c15.051 6.724 24.521 16.47 24.521 27.318 0 20.288-33.108 36.734-73.95 36.734-20.77 0-39.526-4.259-52.958-11.107 13.435 9.467 35.267 15.632 59.935 15.632 40.841 0 73.95-16.883 73.95-37.709.001-12.768-12.456-24.046-31.498-30.868Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={58.801}
        x2={57.879}
        y1={10.698}
        y2={95.087}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.218} stopColor="#006CBD" />
        <Stop offset={1} stopColor="#004F94" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={82.706}
        x2={82.916}
        y1={42.62}
        y2={92.6}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.067} stopColor="#006CBD" />
        <Stop offset={0.325} stopColor="#0067B6" />
        <Stop offset={0.695} stopColor="#005AA3" />
        <Stop offset={0.924} stopColor="#004F94" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={33.919}
        x2={33.919}
        y1={42.966}
        y2={95.996}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.113} stopColor="#006CBD" />
        <Stop offset={0.728} stopColor="#0059A2" />
        <Stop offset={1} stopColor="#004F94" />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={65.325}
        x2={78.45}
        y1={88.233}
        y2={36.609}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#006CBD" />
        <Stop offset={0.301} stopColor="#0067B6" />
        <Stop offset={0.732} stopColor="#005AA3" />
        <Stop offset={1} stopColor="#004F94" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default AppIconSVG;
