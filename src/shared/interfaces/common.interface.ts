// Common interfaces for the application

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FilterParams {
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface CostBreakdown {
  materialCost: number;
  laborCost: number;
  equipmentCost: number;
  totalCost: number;
}
