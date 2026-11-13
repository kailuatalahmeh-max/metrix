export type Workshop = {
  id: number;
  customerName: string;
  productName: string;
  region: string;
  meters: number;
  createdAt: string;
};

export type WorkshopForm = Omit<Workshop, "id" | "createdAt" | "meters"> & {
  meters: string;
};