import React from 'react'
import styles from '../Styles/NoChatSelected.module.css'
import { MessageSquare } from 'lucide-react'

const NoChatSelected = () => {
  return (
    <div className={styles.container}>
        <div className={styles.content}>
            {/* ICONS DISPLAY */}
            <div className={styles.iconWrapper}>
                <div className={styles.iconContainer}>
                    <div className={styles.iconBackground}>
                       <MessageSquare className={styles.icon}/>
                    </div>
                </div>
            </div>
            {/* WELCOME TEXT */}
            <h2 className={styles.title}>Welcome to WSA Chat App</h2>
            <p className={styles.subtitle}>Select a conversation from the sidebar to start chatting</p>
        </div>
    </div>
  )
}

export default NoChatSelected