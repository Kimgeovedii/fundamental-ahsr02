export const getLocale = async (lang: string) => {
  try {
    const data = await import(`../locale/${lang}.json`);
    return data.default;
  } catch (error) {
    // Silent fail - fallback to 'id' locale
    const fallbackData = await import("../locale/id.json");
    return fallbackData.default;
  }
};
