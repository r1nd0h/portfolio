import { Github, Twitter, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-border/30 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted/40 font-[family-name:var(--font-display)]">
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-5">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted/30 hover:text-accent transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href={profile.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted/30 hover:text-accent transition-colors duration-300"
            aria-label="Twitter"
          >
            <Twitter size={16} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-muted/30 hover:text-accent transition-colors duration-300"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
