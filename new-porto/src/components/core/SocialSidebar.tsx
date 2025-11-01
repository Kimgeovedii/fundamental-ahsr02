import { Github, Linkedin, Mail } from "lucide-react";
import React from "react";

const SocialSidebar: React.FC = () => {
  return (
    <div className="fixed left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center space-y-6 z-50 text-white">
      <div className="w-[1px] h-16 bg-gray-600"></div>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Github"
      >
        <Github className="w-5 h-5 hover:text-purple-400 transition-colors" />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <Linkedin className="w-5 h-5 hover:text-purple-400 transition-colors" />
      </a>
      <a href="mailto:example@email.com" aria-label="Email">
        <Mail className="w-5 h-5 hover:text-purple-400 transition-colors" />
      </a>
      <div className="w-[1px] h-16 bg-gray-600"></div>
    </div>
  );
};

export default SocialSidebar;
