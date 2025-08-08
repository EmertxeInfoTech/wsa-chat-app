import React from "react";
import styles from "../Styles/AuthenticatedHeader.module.css";
import { User } from "lucide-react";
import Modal from "../Reusable Components/Modal";
import DarkMode from "../Landing/DarkMode";
import { UserProfile, SignOutButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

// const dummyUser = {
//   firstName: "Jhon",
//   imageUrl: "https://i.pravatar.cc/100?img=6",
// };
const AuthenticationHeader = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        {/* LOGO AND APP NAME */}
        <div className={styles.logoContainer}>
          <img src="/assets/logo.png" alt="LOGO" className={styles.logoImage} />
          <span className={styles.appName}>WSA Chat App</span>
        </div>

        {/* RIGHT CONTROLS */}
        <div className={styles.controls}>
          <div className={styles.userInfo}>
            {user?.imageUrl && (
              <div className={styles.avatar}>
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            )}
            <span className={styles.userName}>{user?.firstName || "User"}</span>
          </div>
          <button
            className={styles.editBtn}
            onClick={() => document.getElementById("edit_profile").showModal()}
          >
            Edit Profile
          </button>
          {/* Modal */}
          <Modal id="edit_profile">
            <UserProfile />
          </Modal>
          <DarkMode />
          <div>
            <SignOutButton signOutCallback={() => navigate("/")}>
              <button className={styles.logoutBtn}>Logout</button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthenticationHeader;
