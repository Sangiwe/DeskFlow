function AdminTicketRow({ ticket, onStatusChange, isUpdating }) {
  const createdDate = new Date(ticket.createdAt).toLocaleDateString(
    "en-ZA",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  const priorityClass = ticket.priority.toLowerCase();

  return (
    <article className="admin-ticket-row">
      <div className="ticket-employee">
        <span className="employee-avatar">
          {ticket.createdByName?.charAt(0).toUpperCase()}
        </span>

        <div>
          <span className="employee-name">
            {ticket.createdByName}
          </span>

          <span className="ticket-created-date">
            {createdDate}
          </span>
        </div>
      </div>

      <div className="admin-ticket-details">
        <h3>{ticket.title}</h3>
        <p>{ticket.description}</p>
      </div>

      <span className={`priority-badge ${priorityClass}`}>
        {ticket.priority}
      </span>

      <select
        className={`admin-status-select ${ticket.status
          .toLowerCase()
          .replaceAll(" ", "-")}`}
        value={ticket.status}
        onChange={(event) =>
          onStatusChange(ticket._id, event.target.value)
        }
        disabled={isUpdating}
        aria-label={`Update status for ${ticket.title}`}
      >
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>
    </article>
  );
}

export default AdminTicketRow;