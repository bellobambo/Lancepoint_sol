import { z } from "zod";

export const milestoneSubmissionSchema = z.object({
  gigId: z.string().min(1, "Gig ID is required"),
  milestoneIndex: z.number().min(0, "Milestone index is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  jobDescription: z.string().min(1, "Job description is required"),
  userId: z.string().min(1, "User ID is required"),
  applicantId: z.string().min(1, "Applicant ID is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  paymentAmount: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val)),
  paymentToken: z.string().min(1, "Payment token is required"),
  submissionDescription: z
    .string()
    .min(1, "Submission description must be at least 1 characters long")
    .max(1000, "Submission description cannot exceed 1000 characters"),
  proofLinks: z
    .array(z.string().url("Please enter a valid URL"))
    .nonempty("At least one proof link is required")
    .max(5, "Maximum of 5 proof links allowed")
    .refine((links) => links[0] !== "", {
      message: "First proof link is required",
      path: [0],
    }),
});
