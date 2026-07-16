import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import DashboardHeader from "../components/DashboardHeader";
import TicketForm from "../components/TicketForm";
import TicketCard from "../components/TicketCard";

import "./EmployeeDashboard.css";

function EmployeeDashboard() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("deskflowUser");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  const [tickets, setTickets] = useState([]);
  const [isLoadingTickets, setIsLoadingTickets] =
    useState(true);
  const [ticketError, setTicketError] = useState("");

  const getToken = () =>
    localStorage.getItem("deskflowToken");

  const fetchTickets = async () => {
    try {
      setIsLoadingTickets(true);
      setTicketError("");

      const response = await api.get("/tickets", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setTickets(response.data.tickets);
    } catch (requestError) {
      setTicketError(
        requestError.response?.data?.message ||
          "Unable to load your tickets."
      );
    } finally {
      setIsLoadingTickets(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCreateTicket = async (ticketData) => {
    const response = await api.post(
      "/tickets",
      ticketData,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    setTickets((currentTickets) => [
      response.data.ticket,
      ...currentTickets,
    ]);
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

      <main className="dashboard-content">
        <section className="dashboard-intro">
          <div>
            <span className="section-label">
              Employee workspace
            </span>

            <h1>
              Welcome back,{" "}
              <span>{user?.name}</span>
            </h1>

            <p>
              Submit technical issues and track their
              progress from one place.
            </p>
          </div>

          <div className="ticket-summary">
            <span className="summary-number">
              {tickets.length}
            </span>
            <span className="summary-label">
              Total tickets
            </span>
          </div>
        </section>

        <div className="employee-dashboard-grid">
          <TicketForm
            onTicketCreated={handleCreateTicket}
          />

          <section className="dashboard-card tickets-card">
            <div className="section-heading">
              <div>
                <span className="section-label">
                  Ticket history
                </span>
                <h2>My tickets</h2>
              </div>
            </div>

            {isLoadingTickets && (
              <div className="dashboard-state">
                Loading your tickets...
              </div>
            )}

            {!isLoadingTickets && ticketError && (
              <div className="dashboard-error">
                {ticketError}
              </div>
            )}

            {!isLoadingTickets &&
              !ticketError &&
              tickets.length === 0 && (
                <div className="dashboard-state empty-state">
                  <span>No tickets yet</span>
                  <p>
                    Tickets you submit will appear here.
                  </p>
                </div>
              )}

            {!isLoadingTickets &&
              !ticketError &&
              tickets.length > 0 && (
                <div className="ticket-list">
                  {tickets.map((ticket) => (
                    <TicketCard
                      key={ticket._id}
                      ticket={ticket}
                    />
                  ))}
                </div>
              )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default EmployeeDashboard;