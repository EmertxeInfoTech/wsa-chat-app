import React, { useEffect } from "react";
import styles from "../Styles/Sidebar.module.css";
import { Users } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { useChatStore } from "../store/useChatStore";
// const users = [
//     { _id: "1",
//         firstName: "Alice",
//         lastName: "Johnson",
//         profileImage: "https://i.pravatar.cc/150?img=1",
//         clerkUserId: "clerk_101",
//     },
//     { _id: "2",
//         firstName: "Bob",
//         lastName: "Smith",
//         profileImage: "https://i.pravatar.cc/150?img=2",
//         clerkUserId: "clerk_102",
//     },
//     { _id: "3",
//         firstName: "Charlie",
//         lastName: "Brown",
//         profileImage: "https://i.pravatar.cc/150?img=3",
//         clerkUserId: "clerk_103",
//     },
// ];

const Sidebar = () => {
  const { getToken } = useAuth();
  const { getUsers, users, selectedUser, setSelectedUser, onlineUsers } =
    useChatStore();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await getToken();
      console.log("token", token);
      if (token) {
        await getUsers(token);
      }
    };
    fetchUsers();
    console.log("users", users);
  }, [getToken, getUsers]);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Users className="w-5 h-5" />
          <span className="font-medium hidden lg:block">Friends</span>
        </div>
      </div>

      <div className={styles.userList}>
        {users.length > 0 ? (
          users.map((user) => (
            <button
              key={user._id}
              className={`${styles.userItem} ${
                selectedUser?._id === user._id ? styles.userItemActive : ""
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <div className={styles.avatarContainer}>
                <div className={styles.avatarImageWrapper}>
                  <img
                    src={user.profileImage}
                    className={styles.avatarImage}
                    alt="profile Image"
                  />
                  {onlineUsers.includes(user.clerkUserId) && (
                    <span className={styles.onlineIndicator} />
                  )}
                </div>
              </div>
              <div className={styles.userDetails}>
                <div className={styles.username}>
                  {user.firstName} {user.lastName}
                </div>
                <div className={styles.userStatus}>
                  {onlineUsers.includes(user.clerkUserId)
                    ? "Online"
                    : "Offline"}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className={styles.noUsers}>
            <p>No Users found</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
