# Data Models

## CourseFeature
```ts 
class CourseFeature {
  title: string // length = 40
  id: number // autoincrement is fine for this
  icon: string // fontawesome/glyphicon type monochromatic icon name
  description: // length 200
}
```

## CourseReview

```ts
class CourseReview {
  id: number //autoincr
  reviewer: string
  imageUrl: string // url of image of reviewer
  body: string
  course: Course
  rating: number // [1-10 value, 4.5 stars == 9/10]  
  link: string // link to original review location
}
```

## CourseTopic 
```ts 
class CourseTopic {
  id: number // autoincrement is fine
  title: string // length = 30
  description: string
  maxLectures: number
  minLectures: number
  maxDuration: number //minutes
  minDuration: number //minutes
  subtopics: string []
}
```

## CourseFaq 
```ts 
class CourseFaq {
  id: number // autoincr
  ques: string
  ans: string
}
```

## Course
Data Fields

```ts
class Course {
  name: string // length = 30
  id: string
  tagline: string // length = 100
  description: string
  type: Enum(offline|online)
  batches: Batch[]
  features: CourseFeature[]
  topics: CourseTopic[]
  mentors: Member[]
  faq: CourseFaq[]
  reviews: CourseReview[]
}

```

## Center
Data fields

```ts
class Center {
  name: string
  id: string
  contactNo: string //validate via google-libphonenumber
  email: string // Joi email
  batches: Batch[]
  googleMapLink: string //url
  incharge: Member
  
}

```

## Member

```ts
class Teacher {
  id: string // size = 2 to create teacher code
  name: string
  bio: string
  imageUrl: string // url to image location
  designation: string
  role: Enum (employee | admin | intern)
  featured: boolean
  order: number
}
```

## Batch

```ts
class Batch {
  teachers: Member[]
  course: Course
  center: Center
  startDate: date
  endDate: date
  enrollmentStartDate: date
  enrollmentEndDate: date
  lectureStartTime: string // length 4 = military hours time like 1400
  lectureEndTime: string // length 4 = military hours time like 1400
  markedPrice: number
  sellPrice: number
}
```
