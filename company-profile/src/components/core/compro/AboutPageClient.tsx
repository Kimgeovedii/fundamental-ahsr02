"use client";
import * as React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Building2,
  Shield,
  Code,
  LucideIcon,
  Users,
  Target,
  Award,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { getLocale } from "@/lib/get-locale";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";

const IconMap: { [key: string]: LucideIcon } = {
  FileText,
  Building2,
  Shield,
  Code,
};

interface TeamMember {
  name: {
    first: string;
    last: string;
    title: string;
  };
  email: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  location: {
    city: string;
    country: string;
  };
}

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: keyof typeof IconMap;
}

interface AboutPageData {
  page_title: string;
  page_description: string;
  hero: {
    heading: string;
    subheading: string;
    description: string;
  };
  company: {
    heading: string;
    background: string;
    vision_label: string;
    vision: string;
    mission_label: string;
    mission: string;
  };
  services: {
    heading: string;
    description: string;
    items: ServiceItem[];
  };
  team: {
    heading: string;
    subheading: string;
    description: string;
  };
}

const AboutPageClient = () => {
  const { lang, hydrated } = useHydratedLanguageStore();
  const [aboutData, setAboutData] = React.useState<AboutPageData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>([]);
  const [isLoadingTeam, setIsLoadingTeam] = React.useState(true);

  React.useEffect(() => {
    if (hydrated) {
      setIsLoading(true);
      getLocale(lang)
        .then((data: any) => {
          if (data && data.about_page) {
            setAboutData(data.about_page as AboutPageData);
          }
        })
        .catch(() => {
          setAboutData(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [lang, hydrated]);

  React.useEffect(() => {
    setIsLoadingTeam(true);
    fetch("https://randomuser.me/api/?results=6&nat=us")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.results) {
          setTeamMembers(data.results);
        }
      })
      .catch(() => {
        setTeamMembers([]);
      })
      .finally(() => {
        setIsLoadingTeam(false);
      });
  }, []);

  if (isLoading || !hydrated || !aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <Spinner />
      </div>
    );
  }

  const data = aboutData;

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-blue-950 dark:to-indigo-950 text-white py-20 md:py-32 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            {data.hero.heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 dark:text-blue-200 mb-4"
          >
            {data.hero.subheading}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-blue-200 dark:text-blue-300 max-w-3xl mx-auto"
          >
            {data.hero.description}
          </motion.p>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {data.company.heading}
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {data.company.background}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <Card className="bg-blue-50 dark:bg-gray-800 border-blue-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Target className="w-8 h-8 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          {data.company.vision_label}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {data.company.vision}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 dark:bg-gray-800 border-green-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Award className="w-8 h-8 text-green-600 dark:text-green-400 shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          {data.company.mission_label}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {data.company.mission}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {data.services.heading}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {data.services.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.services.items.map((service, index) => {
              const IconComponent = IconMap[service.icon];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow duration-300 hover:border-blue-500 dark:hover:border-blue-400 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {IconComponent && (
                          <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                            <IconComponent className="w-6 h-6" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {data.team.heading}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
              {data.team.subheading}
            </p>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {data.team.description}
            </p>
          </motion.div>

          {isLoadingTeam ? (
            <div className="flex justify-center items-center py-12">
              <Spinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={`${member.name.first}-${member.name.last}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6 text-center">
                      <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-blue-100 dark:ring-gray-700">
                        <Image
                          src={member.picture.large}
                          alt={`${member.name.first} ${member.name.last}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {member.name.first} {member.name.last}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {member.name.title}
                      </p>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <p className="flex items-center justify-center gap-2">
                          <Globe className="w-4 h-4" />
                          {member.location.city}, {member.location.country}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AboutPageClient;

