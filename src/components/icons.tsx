import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number };

const paths = {
  ArrowDown: "M12 4v15m0 0-6-6m6 6 6-6",
  ArrowRight: "M4 12h15m0 0-6-6m6 6-6 6",
  ArrowUpRight: "M6 18 18 6m0 0H9m9 0v9",
  CalendarDays: "M5 3v3m14-3v3M3.5 9.5h17M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm2 8h3m4 0h3m-10 4h3m4 0h3",
  Check: "m5 12 4 4L19 6",
  CheckCircle2: "M21 11.1V12a9 9 0 1 1-5.3-8.2M8 12l3 3 9-9",
  ChevronDown: "m5 9 7 7 7-7",
  CircleAlert: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-14v5m0 4h.01",
  Clock3: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-15v6l4 2",
  Eye: "M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Zm9.5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  EyeOff: "m3 3 18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 9.5 6 9.5 6a14 14 0 0 1-2.2 2.9M6.2 6.2C3.8 8 2.5 12 2.5 12s3.5 6 9.5 6a9 9 0 0 0 3-.5M9.9 9.9a3 3 0 0 0 4.2 4.2",
  FileText: "M6 2h8l5 5v15H6V2Zm8 0v6h5M9 13h6m-6 4h6",
  Filter: "M3 5h18M6 12h12m-8 7h4",
  Headphones: "M4 14v-2a8 8 0 0 1 16 0v2M4 14h4v6H6a2 2 0 0 1-2-2v-4Zm16 0h-4v6h2a2 2 0 0 0 2-2v-4Z",
  Heart: "M12 20S3 15 3 8.5C3 5.5 6.8 3.8 9 6l3 3 3-3c2.2-2.2 6-.5 6 2.5C21 15 12 20 12 20Z",
  Home: "m3 11 9-8 9 8v10h-6v-6H9v6H3V11Z",
  ImageIcon: "M3 4h18v16H3V4Zm0 12 5-5 4 4 3-3 6 6M16 8h.01",
  LayoutDashboard: "M3 3h7v8H3V3Zm11 0h7v5h-7V3ZM3 15h7v6H3v-6Zm11-3h7v9h-7v-9Z",
  Leaf: "M20 3C10 3 5 8 5 15c4 1 11 0 15-12ZM4 21c2-6 6-10 12-13",
  LoaderCircle: "M12 3a9 9 0 1 1-9 9",
  LogOut: "M10 4H4v16h6m5-4 4-4-4-4m4 4H8",
  MapPin: "M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Zm-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  MessagesSquare: "M4 4h16v12H9l-5 4V4Zm4 4h8m-8 4h5",
  Minus: "M5 12h14",
  PackageSearch: "m4 7 8-4 8 4v10l-8 4-8-4V7Zm0 0 8 4 8-4m-8 4v10m5-2 4 4m-2-6a3 3 0 1 0 0 6 3 3 0 0 0 0 0-6Z",
  PawPrint: "M12 13c-3 0-6 2.5-6 5 0 2 2 3 3.5 2.4L12 19l2.5 1.4C16 21 18 20 18 18c0-2.5-3-5-6-5ZM7 11c-1.5 0-2.5-1.5-2.5-3S5.5 5 7 5s2.5 1.5 2.5 3S8.5 11 7 11Zm10 0c-1.5 0-2.5-1.5-2.5-3S15.5 5 17 5s2.5 1.5 2.5 3-1 3-2.5 3ZM12 9c-1.4 0-2.3-1.4-2.3-2.8S10.6 3.5 12 3.5s2.3 1.3 2.3 2.7S13.4 9 12 9Z",
  PlugZap: "m8 3 1 5m7-5-1 5M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8Zm6 9v4m5-11-4 4h4l-4 4",
  Plus: "M12 5v14M5 12h14",
  RotateCcw: "M4 4v6h6M4.5 10A8 8 0 1 1 6 18",
  Route: "M6 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm16 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM4 7c0 8 16 2 16 10",
  Search: "M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm5.5-2 5 5",
  Send: "M3 4 22 12 3 20l3-8-3-8Zm3 8h10",
  Settings: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-6 2 3 3-.5.5 3L21 9l-1 3 1 3-3.5 1.5-.5 3-3-.5-2 3-2-3-3 .5-.5-3L3 15l1-3-1-3 3.5-1.5.5-3 3 .5 2-3Z",
  Settings2: "M4 6h10m4 0h2M14 3v6M4 12h3m4 0h9M7 9v6M4 18h11m4 0h1m-5-3v6",
  ShieldCheck: "M12 2 20 5v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3Zm-4 10 3 3 5-6",
  ShoppingBag: "M5 8h14l1 13H4L5 8Zm4 0V6a3 3 0 0 1 6 0v2",
  ShoppingBasket: "M3 10h18l-2 11H5L3 10Zm4 0 5-7 5 7M8 14v3m4-3v3m4-3v3",
  SlidersHorizontal: "M4 6h5m4 0h7M9 3v6M4 12h10m4 0h2m-6-3v6M4 18h2m4 0h10m-14-3v6",
  Sparkles: "m12 2 1.4 4.6L18 8l-4.6 1.4L12 14l-1.4-4.6L6 8l4.6-1.4L12 2Zm-6 11 .8 2.2L9 16l-2.2.8L6 19l-.8-2.2L3 16l2.2-.8L6 13Zm12 2 1 2.8 3 1.2-3 1.2L18 23l-1-2.8-3-1.2 3-1.2 1-2.8Z",
  Star: "m12 2 3 6 6.5 1-4.8 4.6 1.2 6.4-5.9-3-5.9 3 1.2-6.4L2.5 9 9 8l3-6Z",
  Trash2: "M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6",
  Truck: "M3 5h11v12H3V5Zm11 4h4l3 4v4h-7V9ZM8 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  UserRound: "M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm-8 9a8 8 0 0 1 16 0",
  UsersRound: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 10a7 7 0 0 1 14 0m2-10a3.5 3.5 0 0 0 0-7m0 11a6 6 0 0 1 4 6",
  WalletCards: "M3 6h18v14H3V6Zm0 4h18M16 15h2M6 3h12",
  X: "M5 5l14 14M19 5 5 19",
} as const;

