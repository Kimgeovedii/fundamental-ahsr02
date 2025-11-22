export const getLocale = async (lang: string) => {
  try {
    // Menggunakan dynamic import untuk memuat file JSON berdasarkan bahasa
    const data = await import(`../locale/${lang}.json`);
    return data.default;
  } catch (error) {
    // Fallback jika file locale untuk lang tidak ditemukan
    console.error(
      `Error loading locale for ${lang}, falling back to 'id'.`,
      error
    );
    const fallbackData = await import("../locale/id.json");
    return fallbackData.default;
  }
};
