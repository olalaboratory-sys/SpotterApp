// In-app purchases — abstraction layer.
//
// Today this is a STUB so the paywall is fully interactive without native
// billing. To go live, implement these with StoreKit 2 via a library such as
// `react-native-iap` or RevenueCat: load products, run the purchase/restore,
// validate the receipt server-side, then resolve. The paywall already awaits
// these and only then flips the account's trial/subscription state.

export type PlanId = 'monthly' | 'yearly' | 'lifetime';

export type PurchaseResult = { success: boolean; planId: PlanId };
export type RestoreResult = { restored: boolean; planId?: PlanId };

// App Store product identifiers (create these in App Store Connect).
export const PRODUCT_IDS: Record<PlanId, string> = {
  monthly: 'com.spotterapp.spotter.premium.monthly',
  yearly: 'com.spotterapp.spotter.premium.yearly',
  lifetime: 'com.spotterapp.spotter.premium.lifetime',
};

/** Start a purchase (or 7-day trial for subscription plans). */
export async function purchasePlan(planId: PlanId): Promise<PurchaseResult> {
  // TODO: replace with StoreKit 2 purchase + server-side receipt validation.
  await new Promise(r => setTimeout(r, 500));
  return { success: true, planId };
}

/** Restore previously purchased entitlements. */
export async function restorePurchases(): Promise<RestoreResult> {
  // TODO: replace with StoreKit 2 restore + entitlement check.
  await new Promise(r => setTimeout(r, 500));
  return { restored: false };
}
