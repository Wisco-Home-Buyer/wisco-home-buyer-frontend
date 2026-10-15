const API_ORIGIN = (
  process.env.NEXT_PUBLIC_API_URL || "https://tygry8.saikat.com.bd"
).replace(/\/$/, "");

export type ListingStatus = "AVAILABLE" | "UNDER_CONTRACT" | "SOLD";

export interface PublicWholesaleListing {
  id: string;
  title: string;
  description: string;
  price: number;
  street: string;
  city: string;
  state: string;
  zip: string;
  bedrooms: number | null;
  bathrooms: number | null;
  squareFeet: number | null;
  videoUrl: string | null;
  status: ListingStatus;
  images: string[];
  createdAt: string;
}

interface ListEnvelope {
  data: PublicWholesaleListing[];
}

interface DetailEnvelope {
  data: PublicWholesaleListing;
}

export const STATUS_LABELS: Record<ListingStatus, string> = {
  AVAILABLE: "Available",
  UNDER_CONTRACT: "Under Contract",
  SOLD: "Sold",
};

export async function fetchPublicListings(): Promise<
  PublicWholesaleListing[] | null
> {
  try {
    const res = await fetch(
      `${API_ORIGIN}/api/wholesale-listings/public?limit=100`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const body = (await res.json()) as ListEnvelope;
    return body.data;
  } catch {
    return null;
  }
}

export async function fetchPublicListing(
  id: string
): Promise<PublicWholesaleListing | null> {
  try {
    const res = await fetch(
      `${API_ORIGIN}/api/wholesale-listings/public/${encodeURIComponent(id)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const body = (await res.json()) as DetailEnvelope;
    return body.data;
  } catch {
    return null;
  }
}

export function resolveAssetUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${API_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

/** Returns an embeddable URL for YouTube / Vimeo links, or null for anything else. */
export function toEmbedUrl(videoUrl: string): string | null {
  let url: URL;
  try {
    url = new URL(videoUrl);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "");

  if (host === "youtu.be") {
    const id = url.pathname.slice(1);
    return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}` : null;
  }

  if (host === "youtube.com" || host === "m.youtube.com") {
    const id = url.searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}` : null;
  }

  if (host === "vimeo.com") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id && /^\d+$/.test(id)
      ? `https://player.vimeo.com/video/${id}`
      : null;
  }

  return null;
}
