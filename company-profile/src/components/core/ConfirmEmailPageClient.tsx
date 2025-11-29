"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ConfirmEmailPageClient() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6"
          >
            <Mail className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </motion.div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Cek Email Anda
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Kami telah mengirimkan link konfirmasi ke email Anda.
          </p>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Silakan klik link tersebut untuk mengaktifkan akun Anda sebelum masuk.
          </p>

          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-left">
              <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-2">
                Tidak menerima email?
              </p>
              <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Cek folder spam/junk email</li>
                <li>• Pastikan email yang digunakan benar</li>
                <li>• Tunggu beberapa menit, email mungkin masih dalam proses pengiriman</li>
              </ul>
            </div>

            <Link href="/login">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                <span>Ke Halaman Login</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link href="/signup">
              <Button variant="outline" className="w-full">
                Kembali ke Pendaftaran
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

