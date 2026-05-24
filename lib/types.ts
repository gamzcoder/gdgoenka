export interface Course {
  id: string;
  name: string;
  category: string;
  duration: string;
  type: "Degree" | "Diploma" | "Certificate";
  description: string;
  active: boolean;
}

export interface Testimonial {
  id: string;
  student_name: string;
  course: string;
  hospital: string;
  quote: string;
  photo_url: string;
  active: boolean;
}

export interface VideoTestimonial {
  id: string;
  student_name: string;
  course: string;
  video_url: string;
  thumbnail_url: string;
  active: boolean;
}

export interface Placement {
  id: string;
  hospital_name: string;
  city: string;
  type: string;
  active: boolean;
}

export type GalleryCategory = "All" | "Labs" | "Classrooms" | "Campus" | "Events";

export interface GalleryItem {
  id: string;
  image_url: string;
  caption: string;
  category: GalleryCategory;
  active: boolean;
}

export interface LeadFormData {
  name: string;
  phone: string;
  course: string;
  source: string;
}
