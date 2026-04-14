import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { showAlert } from "../utils";
import { createMasterCourse } from "../services/services";
import "../styles/mastercourseform.css";

const schema = yup.object().shape({
  title: yup.string().required("Title is required").min(3).max(100),
  desc: yup.string().required("Description is required").min(5).max(500),
  level: yup.string().required("Level is required"),
  rating: yup.number().typeError("Rating must be a number").required().min(0).max(5),
  duration: yup.number().typeError("Duration must be a number").required().positive(),
  type: yup.string().required("Type is required"),
  status: yup.number().oneOf([0, 1]).default(1),
  thumbnail: yup.mixed().required("Thumbnail is required"),
  content: yup.mixed().required("Content file is required"),
});

const CreateCourseForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { status: 1 },
  });

  const onSubmit = async (data: any) => {
    try {
      console.log(data);

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("desc", data.desc);
      formData.append("level", data.level);
      formData.append("rating", data.rating);
      formData.append("duration", data.duration);
      formData.append("type", data.type);
      formData.append("status", data.status);

      formData.append("thumbnail", data.thumbnail[0]);
      formData.append("content", data.content[0]);


      const res = await createMasterCourse(formData);

      if (res.success) {
        showAlert("Course", res.message, "success");
      } else {
        showAlert("Course", res.message, "error");
      }
    } catch (error) {
      showAlert("Course", "Internal server error", "error");
    }
  };

  return (
    <div className="course-container">
      <div className="course-card">
        <h2>Create Master Course 🚀</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Grid */}
          <div className="form-grid">

            <div className="input-group">
              <label>Title</label>
              <input {...register("title")} placeholder="Course title" />
              <p>{errors.title?.message}</p>
            </div>

            <div className="input-group">
              <label>Level</label>
              <select {...register("level")}>
                <option value="">Select</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <p>{errors.level?.message}</p>
            </div>

            <div className="input-group">
              <label>Rating</label>
              <input type="number" {...register("rating")} placeholder="0-5" />
              <p>{errors.rating?.message}</p>
            </div>

            <div className="input-group">
              <label>Duration</label>
              <input type="number" {...register("duration")} placeholder="Hours" />
              <p>{errors.duration?.message}</p>
            </div>

            <div className="input-group">
              <label>Type</label>
              <input {...register("type")} placeholder="Course type" />
              <p>{errors.type?.message}</p>
            </div>

            <div className="input-group">
              <label>Status</label>
              <select {...register("status")}>
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>

            <div className="input-group">
              <label>Thumbnail</label>
              <input type="file"
                onChange={(e) => e.target.files && setValue("thumbnail", e.target.files)}
              />
              <p>{errors.thumbnail?.message}</p>
            </div>

            <div className="input-group">
              <label>Content File</label>
              <input type="file"
                onChange={(e) => e.target.files && setValue("content", e.target.files)}
              />
              <p>{errors.content?.message}</p>
            </div>

          </div>

          {/* Description */}
          <div className="input-group full">
            <label>Description</label>
            <textarea {...register("desc")} placeholder="Write description..." />
            <p>{errors.desc?.message}</p>
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button type="button" className="cancel-btn">Cancel</button>
            <button type="submit" className="submit-btn">Create Course</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateCourseForm;