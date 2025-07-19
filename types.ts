

export enum ServiceStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}

export enum ServiceType {
  SERVICE_OFFERED = 'SERVICE_OFFERED',
  JOB_REQUESTED = 'JOB_REQUESTED',
}

export enum ServiceDeliveryMethod {
  CLIENT_LOCATION = 'CLIENT_LOCATION', // Client's Location / Home Service
  REMOTE_ONLINE = 'REMOTE_ONLINE',     // Remote / Online
  PROVIDER_OFFICE = 'PROVIDER_OFFICE', // Provider's Office / Workplace
}

export interface UserProfile {
  id: string; // UUID from Supabase, matches auth.users.id
  name: string;
  email?: string | null; 
  avatar_url?: string | null; 
  location: string;
  contactNumber?: string | null; 
  bio?: string | null;
  created_at?: string;
  average_rating?: number | null; // Calculated dynamically
  review_count?: number | null;   // Calculated dynamically
}

export interface Service {
  id: string; // UUID from Supabase
  title: string;
  description: string;
  price?: number | null; 
  price_unit?: 'per_hour' | 'per_day' | 'fixed' | 'per_session' | 'negotiable' | null;
  location: string;
  images: string[]; 
  provider_id: string; 
  provider?: Pick<UserProfile, 'id' | 'name' | 'avatar_url' | 'location' | 'bio'>; 
  created_at?: string; 
  type: ServiceType; 
  tags?: string[] | null; 
  delivery_methods?: ServiceDeliveryMethod[] | null; 
  average_rating?: number | null; // Calculated dynamically
  review_count?: number | null;   // Calculated dynamically
  status: ServiceStatus;
  deleted_at?: string | null;
}

export enum ReviewType {
  TO_PROVIDER = 'TO_PROVIDER', // Inquirer reviewing the Provider/Service
  TO_INQUIRER = 'TO_INQUIRER', // Provider reviewing the Inquirer
}

export interface Review {
  id: string; // UUID
  created_at: string;
  inquiry_id: string; // FK to inquiries.id
  reviewer_id: string; // FK to profiles.id (who wrote the review)
  reviewer?: Pick<UserProfile, 'id' | 'name' | 'avatar_url'>; // Optional: for display
  reviewee_id: string; // FK to profiles.id (who is being reviewed)
  service_id?: string | null; // FK to services.id (the service related to the inquiry)
  rating: number; // 1-5 stars
  comment: string; // Feedback statement
  images?: string[] | null; // Optional URLs for uploaded images
  review_type: ReviewType;
}


export interface IconProps {
  className?: string;
}

export enum InquiryUrgency {
  ASAP = 'ASAP',
  WITHIN_A_WEEK = 'WITHIN_A_WEEK',
  FLEXIBLE = 'FLEXIBLE',
  QUOTES_ONLY = 'QUOTES_ONLY',
}

export enum InquiryGoal {
  GET_QUOTE = 'GET_QUOTE',
  SCHEDULE_SERVICE = 'SCHEDULE_SERVICE',
  ASK_QUESTION = 'ASK_QUESTION',
  CONSULTATION = 'CONSULTATION', 
  OTHER = 'OTHER',
}

export enum InquiryStatus {
  NEW = 'NEW',
  VIEWED_BY_PROVIDER = 'VIEWED_BY_PROVIDER',
  VIEWED_BY_INQUIRER = 'VIEWED_BY_INQUIRER', 
  PROVIDER_RESPONDED = 'PROVIDER_RESPONDED', 
  INQUIRER_RESPONDED = 'INQUIRER_RESPONDED', 
  CLOSED = 'CLOSED', 
  PROVIDER_ACCEPTED = 'PROVIDER_ACCEPTED',
  PROVIDER_DECLINED = 'PROVIDER_DECLINED',
  PROVIDER_MARKED_COMPLETED = 'PROVIDER_MARKED_COMPLETED',
  COMPLETED = 'COMPLETED', 
  CANCELLED_BY_INQUIRER = 'CANCELLED_BY_INQUIRER',
}

export interface Inquiry {
  id: string;
  created_at: string;
  service_id: string;
  service?: Pick<Service, 'id' | 'title' | 'price' | 'price_unit' | 'delivery_methods'>; 
  inquirer_id: string;
  inquirer?: Pick<UserProfile, 'id' | 'name' | 'avatar_url'>; 
  provider_id: string;
  provider?: Pick<UserProfile, 'id' | 'name' | 'avatar_url'>; 
  problem_description: string;
  images?: string[] | null; 
  urgency: InquiryUrgency;
  preferred_start_date?: string | null; 
  consumer_selected_delivery_methods?: ServiceDeliveryMethod[] | null;
  consumer_location_for_service?: string | null;
  consumer_availability?: string | null;
  specific_instructions?: string | null;
  budget?: string | null; 
  inquiry_goal: InquiryGoal;
  other_inquiry_goal_details?: string | null; 
  consumer_name: string;
  consumer_location_contact: string; 
  consumer_phone: string;
  consumer_email?: string | null; // Added consumer_email
  status: InquiryStatus;
  last_updated: string;
  provider_marked_completed?: boolean;
  inquirer_marked_completed?: boolean;
}

export type InquiryFormData = Omit<Inquiry, 'id' | 'created_at' | 'last_updated' | 'status' | 'service' | 'inquirer' | 'provider'>;

