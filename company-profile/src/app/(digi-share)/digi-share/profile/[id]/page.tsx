import { Metadata } from "next";
import UserProfilePage from "@/components/core/digi-share/UserProfilePage";

import { getAuthorByIdForMetadata } from "@/lib/services/authorService.server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const author = await getAuthorByIdForMetadata(id);
    
    if (!author) {
      return {
        title: "Profil Pengguna - Digi-Share | Digiforma Tech Solution",
        description:
          "Lihat profil pengguna dan artikel-artikel yang telah dipublikasikan di Digi-Share.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    return {
      title: `${author.name || "Pengguna"} - Profil Digi-Share | Digiforma Tech Solution`,
      description:
        author.bio
          ? `${author.bio.substring(0, 160)}... Lihat semua artikel dari ${author.name} di Digi-Share.`
          : `Lihat profil dan artikel-artikel dari ${author.name} di Digi-Share. Jelajahi konten menarik dari komunitas.`,
      openGraph: {
        title: `${author.name} - Profil Digi-Share`,
        description:
          author.bio || `Lihat profil dan artikel dari ${author.name}`,
        type: "profile",
        url: `/digi-share/profile/${id}`,
        images: author.avatar ? [
          {
            url: author.avatar,
            width: 400,
            height: 400,
            alt: author.name || "User Profile",
          }
        ] : [],
      },
      twitter: {
        card: "summary",
        title: `${author.name} - Profil Digi-Share`,
        description: author.bio || `Lihat profil dan artikel dari ${author.name}`,
        images: author.avatar ? [author.avatar] : [],
      },
    };
  } catch (error) {
    return {
      title: "Profil Pengguna - Digi-Share | Digiforma Tech Solution",
      description:
        "Lihat profil pengguna dan artikel-artikel yang telah dipublikasikan di Digi-Share.",
    };
  }
}

export default function ProfilePageRoute() {
  return <UserProfilePage />;
}

