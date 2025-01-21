import { Form, Formik, ErrorMessage, Field } from "formik";
import { waveFormValidations } from "../../validations/formValidation";
import IconBtn from "../../components/common/IconBtn";
import { useState } from "react";
import { useCreateWave } from "../../actions/user";

interface Invl {
  waveVideo?: File | null;
  wavePhoto?: File | null;
  waveMessage: string;
}

const initialValue: Invl = {
  waveVideo: null,
  wavePhoto: null,
  waveMessage: "",
};

const WaveForm = () => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);

  const waveMutation = useCreateWave();

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={waveFormValidations}
      onSubmit={(values: Invl) => {
        const formData = new FormData();

        if (values.wavePhoto) formData.append("wavePhoto", values.wavePhoto);
        if (values.waveVideo) formData.append("waveVideo", values.waveVideo);
        formData.append("waveMessage", values.waveMessage);

        waveMutation.mutate(formData);
      }}
    >
      {({ setFieldValue }) => (
        <Form encType="multipart/form-data" className="flex flex-col gap-4">
          {/* Wave Photo Section */}
          <div className="w-full flex flex-col gap-3">
            <input
              id="wavePhoto"
              type="file"
              name="wavePhoto"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFieldValue("wavePhoto", file);

                  // Generate a preview for the photo
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPhotoPreview(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              accept="image/jpg, image/jpeg, image/png"
              className="hidden"
            />
            <label
              htmlFor="wavePhoto"
              className="cursor-pointer border-2 w-full py-2 px-4 rounded-lg"
            >
              Upload Photo for Wave
            </label>
            <ErrorMessage component="div" name="wavePhoto" className="text-red-600" />

            {/* Photo Preview */}
            {photoPreview && (
              <div className="mt-4">
                <img
                  src={photoPreview}
                  alt="Wave Preview"
                  className="w-fit max-h-44 object-contain rounded-md border"
                />
              </div>
            )}
          </div>

          {/* Wave Video Section */}
          <div className="w-full flex flex-col gap-3">
            <input
              id="waveVideo"
              type="file"
              name="waveVideo"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFieldValue("waveVideo", file);
                  setVideoName(file.name); // Store the video name for display
                }
              }}
              accept="video/mp4, video/avi, video/mov"
              className="hidden"
            />
            <label
              htmlFor="waveVideo"
              className="cursor-pointer border-2 py-2 px-4 rounded-lg w-full"
            >
              Upload Video for Wave
            </label>
            <ErrorMessage component="div" name="waveVideo" className="text-red-600" />

            {/* Video Name Preview */}
            {videoName && (
              <div className="mt-4 text-gray-700">
                <p>
                  Selected Video: <strong>{videoName}</strong>
                </p>
              </div>
            )}
          </div>

          {/* Wave Message Section */}
          <div>
            <Field
              as="textarea"
              name="waveMessage"
              placeholder="Write Something..."
              rows={3}
              className="w-full border rounded-md p-2"
            />
            <ErrorMessage component="div" name="waveMessage" className="text-red-600" />
          </div>

          {/* Submit Button */}
          <div>
            <IconBtn text="Create Wave" type="submit" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default WaveForm;
