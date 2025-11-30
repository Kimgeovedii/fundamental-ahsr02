"use client";
import * as React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Building2,
  Shield,
  Code,
  LucideIcon,
  Mail,
  Phone,
  MapPin,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { getLocale } from "@/lib/get-locale";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const IconMap: { [key: string]: LucideIcon } = {
  FileText,
  Building2,
  Shield,
  Code,
};

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon: keyof typeof IconMap;
}

interface ServicesData {
  page_title: string;
  page_description: string;
  heading: string;
  subheading: string;
  description: string;
  items: ServiceItem[];
  contact: {
    heading: string;
    subheading: string;
    description: string;
    form: {
      company_name: string;
      name: string;
      email: string;
      phone: string;
      service_interest: string;
      message: string;
      submit: string;
      submitting: string;
      success: string;
      error: string;
    };
  };
}

const ServicesPageClient = () => {
  const { lang, hydrated } = useHydratedLanguageStore();
  const [servicesData, setServicesData] = React.useState<ServicesData | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [formData, setFormData] = React.useState({
    company_name: "",
    name: "",
    email: "",
    phone: "",
    service_interest: "",
    message: "",
  });

  React.useEffect(() => {
    if (hydrated) {
      setIsLoading(true);
      getLocale(lang)
        .then((data: any) => {
          if (data && data.services) {
            setServicesData(data.services as ServicesData);
          }
        })
        .catch(() => {
          setServicesData(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [lang, hydrated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        servicesData?.contact.form.success ||
          "Thank you! We will contact you soon."
      );
      setFormData({
        company_name: "",
        name: "",
        email: "",
        phone: "",
        service_interest: "",
        message: "",
      });
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading || !hydrated || !servicesData) {
    return (
      <main className="min-h-screen">
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-blue-950 dark:to-indigo-950 text-white py-20 md:py-32 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Skeleton className="h-16 w-3/4 mx-auto mb-6 bg-white/20" />
            <Skeleton className="h-8 w-1/2 mx-auto mb-4 bg-white/20" />
            <Skeleton className="h-6 w-2/3 mx-auto bg-white/20" />
          </div>
        </section>
        <section className="py-24 px-4 sm:px-8 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  const data = servicesData;

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
            {data.heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 dark:text-blue-200 mb-4"
          >
            {data.subheading}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-blue-200 dark:text-blue-300 max-w-3xl mx-auto"
          >
            {data.description}
          </motion.p>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.items.map((service, index) => {
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
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        {IconComponent && (
                          <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                            <IconComponent className="w-6 h-6" />
                          </div>
                        )}
                        <div className="flex-1">
                          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {service.title}
                          </CardTitle>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2.5">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-baseline gap-2.5 text-sm text-gray-900 dark:text-white"
                          >
                            <span className="flex items-center justify-center w-4 h-4 shrink-0">
                              <Check className="w-full h-full text-green-600 dark:text-green-400" />
                            </span>
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {data.contact.heading}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
              {data.contact.subheading}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {data.contact.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company_name" className="text-gray-900 dark:text-white">
                        {data.contact.form.company_name}
                      </Label>
                      <Input
                        id="company_name"
                        name="company_name"
                        type="text"
                        required
                        value={formData.company_name}
                        onChange={handleChange}
                        placeholder={data.contact.form.company_name}
                        className="text-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-900 dark:text-white">{data.contact.form.name}</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={data.contact.form.name}
                        className="text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-900 dark:text-white">{data.contact.form.email}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={data.contact.form.email}
                        className="text-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-900 dark:text-white">{data.contact.form.phone}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={data.contact.form.phone}
                        className="text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service_interest" className="text-gray-900 dark:text-white">
                      {data.contact.form.service_interest}
                    </Label>
                    <Select
                      value={formData.service_interest}
                      onValueChange={(value) =>
                        setFormData({ ...formData, service_interest: value })
                      }
                      required
                    >
                      <SelectTrigger className="text-gray-900 dark:text-white">
                        <SelectValue
                          placeholder={data.contact.form.service_interest}
                        />
                      </SelectTrigger>
                      <SelectContent className="text-gray-900 dark:text-white">
                        {data.items.map((service) => (
                          <SelectItem key={service.id} value={service.title} className="text-gray-900 dark:text-white">
                            {service.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-900 dark:text-white">{data.contact.form.message}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={data.contact.form.message}
                      className="text-gray-900 dark:text-white"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 text-lg"
                    size="lg"
                  >
                    {isSubmitting
                      ? data.contact.form.submitting
                      : data.contact.form.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <Mail className="w-8 h-8 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Email
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                info@digiforma.com
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <Phone className="w-8 h-8 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Phone
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                +62 812-3456-7890
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <MapPin className="w-8 h-8 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Address
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Jakarta, Indonesia
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPageClient;
