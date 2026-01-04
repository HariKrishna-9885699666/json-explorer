import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Phone, 
  MapPin, 
  Mail, 
  GraduationCap, 
  Github, 
  Linkedin, 
  PenTool, 
  Globe,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const profileData = {
  name: "Hari Krishna Anem",
  phone: "+91 9885699666",
  city: "Hyderabad, India",
  email: "anemharikrishna@gmail.com",
  degree: "B.Tech (CSIT)",
  github: "HariKrishna-9885699666",
  linkedin: "anemharikrishna",
  blog: "Hashnode",
  portfolio: "harikrishna.netlify.app"
};

const socialLinks = [
  { 
    icon: Github, 
    label: "GitHub", 
    value: profileData.github,
    href: `https://github.com/${profileData.github}`
  },
  { 
    icon: Linkedin, 
    label: "LinkedIn", 
    value: profileData.linkedin,
    href: `https://linkedin.com/in/${profileData.linkedin}`
  },
  { 
    icon: PenTool, 
    label: "Blog", 
    value: profileData.blog,
    href: `https://hashnode.com/@${profileData.github}`
  },
  { 
    icon: Globe, 
    label: "Portfolio", 
    value: profileData.portfolio,
    href: `https://${profileData.portfolio}`
  },
];

export function ProfileCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "w-14 h-14 rounded-full",
          "bg-gradient-to-br from-primary to-primary/70",
          "flex items-center justify-center",
          "shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40",
          "transition-all duration-300 hover:scale-105",
          "border-2 border-primary/20"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <User className="w-6 h-6 text-primary-foreground" />
      </motion.button>

      {/* Overlay & Popup */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            />

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={cn(
                "fixed bottom-24 right-6 z-50",
                "w-80 max-w-[calc(100vw-3rem)]",
                "bg-card border border-border rounded-2xl",
                "shadow-2xl shadow-primary/10",
                "overflow-hidden"
              )}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-6 pb-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-background/50 hover:bg-background/80 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30">
                    <span className="text-2xl font-bold text-primary-foreground">HK</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{profileData.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      {profileData.degree}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="p-4 space-y-3 border-b border-border">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <a href={`tel:${profileData.phone}`} className="text-foreground hover:text-primary transition-colors">
                    {profileData.phone}
                  </a>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <a href={`mailto:${profileData.email}`} className="text-foreground hover:text-primary transition-colors truncate">
                    {profileData.email}
                  </a>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{profileData.city}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-2 p-2.5 rounded-lg",
                        "bg-muted/50 hover:bg-muted",
                        "text-sm text-muted-foreground hover:text-foreground",
                        "transition-all duration-200 hover:scale-[1.02]"
                      )}
                    >
                      <link.icon className="w-4 h-4 text-primary" />
                      <span className="truncate">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}