export enum ReportReason {
  SPAM = 'SPAM',
  SCAM_FRAUD = 'SCAM_FRAUD',
  INAPPROPRIATE_CONTENT = 'INAPPROPRIATE_CONTENT',
  PROHIBITED_SERVICE = 'PROHIBITED_SERVICE',
  INFRINGEMENT = 'INFRINGEMENT', // e.g., Copyright/Trademark
  OTHER = 'OTHER',
}

export enum ReportStatus {
  PENDING = 'PENDING',
  REVIEWED_ACTION_TAKEN = 'REVIEWED_ACTION_TAKEN',
  REVIEWED_NO_ACTION = 'REVIEWED_NO_ACTION',
}

export interface Report {
  id: string; // UUID
  created_at: string;
  reporter_id: string; // FK to profiles.id (who reported)
  reported_user_id?: string | null; // FK to profiles.id (who was reported)
  reported_service_id?: string | null; // FK to services.id
  reasons: ReportReason[];
  details?: string | null;
  status: ReportStatus;
}

export enum NotificationType {
  NEW_INQUIRY = 'NEW_INQUIRY',
  INQUIRY_ACCEPTED = 'INQUIRY_ACCEPTED',
  INQUIRY_DECLINED = 'INQUIRY_DECLINED',
  INQUIRY_CANCELLED = 'INQUIRY_CANCELLED',
  INQUIRY_MARKED_COMPLETED = 'INQUIRY_MARKED_COMPLETED',
  INQUIRY_CONFIRMED_COMPLETED = 'INQUIRY_CONFIRMED_COMPLETED',
  NEW_REVIEW = 'NEW_REVIEW',
}

export interface Notification {
  id: string; // UUID
  created_at: string;
  recipient_id: string;
  sender_id?: string | null;
  sender?: Pick<UserProfile, 'id' | 'name' | 'avatar_url'>; // For display
  type: NotificationType;
  content: string;
  link: string; // e.g., /dashboard/inquiries?inquiryId=...
  is_read: boolean;
  inquiry_id?: string | null;
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      inquiries: {
        Row: Inquiry
        Insert: InquiryFormData & { status?: InquiryStatus; last_updated?: string; }
        Update: Partial<InquiryFormData> & { last_updated?: string; status?: InquiryStatus; }
      }
      notifications: {
        Row: Notification
        Insert: Omit<Notification, "id" | "created_at" | "sender">
        Update: Pick<Notification, "is_read">
      }
      profiles: {
        Row: UserProfile
        Insert: {
          id: string
          name: string
          email?: string | null
          avatar_url?: string | null
          location: string
          contactNumber?: string | null
          bio?: string | null
        }
        Update: Partial<{
          name: string
          email: string | null
          avatar_url: string | null
          location: string
          contactNumber: string | null
          bio: string | null
        }>
      }
      push_subscriptions: {
        Row: {
          id: string
          user_id: string
          subscription: Json
          created_at: string
        }
        Insert: {
          user_id: string
          subscription: Json
        }
        Update: Partial<{
          subscription: Json
        }>
      }
      reports: {
        Row: Report
        Insert: Omit<Report, "id" | "created_at" | "status">
        Update: Partial<Omit<Report, "id" | "created_at" | "reporter_id">>
      }
      reviews: {
        Row: Review
        Insert: Omit<Review, "id" | "created_at" | "reviewer">
        Update: Partial<Omit<Review, "id" | "created_at" | "reviewer" | "inquiry_id" | "reviewer_id" | "reviewee_id">>
      }
      services: {
        Row: Service
        Insert: Omit<Service, "id" | "created_at" | "provider" | "average_rating" | "review_count">
        Update: Partial<Omit<Service, "id" | "created_at" | "provider" | "provider_id" | "average_rating" | "review_count">>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      inquiry_goal: "GET_QUOTE" | "SCHEDULE_SERVICE" | "ASK_QUESTION" | "CONSULTATION" | "OTHER"
      inquiry_status: "NEW" | "VIEWED_BY_PROVIDER" | "VIEWED_BY_INQUIRER" | "PROVIDER_RESPONDED" | "INQUIRER_RESPONDED" | "CLOSED" | "PROVIDER_ACCEPTED" | "PROVIDER_DECLINED" | "PROVIDER_MARKED_COMPLETED" | "COMPLETED" | "CANCELLED_BY_INQUIRER"
      inquiry_urgency: "ASAP" | "WITHIN_A_WEEK" | "FLEXIBLE" | "QUOTES_ONLY"
      notification_type: "NEW_INQUIRY" | "INQUIRY_ACCEPTED" | "INQUIRY_DECLINED" | "INQUIRY_CANCELLED" | "INQUIRY_MARKED_COMPLETED" | "INQUIRY_CONFIRMED_COMPLETED" | "NEW_REVIEW"
      report_reason: "SPAM" | "SCAM_FRAUD" | "INAPPROPRIATE_CONTENT" | "PROHIBITED_SERVICE" | "INFRINGEMENT" | "OTHER"
      report_status: "PENDING" | "REVIEWED_ACTION_TAKEN" | "REVIEWED_NO_ACTION"
      review_type: "TO_PROVIDER" | "TO_INQUIRER"
      service_delivery_method: "CLIENT_LOCATION" | "REMOTE_ONLINE" | "PROVIDER_OFFICE"
      service_status: "ACTIVE" | "DELETED"
      service_type: "SERVICE_OFFERED" | "JOB_REQUESTED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}