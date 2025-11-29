export const getLocale = async (lang: string) => {
  try {
    const data = await import(`../locale/${lang}.json`);
    return data.default;
  } catch (error) {
    console.error(
      `Error loading locale for ${lang}, falling back to 'id'.`,
      error
    );
    const fallbackData = await import("../locale/id.json");
    return fallbackData.default;
  }
};
