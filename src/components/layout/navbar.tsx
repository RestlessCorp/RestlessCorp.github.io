"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Process", href: "/process" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary-border/20">
      <Container className="flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-12 h-12 transition-transform group-hover:scale-110">
            <img 
              src="/logo.jpg" 
              alt="Something Is Cooking Logo" 
              className="w-full h-full object-contain rounded-sm"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-foreground font-bold tracking-tight leading-none text-xl">Something Is Cooking</span>
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Game Development Studio</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-text-muted"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button variant="premium" size="sm" asChild>
            <Link href="/contact">Book a Scoping Call</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-surface-2 border-b border-primary-border/30 p-4 md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium p-2 rounded-md transition-colors",
                    pathname === link.href ? "bg-primary/10 text-primary" : "text-text-muted"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Button className="w-full mt-2" size="lg" asChild onClick={() => setIsOpen(false)}>
                <Link href="/contact">Book a Scoping Call</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
