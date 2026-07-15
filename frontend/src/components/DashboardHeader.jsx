function DashboardHeader({ user, onLogout }) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-brand">
        <div className="brand-mark">DF</div>

        <div>
          <span className="dashboard-brand-name">DeskFlow</span>
          <span className="dashboard-brand-label">
            Internal IT Service Portal
          </span>
        </div>
      </div>

      <div className="dashboard-user">
        <div className="user-details">
          <span className="user-name">{user?.name}</span>
          <span className="user-role">{user?.role}</span>
        </div>

        <button
          type="button"
          className="logout-button"
          onClick={onLogout}
        >
          Log out
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;