import type { Course, GalleryItem, Placement, Testimonial, VideoTestimonial } from "@/lib/types";

export const mockCourses: Course[] = [
  {
    id: "1",
    name: "B.Sc Medical Lab Technology",
    category: "Lab Sciences",
    duration: "3 Years",
    type: "Degree",
    description:
      "Hands-on training in diagnostic pathology, hematology, biochemistry, and clinical lab workflows.",
    active: true,
  },
  {
    id: "2",
    name: "B.Sc Radiology & Imaging",
    category: "Radiology",
    duration: "3 Years",
    type: "Degree",
    description:
      "Learn X-ray, CT, MRI, and imaging protocols with practical exposure and clinical guidance.",
    active: true,
  },
  {
    id: "3",
    name: "B.Sc OT Technology",
    category: "Surgical Support",
    duration: "3 Years",
    type: "Degree",
    description:
      "Build operation theatre skills, sterile procedures, anesthesia support, and patient safety practices.",
    active: true,
  },
  {
    id: "4",
    name: "Diploma in Nursing Assistant",
    category: "Nursing",
    duration: "1 Year",
    type: "Diploma",
    description:
      "Core nursing care, bedside assistance, ward management, and hospital etiquette for entry-level roles.",
    active: true,
  },
  {
    id: "5",
    name: "Diploma in Physiotherapy",
    category: "Rehabilitation",
    duration: "2 Years",
    type: "Diploma",
    description:
      "Practical physiotherapy techniques for musculoskeletal, neuro, and post-operative rehabilitation.",
    active: true,
  },
  {
    id: "6",
    name: "Certificate in Healthcare Management",
    category: "Healthcare Admin",
    duration: "6 Months",
    type: "Certificate",
    description:
      "Develop hospital operations, patient experience, and healthcare administration fundamentals.",
    active: true,
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    student_name: "Muskan Kapoor",
    course: "B.Sc MLT",
    hospital: "Fortis Healthcare",
    quote:
      "The practical sessions gave me confidence before my internship. I got placed within a week of results.",
    photo_url: "https://cdn.yourdomain.com/students/muskan.jpg",
    active: true,
  },
  {
    id: "2",
    student_name: "Vinay Kumar",
    course: "B.Sc Radiology",
    hospital: "Medanta",
    quote:
      "Faculty mentorship was excellent. I learned exactly what hospitals expect from fresh professionals.",
    photo_url: "https://cdn.yourdomain.com/students/vinay.jpg",
    active: true,
  },
  {
    id: "3",
    student_name: "Bhawna Thakur",
    course: "Diploma Nursing",
    hospital: "Apollo Hospitals",
    quote:
      "From admissions to placement support, the team guided me at every step. It changed my career path.",
    photo_url: "https://cdn.yourdomain.com/students/bhawna.jpg",
    active: true,
  },
  {
    id: "4",
    student_name: "Rohit Sharma",
    course: "B.Sc OT Technology",
    hospital: "Max Healthcare",
    quote:
      "The OT simulation lab prepared me for real surgery environments and hospital discipline.",
    photo_url: "https://cdn.yourdomain.com/students/rohit.jpg",
    active: true,
  },
  {
    id: "5",
    student_name: "Priya Tomar",
    course: "Certificate HM",
    hospital: "Narayana Health",
    quote:
      "The curriculum was practical and focused. I still use those concepts every day at work.",
    photo_url: "https://cdn.yourdomain.com/students/priya.jpg",
    active: true,
  },
  {
    id: "6",
    student_name: "Siddhant Kumar",
    course: "Physiotherapy",
    hospital: "AIIMS Rishikesh",
    quote:
      "The discipline and exposure at GD Goenka helped me transition smoothly into a demanding hospital role.",
    photo_url: "https://cdn.yourdomain.com/students/siddhant.jpg",
    active: true,
  },
];

export const mockVideoTestimonials: VideoTestimonial[] = [
  {
    id: "1",
    student_name: "Naresh Rawat",
    course: "B.Sc MLT",
    video_url: "https://cdn.yourdomain.com/videos/naresh.mp4",
    thumbnail_url: "https://cdn.yourdomain.com/thumbnails/naresh.jpg",
    active: true,
  },
  {
    id: "2",
    student_name: "Shiza Begum",
    course: "Diploma Nursing",
    video_url: "https://cdn.yourdomain.com/videos/shiza.mp4",
    thumbnail_url: "https://cdn.yourdomain.com/thumbnails/shiza.jpg",
    active: true,
  },
  {
    id: "3",
    student_name: "Tanisha Joshi",
    course: "B.Sc Radiology",
    video_url: "https://cdn.yourdomain.com/videos/tanisha.mp4",
    thumbnail_url: "https://cdn.yourdomain.com/thumbnails/tanisha.jpg",
    active: true,
  },
  {
    id: "4",
    student_name: "Kusum Bisht",
    course: "B.Sc OT Technology",
    video_url: "https://cdn.yourdomain.com/videos/kusum.mp4",
    thumbnail_url: "https://cdn.yourdomain.com/thumbnails/kusum.jpg",
    active: true,
  },
];

export const mockPlacements: Placement[] = [
  { id: "1", hospital_name: "Fortis Healthcare", city: "Delhi", type: "Multi-specialty", active: true },
  { id: "2", hospital_name: "Medanta", city: "Gurugram", type: "Multi-specialty", active: true },
  { id: "3", hospital_name: "Apollo Hospitals", city: "Delhi", type: "Tertiary Care", active: true },
  { id: "4", hospital_name: "Max Healthcare", city: "Dehradun", type: "Multi-specialty", active: true },
  { id: "5", hospital_name: "AIIMS Rishikesh", city: "Rishikesh", type: "Government", active: true },
  { id: "6", hospital_name: "Narayana Health", city: "Jaipur", type: "Cardiac Care", active: true },
  { id: "7", hospital_name: "BLK Super Speciality", city: "Delhi", type: "Super-specialty", active: true },
  { id: "8", hospital_name: "Manipal Hospitals", city: "Noida", type: "Multi-specialty", active: true },
];

export const mockGallery: GalleryItem[] = [
  {
    id: "1",
    image_url: "https://cdn.yourdomain.com/gallery/campus-main.jpg",
    caption: "Main Campus Building",
    category: "Campus",
    active: true,
  },
  {
    id: "2",
    image_url: "https://cdn.yourdomain.com/gallery/lab-mlt.jpg",
    caption: "Medical Laboratory",
    category: "Labs",
    active: true,
  },
  {
    id: "3",
    image_url: "https://cdn.yourdomain.com/gallery/radiology.jpg",
    caption: "Radiology Unit",
    category: "Labs",
    active: true,
  },
  {
    id: "4",
    image_url: "https://cdn.yourdomain.com/gallery/classroom.jpg",
    caption: "Smart Classroom",
    category: "Classrooms",
    active: true,
  },
  {
    id: "5",
    image_url: "https://cdn.yourdomain.com/gallery/library.jpg",
    caption: "Library",
    category: "Campus",
    active: true,
  },
  {
    id: "6",
    image_url: "https://cdn.yourdomain.com/gallery/physio-lab.jpg",
    caption: "Physiotherapy Lab",
    category: "Labs",
    active: true,
  },
  {
    id: "7",
    image_url: "https://cdn.yourdomain.com/gallery/events.jpg",
    caption: "Annual Healthcare Event",
    category: "Events",
    active: true,
  },
];
