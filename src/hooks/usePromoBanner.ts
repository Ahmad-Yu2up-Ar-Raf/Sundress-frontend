import { useLocalStorage } from './useLocalStorage';

interface PromoBannerConfig {
  promoId: string;
  showBanner: boolean;
  lastClosed?: string; // Optional: untuk tracking kapan terakhir ditutup
}

/**
 * Custom hook untuk mengelola state promo banner
 * @param promoId - ID unik untuk promo (untuk multiple promo)
 * @param defaultShow - Default value apakah banner ditampilkan
 * @returns object dengan state dan actions
 */
export function usePromoBanner(promoId: string = 'default', defaultShow: boolean = true) {
  const [promoConfig, setPromoConfig, isLoading] = useLocalStorage<PromoBannerConfig>(
    `promo-banner-${promoId}`,
    { 
      promoId, 
      showBanner: defaultShow 
    }
  );

  // Pastikan promoId match dan showBanner true
  const isShowPromo = !isLoading && promoConfig.showBanner && promoConfig.promoId === promoId;

  const closePromoBanner = () => {
    console.log(`🚫 Closing promo banner: ${promoId}`);
    setPromoConfig({
      promoId,
      showBanner: false,
      lastClosed: new Date().toISOString()
    });
  };

  const showPromoBanner = () => {
    console.log(`✅ Showing promo banner: ${promoId}`);
    setPromoConfig({
      promoId,
      showBanner: true,
    });
  };

  const resetPromoBanner = () => {
    console.log(`🔄 Resetting promo banner: ${promoId}`);
    setPromoConfig({
      promoId,
      showBanner: defaultShow,
    });
  };

  // Debug logging
  console.log(`🏷️ Promo ${promoId} - isLoading: ${isLoading}, isShowPromo: ${isShowPromo}`, promoConfig);

  return {
    isShowPromo,
    isLoading,
    closePromoBanner,
    showPromoBanner,
    resetPromoBanner,
    promoConfig, // Expose untuk debugging jika diperlukan
    // Helper functions
    forceShow: () => showPromoBanner(), // Alias untuk clarity
    forceHide: () => closePromoBanner(), // Alias untuk clarity
  };
}