function makeIcon(name: keyof typeof paths) {
  function RottavaIcon({ size = 24, strokeWidth = 1.7, ...props }: IconProps) {
    return <svg {...props} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>;
  }
  RottavaIcon.displayName = name;
  return RottavaIcon;
}

export const ArrowDown = makeIcon("ArrowDown");
export const ArrowRight = makeIcon("ArrowRight");
export const ArrowUpRight = makeIcon("ArrowUpRight");
export const CalendarDays = makeIcon("CalendarDays");
export const Check = makeIcon("Check");
export const CheckCircle2 = makeIcon("CheckCircle2");
export const ChevronDown = makeIcon("ChevronDown");
export const CircleAlert = makeIcon("CircleAlert");
export const Clock3 = makeIcon("Clock3");
export const Eye = makeIcon("Eye");
export const EyeOff = makeIcon("EyeOff");
export const FileText = makeIcon("FileText");
export const Filter = makeIcon("Filter");
export const Headphones = makeIcon("Headphones");
export const Heart = makeIcon("Heart");
export const Home = makeIcon("Home");
export const ImageIcon = makeIcon("ImageIcon");
export const LayoutDashboard = makeIcon("LayoutDashboard");
export const Leaf = makeIcon("Leaf");
export const LoaderCircle = makeIcon("LoaderCircle");
export const LogOut = makeIcon("LogOut");
export const MapPin = makeIcon("MapPin");
export const MessagesSquare = makeIcon("MessagesSquare");
export const Minus = makeIcon("Minus");
export const PackageSearch = makeIcon("PackageSearch");
export const PawPrint = makeIcon("PawPrint");
export const PlugZap = makeIcon("PlugZap");
export const Plus = makeIcon("Plus");
export const RotateCcw = makeIcon("RotateCcw");
export const Route = makeIcon("Route");
export const Search = makeIcon("Search");
export const Send = makeIcon("Send");
export const Settings = makeIcon("Settings");
export const Settings2 = makeIcon("Settings2");
export const ShieldCheck = makeIcon("ShieldCheck");
export const ShoppingBag = makeIcon("ShoppingBag");
export const ShoppingBasket = makeIcon("ShoppingBasket");
export const SlidersHorizontal = makeIcon("SlidersHorizontal");
export const Sparkles = makeIcon("Sparkles");
export const Star = makeIcon("Star");
export const Trash2 = makeIcon("Trash2");
export const Truck = makeIcon("Truck");
export const UserRound = makeIcon("UserRound");
export const UsersRound = makeIcon("UsersRound");
export const WalletCards = makeIcon("WalletCards");
export const X = makeIcon("X");
