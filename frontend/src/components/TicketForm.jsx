import { useState } from "react";

function TicketForm({ onTicketCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim()
    ) {
      setError("Please provide a title and description.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      await onTicketCreated(formData);

      setFormData({
        title: "",
        description: "",
        priority: "Low",
      });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to create the ticket. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="dashboard-card ticket-form-card">
      <div className="section-heading">
        <div>
          <span className="section-label">New request</span>
          <h2>Report an IT issue</h2>
        </div>

        <span className="section-number">01</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Issue title</label>

          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Briefly describe the issue"
            maxLength="100"
          />
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Explain what happened and how it is affecting your work"
            rows="5"
            maxLength="1000"
          />
        </div>

        <div className="form-field">
          <label htmlFor="priority">Priority</label>

          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {error && (
          <div className="dashboard-error" role="alert">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="primary-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit request"}
          {!isSubmitting && <span aria-hidden="true">↗</span>}
        </button>
      </form>
    </section>
  );
}

export default TicketForm;