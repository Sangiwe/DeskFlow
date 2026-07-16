import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import DashboardHeader from "../components/DashboardHeader";
import AdminTicketRow from "../components/AdminTicketRow";

import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("deskflowUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [updatingTicketId, setUpdatingTicketId] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get("/tickets");

        setTickets(response.data.tickets);
      } catch (requestError) {
        setPageError(
          requestError.response?.data?.message ||
            "Unable to load company tickets."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const summary = useMemo(() => {
    return {
      total: tickets.length,
      open: tickets.filter(
        (ticket) => ticket.status === "Open"
      ).length,
      inProgress: tickets.filter(
        (ticket) => ticket.status === "In Progress"
      ).length,
      resolved: tickets.filter(
        (ticket) => ticket.status === "Resolved"
      ).length,
    };
  }, [tickets]);

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      setUpdatingTicketId(ticketId);
      setPageError("");

      const response = await api.put(`/tickets/${ticketId}`, {
          status: newStatus,
      
      });

      setTickets((currentTickets) =>
        currentTickets.map((ticket) =>
          ticket._id === ticketId
            ? response.data.ticket
            : ticket
        )
      );
    } catch (requestError) {
      setPageError(
        requestError.response?.data?.message ||
          "Unable to update the ticket status."
      );
    } finally {
      setUpdatingTicketId("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("deskflowToken");
    localStorage.removeItem("deskflowUser");

    navigate("/", { replace: true });
  };

  return (
    <div className="dashboard-page">
      <DashboardHeader
        user={user}
        onLogout={handleLogout}
      />

      <main className="admin-dashboard-content">
        <section className="admin-intro">
          <div>
            <span className="section-label">
              Admin workspace
            </span>

            <h1>Ticket overview</h1>

            <p>
              Review and manage technical issues submitted across
              the organization.
            </p>
          </div>
        </section>

        <section className="admin-summary-grid">
          <article className="summary-card">
            <span className="summary-card-label">
              Total tickets
            </span>
            <strong>{summary.total}</strong>
          </article>

          <article className="summary-card">
            <span className="summary-card-label">Open</span>
            <strong>{summary.open}</strong>
          </article>

          <article className="summary-card">
            <span className="summary-card-label">
              In progress
            </span>
            <strong>{summary.inProgress}</strong>
          </article>

          <article className="summary-card">
            <span className="summary-card-label">
              Resolved
            </span>
            <strong>{summary.resolved}</strong>
          </article>
        </section>

        <section className="admin-ticket-section">
          <div className="admin-ticket-section-heading">
            <div>
              <span className="section-label">
                Central ticket feed
              </span>
              <h2>All company tickets</h2>
            </div>

            <span className="ticket-count-label">
              {tickets.length}{" "}
              {tickets.length === 1 ? "ticket" : "tickets"}
            </span>
          </div>

          {pageError && (
            <div className="dashboard-error">
              {pageError}
            </div>
          )}

          {isLoading && (
            <div className="dashboard-state">
              Loading company tickets...
            </div>
          )}

          {!isLoading &&
            !pageError &&
            tickets.length === 0 && (
              <div className="dashboard-state empty-state">
                <span>No tickets submitted</span>
                <p>
                  Employee tickets will appear here.
                </p>
              </div>
            )}

          {!isLoading && tickets.length > 0 && (
            <div className="admin-ticket-list">
              <div className="admin-table-heading">
                <span>Employee</span>
                <span>Issue</span>
                <span>Priority</span>
                <span>Status</span>
              </div>

              {tickets.map((ticket) => (
                <AdminTicketRow
                  key={ticket._id}
                  ticket={ticket}
                  onStatusChange={handleStatusChange}
                  isUpdating={updatingTicketId === ticket._id}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;