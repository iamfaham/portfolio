// components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
        <span className="sr-only">John Doe</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {['Home', 'Projects', 'Skills', 'Experience', 'Contact'].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium hover:underline underline-offset-4 transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
            prefetch={false}
          >
            {item}
          </Link>
        ))}
      </nav>
    </header>
  );
}
