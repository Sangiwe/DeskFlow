function TicketCard({ ticket }) {
  const createdDate = new Date(
    ticket.createdAt
  ).toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const statusClass = ticket.status
    .toLowerCase()
    .replaceAll(" ", "-");

  const priorityClass = ticket.priority.toLowerCase();

  return (
    <article className="ticket-card">
      <div className="ticket-card-top">
        <div>
          <span className={`priority-badge ${priorityClass}`}>
            {ticket.priority} priority
          </span>

          <h3>{ticket.title}</h3>
        </div>

        <span className={`status-badge ${statusClass}`}>
          {ticket.status}
        </span>
      </div>

      <p className="ticket-description">
        {ticket.description}
      </p>

      <div className="ticket-meta">
        <span>Created {createdDate}</span>

        <span className="ticket-id">
          #{ticket._id.slice(-6).toUpperCase()}
        </span>
      </div>
    </article>
  );
}

export default TicketCard;