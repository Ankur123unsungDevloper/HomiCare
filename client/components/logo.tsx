import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Link href="/">
        <Image
          src="/light_logo.svg"
          alt="Logo"
          width={180}
          height={160}
        />
      </Link>
    </div>
  );
}