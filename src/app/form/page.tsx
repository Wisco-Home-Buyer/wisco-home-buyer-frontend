"use client";

import React, { useState, useEffect } from "react";
import { Step1Address } from "./_components/Step1Address";
import { Step2Contact } from "./_components/Step2Contact";
import { Step3Details } from "./_components/Step3Details";
import { Step4Condition } from "./_components/Step4Condition";
import { Step5Occupancy } from "./_components/Step5Occupancy";
import { Step6Timeline } from "./_components/Step6Timeline";
import { Step7UploadQuery } from "./_components/Step7UploadQuery";
import { Step7UploadImages } from "./_components/Step7UploadImages";
import { Step8Review } from "./_components/Step8Review";
import { SuccessSubmitted } from "./_components/SuccessSubmitted";
import { Loading } from "@/components/shared/loading/Loading";

export default function FormPage() {
  const [step, setStep] = useState(1);
  const [hasImages, setHasImages] = useState<boolean | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    address: {
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
    },
    contact: {
      fullName: "",
      phone: "",
      email: "",
    },
    details: {
      bedrooms: "" as number | string,
      bathrooms: "" as number | string,
      squareFeet: "" as number | string,
      yearBuilt: "" as number | string,
      lotSizeAcres: "" as number | string,
    },
    condition: {
      roofCondition: "GOOD",
      kitchenCondition: "GOOD",
      bathroomCondition: "GOOD",
      foundationCondition: "GOOD",
      otherRepairsNeeded: "",
    },
    occupancy: "OWNER_OCCUPIED",
    timeline: "IMMEDIATELY",
    imageUrls: [] as string[],
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadSavedData = () => {
      const savedData = localStorage.getItem("tygry8-form-data");
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          if (parsed.step) setStep(parsed.step);
          if (parsed.hasImages !== undefined) setHasImages(parsed.hasImages);
          if (parsed.formData) setFormData(parsed.formData);
        } catch (e) {
          console.error("Error parsing local storage", e);
        }
      }
      setIsLoaded(true);
    };

    loadSavedData();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "tygry8-form-data",
        JSON.stringify({ step, hasImages, formData })
      );
    }
  }, [step, hasImages, formData, isLoaded]);

  const updateField = <K extends keyof typeof formData>(
    section: K,
    fields: Partial<(typeof formData)[K]> | string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: typeof fields === "object" && !Array.isArray(fields)
        ? { ...prev[section] as object, ...fields }
        : fields,
    }));
  };

  const nextStep = () => {
    if (step < 9) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step === 9) {
      if (hasImages) {
        setStep(8);
      } else {
        setStep(7);
      }
    } else if (step === 8) {
      setStep(7);
    } else if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleFinalSubmit = async () => {
    // Construct response matching the required JSON schema
    const submissionPayload = {
      address: {
        street: formData.address.streetAddress,
        city: formData.address.city,
        state: formData.address.state, 
        zip: formData.address.zipCode
      },
      contact: {
        fullName: formData.contact.fullName,
        phone: formData.contact.phone,
        email: formData.contact.email
      },
      details: {
        bedrooms: Number(formData.details.bedrooms) || 0,
        bathrooms: Number(formData.details.bathrooms) || 0,
        squareFeet: Number(formData.details.squareFeet) || 0,
        yearBuilt: Number(formData.details.yearBuilt) || 0,
        lotSizeAcres: formData.details.lotSizeAcres
      },
      condition: {
        roofCondition: formData.condition.roofCondition,
        kitchenCondition: formData.condition.kitchenCondition,
        bathroomCondition: formData.condition.bathroomCondition,
        foundationCondition: formData.condition.foundationCondition,
        otherRepairsNeeded: formData.condition.otherRepairsNeeded
      },
      occupancy: formData.occupancy,
      timeline: formData.timeline,
      imageUrls: formData.imageUrls
    };

    console.log("Submitted Form Data (JSON Payload):", submissionPayload);
    setIsSubmitted(true);
    localStorage.removeItem("tygry8-form-data");
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Property Address";
      case 2:
        return "Information";
      case 3:
        return "Property Details";
      case 4:
        return "Condition";
      case 5:
        return "Occupancy";
      case 6:
        return "Timeline";
      case 7:
      case 8:
        return "Property Images";
      case 9:
        return "Review";
      default:
        return "Details";
    }
  };

  const getDisplayStep = () => {
    if (step <= 7) return step;
    if (step === 8) return 7; 
    return 8; 
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1Address
            formData={formData.address}
            updateFormData={(fields) => updateField("address", fields)}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <Step2Contact
            formData={formData.contact}
            updateFormData={(fields) => updateField("contact", fields)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <Step3Details
            formData={formData.details}
            updateFormData={(fields) => updateField("details", fields)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <Step4Condition
            formData={formData.condition}
            updateFormData={(fields) => updateField("condition", fields)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <Step5Occupancy
            value={formData.occupancy}
            onChange={(val) => updateField("occupancy", val)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <Step6Timeline
            value={formData.timeline}
            onChange={(val) => updateField("timeline", val)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 7:
        return (
          <Step7UploadQuery
            onChoose={(upload) => {
              setHasImages(upload);
              if (upload) {
                setStep(8);
              } else {
                updateField("imageUrls", []);
                setStep(9);
              }
            }}
          />
        );
      case 8:
        return (
          <Step7UploadImages
            imageUrls={formData.imageUrls}
            onChange={(urls) => updateField("imageUrls", urls)}
            onNext={() => setStep(9)}
            onBack={prevStep}
          />
        );
      case 9:
        return (
          <Step8Review
            formData={formData}
            onEdit={(targetStep) => setStep(targetStep)}
            onSubmit={handleFinalSubmit}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  if (!isLoaded) {
    return <Loading fullScreen />;
  }

  if (isSubmitted) {
    return (
      <div className="flex-1 bg-slate-50/50 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-6 max-w-md">
          <SuccessSubmitted />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50/50 pt-28 pb-16 md:pt-40 md:pb-24">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="space-y-6">
          {/* Progress Header */}
          {step !== 7 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Step {getDisplayStep()} of 8</span>
                <span className="text-gray-500">{getStepTitle()}</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200/70 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-blue-950 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(getDisplayStep() / 8) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Form Card Container */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
}
