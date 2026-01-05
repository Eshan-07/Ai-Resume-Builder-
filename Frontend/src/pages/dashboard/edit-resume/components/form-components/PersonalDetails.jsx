import React from "react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";

function PersonalDetails({ resumeInfo, enanbledNext }) {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const handleInputChange = (e) => {
    enanbledNext(false);
    dispatch(
      addResumeData({
        ...resumeInfo,
        [e.target.name]: e.target.value,
      })
    );
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        jobTitle: e.target.jobTitle.value,
        address: e.target.address.value,
        phone: e.target.phone.value,
        email: e.target.email.value,
      },
    };

    if (resume_id) {
      try {
        await updateThisResume(resume_id, data);
        toast.success("Resume updated successfully");
      } catch (error) {
        toast.error(error.message || "Failed to update resume");
      } finally {
        enanbledNext(true);
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mt-10">

      {/* Header */}
      <div className="mb-8">
        <div className="h-1 w-14 rounded-full bg-emerald-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900">
          Personal Details
        </h2>
        <p className="text-slate-500 mt-1">
          Get started with the basic information to introduce yourself.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={onSave} className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">
              First Name
            </label>
            <Input
              name="firstName"
              defaultValue={resumeInfo?.firstName}
              required
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">
              Last Name
            </label>
            <Input
              name="lastName"
              defaultValue={resumeInfo?.lastName}
              required
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-slate-600 uppercase">
              Job Title
            </label>
            <Input
              name="jobTitle"
              defaultValue={resumeInfo?.jobTitle}
              onChange={handleInputChange}
              className="mt-2"
              placeholder="e.g. Frontend Developer"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-slate-600 uppercase">
              Address
            </label>
            <Input
              name="address"
              defaultValue={resumeInfo?.address}
              required
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">
              Phone
            </label>
            <Input
              name="phone"
              defaultValue={resumeInfo?.phone}
              required
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">
              Email
            </label>
            <Input
              name="email"
              defaultValue={resumeInfo?.email}
              required
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <Button
            type="submit"
            disabled={loading}
            className="px-6 bg-emerald-500 hover:bg-emerald-600"
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Save & Continue"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
