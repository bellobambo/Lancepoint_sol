"use server";

import { getCollection } from "@/lib/db";
import { milestoneSubmissionSchema } from "@/lib/SubmitGig";

export async function submitMilestone(formData) {
  try {
    const proofLinks = [];
    let linkIndex = 0;
    while (formData.has(`proofLinks[${linkIndex}]`)) {
      const link = formData.get(`proofLinks[${linkIndex}]`);
      if (link.trim() !== "") {
        proofLinks.push(link);
      }
      linkIndex++;
    }

    const rawData = {
      gigId: formData.get("gigId"),
      milestoneIndex: parseInt(formData.get("milestoneIndex")),
      jobTitle: formData.get("jobTitle"),
      jobDescription: formData.get("jobDescription"),
      userId: formData.get("userId"),
      applicantId: formData.get("applicantId"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      paymentAmount: formData.get("paymentAmount"),
      paymentToken: formData.get("paymentToken"),
      submissionDescription: formData.get("submissionDescription"),
      proofLinks,
    };

    const validated = milestoneSubmissionSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const gigsCollection = await getCollection("submitedGigs");
    if (!gigsCollection) {
      return {
        success: false,
        errors: { database: "Failed to connect to database" },
      };
    }

    // Change from insertOne to updateOne with upsert
    const result = await gigsCollection.updateOne(
      { _id: validated.data.gigId },
      {
        $push: {
          submissions: {
            milestoneIndex: validated.data.milestoneIndex,
            submissionDescription: validated.data.submissionDescription,
            proofLinks: validated.data.proofLinks,
            submittedAt: new Date(),
            completed: true,
          },
        },
        $set: {
          [`milestones.${validated.data.milestoneIndex}.status`]: "submitted",

          jobTitle: validated.data.jobTitle,
          jobDescription: validated.data.jobDescription,
          userId: validated.data.userId,
          applicantId: validated.data.applicantId,
          startDate: validated.data.startDate,
          endDate: validated.data.endDate,
          paymentAmount: validated.data.paymentAmount,
          paymentToken: validated.data.paymentToken,
        },
      },
      { upsert: true }
    );

    if (result.modifiedCount === 0 && result.upsertedCount === 0) {
      return {
        success: false,
        errors: { database: "Failed to submit milestone" },
      };
    }

    return {
      success: true,
      message: "Milestone submitted successfully",
    };
  } catch (error) {
    console.error("Error submitting milestone:", error);
    return {
      success: false,
      errors: {
        database: "An error occurred while submitting your milestone.",
      },
    };
  }
}
