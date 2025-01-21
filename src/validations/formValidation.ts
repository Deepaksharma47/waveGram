import * as Yup from 'yup';

export const 
waveFormValidations = Yup.object({
  waveVideo: Yup.mixed()
    .nullable()
    .test('fileType', 'Only video files are allowed', (value) => {
      if (!value) return true; // Skip validation if null
      return value instanceof File && value.type.startsWith('video/');
    })
    .test('fileSize', 'Video must be less than 20MB', (value) => {
      if (!value) return true; // Skip validation if null
      return value instanceof File && value.size <= 20 * 1024 * 1024; // 50MB limit
    }),
  wavePhoto: Yup.mixed()
    .nullable()
    .test('fileType', 'Only image files are allowed', (value) => {
      if (!value) return true; // Skip validation if null
      return value instanceof File && value.type.startsWith('image/');
    })
    .test('fileSize', 'Photo must be less than 4MB', (value) => {
      if (!value) return true; // Skip validation if null
      return value instanceof File && value.size <= 4 * 1024 * 1024; // 10MB limit
    }),
  waveMessage: Yup.string()
    .trim()
    .required('Text is required')
    .min(5, 'Text must be at least 5 characters')
    .max(500, 'Text cannot exceed 500 characters'),
});
